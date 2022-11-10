interface SOLSizeNames {
	/**
	 * default is **byte, bytes**
	 */
	bytes?: [string, string]
	/**
	 * default is **kB, kB**
	 */
	kilobytes?: [string, string]
	/**
	 * default is **MB, MB**
	 */
	megabytes?: [string, string]
	/**
	 * default is **GB, GB**
	 */
	gigabytes?: [string, string]
	/**
	 * default is **TB, TB**
	 */
	terabytes?: [string, string]
}

type SOLTimeUnit =
	| "seconds"
	| "minutes"
	| "hours"
	| "days"

class SOLTime {
	private unitMultipliers
		: {
			[key in SOLTimeUnit]: number
		}
		= {
			seconds: 1,
			minutes: 60,
			hours: 3600,
			days: 86400,
		}

	private seconds
		: number
		
	constructor(
		value: number,
		unit: SOLTimeUnit,
	) {
		this.seconds = value * this.unitMultipliers[unit]
	}

	/**
	 * Convert time value from current to target time unit
	 */
	to = (
		unit: SOLTimeUnit,
	): number => {
		return this.seconds / this.unitMultipliers[unit]
	}

	/**
	 * Make time string. For example:  
	 * **00:42**  
	 * **04:20**  
	 * **1:15:01**  
	 */
	toTimeString = (
		/**
		 * If there is more than 24 hours, whether there should be extra 'days' label at the start or not.  
		 * Default: `false`
		 */
		separateDays?: boolean
	): string => {
		const prependSign = this.seconds < 0 ? "-" : ""

		const seconds = Math.abs(this.seconds).as("seconds")
		const absSeconds = (seconds.to("seconds") | 0) % 60
		const absMinutes = (seconds.to("minutes") | 0) % 60

		const hours = seconds.to("hours") | 0
		const days = seconds.to("days") | 0

		return prependSign + `${
			separateDays && days ? `${days.pluralize("day", "days")} ` : ""}${
			hours || separateDays ? `${separateDays ? (hours % 24).padStart(2) : hours}:` : "" }${
			absMinutes.padStart(2) }:${
			absSeconds.padStart(2)
		}`
	}
}

type SOLSizeUnit =
	| "bytes"
	| "kilobytes"
	| "megabytes"
	| "gigabytes"
	| "terabytes"

class SOLSize {
	private unitMultipliers
		: {
			[key in SOLSizeUnit]: number
		}
		= {
			bytes: 1,
			kilobytes: 1024,
			megabytes: 1024 ** 2,
			gigabytes: 1024 ** 3,
			terabytes: 1024 ** 4,
		}

	private bytes
		: number
		
	constructor(
		value: number,
		unit: SOLSizeUnit,
	) {
		this.bytes = value * this.unitMultipliers[unit]
	}

	/**
	 * Convert size from current to target size unit
	 */
	to = (
		unit: SOLSizeUnit,
	): number => {
		return this.bytes / this.unitMultipliers[unit]
	}

	/**
	 * Make verbose size string up to terabytes (TB). For example:  
	 * **921 bytes**  
	 * **128 kB**  
	 * **1.2 MB**  
	 * **12.28 GB**  
	 * **1.2 TB**  
	 */
	toVerboseString = (
		customSizeNames?: SOLSizeNames
	): string => {
		const {
			bytes: bytesLabels = ["byte", "bytes"],
			kilobytes: kilobytesLabels = ["kB", "kB"],
			megabytes: megabytesLabels = ["MB", "MB"],
			gigabytes: gigabytesLabels = ["GB", "GB"],
			terabytes: terabytesLabels = ["TB", "TB"],
		} = customSizeNames || {}

		const {
			kilobytes,
			megabytes,
			gigabytes,
			terabytes,
		} = this.unitMultipliers

		if (this.bytes >= terabytes)
			return (this.bytes / terabytes).pluralize(...terabytesLabels, 2)
		if (this.bytes >= gigabytes)
			return (this.bytes / gigabytes).pluralize(...gigabytesLabels, 2)
		if (this.bytes >= megabytes)
			return (this.bytes / megabytes).pluralize(...megabytesLabels, 2)
		if (this.bytes >= kilobytes)
			return (this.bytes / kilobytes).pluralize(...kilobytesLabels, 2)
		return this.bytes.pluralize(...bytesLabels)
	}
}

interface Number {
	/**
	 * Pad start of the number to match specified length with specified character.  
	 * Uses String.prototype.padStart under the hood
	 */
	padStart: (
		maxLength: number,
		/**
		 * Character to pad number with.  
		 * Defaults to "0"
		 */
		padWith?: string,
	) => string

	/**
	 * Bounds value to provided min and max values
	 */
	limit: (min: number, max: number) => number

	/**
	 * Place space each 3 numbers
	 */
	formatThousands: () => string

	/**
	 * Turn number into pluralized string, e.g.  
	 * **1 item**  
	 * **24 points**
	 */
	pluralize: (
		singularForm: string,
		pluralForm: string,
		/**
		 * If provided value is greater than or equal to 0, `Number.toFixed` will be applied to the number.  
		 * Default: -1,
		 */
		toFixed?: number,
	) => string

	as: <T extends SOLTimeUnit | SOLSizeUnit>(
		unit: T
	) => T extends SOLTimeUnit ? SOLTime : SOLSize
}

Number.prototype.padStart = function(
	maxLength: number,
	padWith: string = "0",
) {
	return `${this}`.padStart(maxLength, padWith)
}

Number.prototype.limit = function(
	min: number,
	max: number,
) {
	const self = Number(this)
	return self < min
		? min
		: self > max
			? max
			: self
}

Number.prototype.formatThousands = function() {
	const self = Number(this)
	const prependSign = self < 0 ? "-" : ""
	const [int, float] = `${self}`.split(".")
	const hasFloat = !!float
	return prependSign
		+ `${int}`.split("").reverse().join("").match(/[0-9]{1,3}/g)!.join(" ").split("").reverse().join("")
		+ (hasFloat ? `.${float}` : "")
}

Number.prototype.pluralize = function(
	singularForm: string,
	pluralForm: string,
	toFixed: number = -1,
) {
	const self = Number(this)
	const formattedSelf = typeof toFixed != "number" || toFixed < 0
		? self
		: Number(self.toFixed(toFixed))

	return Math.abs(formattedSelf) == 1
		? `${formattedSelf} ${singularForm}`
		: `${formattedSelf} ${pluralForm}`
}

Number.prototype.as = function<T extends SOLTimeUnit | SOLSizeUnit>(
	unit: T
) {
	const self = Number(this)
	switch (unit) {
		case "bytes":
		case "kilobytes":
		case "megabytes":
		case "gigabytes":
		case "terabytes":
			return new SOLSize(self, unit) as any // TODO 'as any' is a workaround - see https://github.com/microsoft/TypeScript/issues/24929
		default:
			return new SOLTime(self, unit) as any
	}
}