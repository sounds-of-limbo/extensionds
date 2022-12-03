"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Number_1 = require("./standalone/Number");
Number.prototype.padStart = function (maxLength, padWith) {
    if (padWith === void 0) { padWith = "0"; }
    return new Number_1.SOLNumber(Number(this)).padStart(maxLength, padWith);
};
Number.prototype.limit = function (min, max) {
    return new Number_1.SOLNumber(Number(this)).limit(min, max);
};
Number.prototype.formatThousands = function () {
    return new Number_1.SOLNumber(Number(this)).formatThousands();
};
Number.prototype.pluralize = function (singularForm, pluralForm, toFixed) {
    if (toFixed === void 0) { toFixed = -1; }
    return new Number_1.SOLNumber(Number(this)).pluralize(singularForm, pluralForm, toFixed);
};
Number.prototype.as = function (unit) {
    return new Number_1.SOLNumber(Number(this)).as(unit);
};
//# sourceMappingURL=Number.js.map