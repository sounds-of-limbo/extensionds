import { SOLSize, SOLSizeUnit } from "../helpers/size"
import { SOLTime, SOLTimeUnit } from "../helpers/time"

export interface INumberExtension {
	/**
	 * Pad start of the number to match specified length with specified character.  
	 * Uses `String.prototype.padStart` under the hood
	 */
	padStart: (
		maxLength: number,
		/**
		 * Character to pad number with.  
		 * Defaults to `"0"`
		 */
		padWith?: string,
	) => string

	/**
	 * Bounds value to provided min and max values
	 */
	limit: (
		min: number,
		max: number,
	) => number

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
	 * Treat number as specific numeric unit (time, size, etc.)
	 */
	as: <T extends SOLTimeUnit | SOLSizeUnit>(
		/**
		 * Unit to treat number as
		 */
		unit: T
	) => T extends SOLTimeUnit ? SOLTime : SOLSize
}

export class SOLNumber
implements INumberExtension {
	constructor(
		private readonly value: number,
	) {}

	padStart = (
		maxLength: number,
		padWith?: string,
	): string => {
		return `${this.value}`.padStart(maxLength, padWith)
	}

	limit = (
		min: number,
		max: number
	): number => {
		return this.value < min
			? min
			: this.value > max
				? max
				: this.value
	}

	formatThousands = (): string => {
		const prependSign = this.value < 0 ? "-" : ""
		const [int, float] = `${this.value}`.split(".")
		const hasFloat = !!float
		return prependSign
			+ `${int}`.split("").reverse().join("").match(/[0-9]{1,3}/g)!.join(" ").split("").reverse().join("")
			+ (hasFloat ? `.${float}` : "")
	}

	pluralize = (
		singularForm: string,
		pluralForm: string,
		toFixed?: number,
	): string => {
		const formattedValue = typeof toFixed != "number" || toFixed < 0
			? this.value
			: Number(this.value.toFixed(toFixed))

		return Math.abs(formattedValue) == 1
			? `${formattedValue} ${singularForm}`
			: `${formattedValue} ${pluralForm}`
	}

	as = <T extends SOLTimeUnit | SOLSizeUnit>(
		unit: T
	): T extends SOLTimeUnit ? SOLTime : SOLSize => {
		switch (unit) {
			case "bytes":
			case "kilobytes":
			case "megabytes":
			case "gigabytes":
			case "terabytes":
				return new SOLSize(this.value, unit) as any // TODO 'as any' is a workaround - see https://github.com/microsoft/TypeScript/issues/24929
			default:
				return new SOLTime(this.value, unit) as any
		}
	}
}