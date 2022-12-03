import { SOLSizeUnit } from "./helpers/size"
import { SOLTimeUnit } from "./helpers/time"
import { INumberExtension, SOLNumber } from "./standalone/Number"

export {}

declare global {
	interface Number extends INumberExtension {}
}


Number.prototype.padStart = function(
	maxLength: number,
	padWith: string = "0",
) {
	return new SOLNumber(Number(this)).padStart(maxLength, padWith)
}

Number.prototype.limit = function(
	min: number,
	max: number,
) {
	return new SOLNumber(Number(this)).limit(min, max)
}

Number.prototype.formatThousands = function() {
	return new SOLNumber(Number(this)).formatThousands()
}

Number.prototype.pluralize = function(
	singularForm: string,
	pluralForm: string,
	toFixed: number = -1,
) {
	return new SOLNumber(Number(this)).pluralize(singularForm, pluralForm, toFixed)
}

Number.prototype.as = function<T extends SOLTimeUnit | SOLSizeUnit>(
	unit: T
) {
	return new SOLNumber(Number(this)).as(unit)
}