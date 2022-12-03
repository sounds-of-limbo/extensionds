export interface SOLSizeNames {
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

export type SOLSizeUnit =
	| "bytes"
	| "kilobytes"
	| "megabytes"
	| "gigabytes"
	| "terabytes"

export class SOLSize {
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