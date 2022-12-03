"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOLNumber = void 0;
var size_1 = require("../helpers/size");
var time_1 = require("../helpers/time");
var SOLNumber = /** @class */ (function () {
    function SOLNumber(value) {
        var _this = this;
        this.value = value;
        this.padStart = function (maxLength, padWith) {
            return "".concat(_this.value).padStart(maxLength, padWith);
        };
        this.limit = function (min, max) {
            return _this.value < min
                ? min
                : _this.value > max
                    ? max
                    : _this.value;
        };
        this.formatThousands = function () {
            var prependSign = _this.value < 0 ? "-" : "";
            var _a = __read("".concat(_this.value).split("."), 2), int = _a[0], float = _a[1];
            var hasFloat = !!float;
            return prependSign
                + "".concat(int).split("").reverse().join("").match(/[0-9]{1,3}/g).join(" ").split("").reverse().join("")
                + (hasFloat ? ".".concat(float) : "");
        };
        this.pluralize = function (singularForm, pluralForm, toFixed) {
            var formattedValue = typeof toFixed != "number" || toFixed < 0
                ? _this.value
                : Number(_this.value.toFixed(toFixed));
            return Math.abs(formattedValue) == 1
                ? "".concat(formattedValue, " ").concat(singularForm)
                : "".concat(formattedValue, " ").concat(pluralForm);
        };
        this.as = function (unit) {
            switch (unit) {
                case "bytes":
                case "kilobytes":
                case "megabytes":
                case "gigabytes":
                case "terabytes":
                    return new size_1.SOLSize(_this.value, unit); // TODO 'as any' is a workaround - see https://github.com/microsoft/TypeScript/issues/24929
                default:
                    return new time_1.SOLTime(_this.value, unit);
            }
        };
    }
    return SOLNumber;
}());
exports.SOLNumber = SOLNumber;
//# sourceMappingURL=Number.js.map