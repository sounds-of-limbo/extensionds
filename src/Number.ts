interface SizeNames {
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

	/**
	 * Treat number as bytes and return verbose size string up to terabytes (TB).  
	 * For example:  
	 * **921 bytes**  
	 * **128 kB**  
	 * **1.2 MB**  
	 * **12.28 GB**  
	 * **1.2 TB**  
	 */
	asBytesToVerboseSize: (
		customSizeNames?: SizeNames
	) => string

	/**
	 * Treat number as seconds and return time string.  
	 * For example:  
	 * **00:42**  
	 * **04:20**  
	 * **1:15:01**  
	 */
	asSecondsToTime: (
		/**
		 * If there is more than 24 hours, whether there should be extra 'days' label at the start or not.  
		 * Default: `false`
		 */
		separateDays?: boolean
	) => string

	/**
	 * Treat number as seconds and return verbose time string.  
	 * For example:  
	 * **42 sec**  
	 * **4 min 20 sec**  
	 * **1 h 15 min 1 sec**
	 */
	asSecondsToVerboseTime: () => string
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

Number.prototype.asBytesToVerboseSize = function(
	customSizeNames?: SizeNames
) {
	const self = Number(this)
	const {
		bytes = ["byte", "bytes"],
		kilobytes = ["kB", "kB"],
		megabytes = ["MB", "MB"],
		gigabytes = ["GB", "GB"],
		terabytes = ["TB", "TB"],
	} = customSizeNames || {}

	const kb = self / 1024
	const mb = kb / 1024
	const gb = mb / 1024
	const tb = gb / 1024
	return tb >= 1
		? tb.pluralize(...terabytes, 2)
		: gb >= 1
			? gb.pluralize(...gigabytes, 2)
			: mb >= 1
				? mb.pluralize(...megabytes, 2)
				: kb >= 1
					? kb.pluralize(...kilobytes, 2)
					: self.pluralize(...bytes)
}

Number.prototype.asSecondsToTime = function(
	separateDays: boolean = false
) {
	const self = Number(this)
	const abs = self < 0 ? -self : self
	const prependSign = self < 0 ? "-" : ""

	const seconds = abs | 0
	const absSeconds = seconds % 60
	const absMinutes = (seconds / 60 | 0) % 60

	let hours = seconds / 60 / 60 | 0
	let days: number = 0

	if (separateDays) {
		days = hours / 24 | 0
		hours = hours % 24
	}

	return prependSign + `${
		separateDays && days ? `${days} day${days == 1 ? "" : "s"} ` : ""}${
		hours || separateDays ? `${separateDays ? hours.padStart(2) : hours}:` : "" }${
		absMinutes.padStart(2) }:${
		absSeconds.padStart(2)
	}`
}

Number.prototype.asSecondsToVerboseTime = function() {
	const self = Number(this)
	const prependSign = self < 0 ? "-" : ""
	const [ s, m, h = 0 ] = self.asSecondsToTime().split(":").reverse().map(Number).map(Math.abs)
	return prependSign + (
		(h ? `${h} h ` : "") +
		(m ? `${m} min ` : "") +
		(s ? `${s} sec ` : "")
	).trim() || "0 sec"
}