"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOLTime = void 0;
var SOLTime = /** @class */ (function () {
    function SOLTime(value, unit) {
        var _this = this;
        this.unitMultipliers = {
            seconds: 1,
            minutes: 60,
            hours: 3600,
            days: 86400,
        };
        /**
         * Convert time value from current to target time unit
         */
        this.to = function (unit) {
            return _this.seconds / _this.unitMultipliers[unit];
        };
        /**
         * Make time string. For example:
         * **00:42**
         * **04:20**
         * **1:15:01**
         */
        this.toTimeString = function (
        /**
         * If there is more than 24 hours, whether there should be extra 'days' label at the start or not.
         * Default: `false`
         */
        separateDays) {
            var prependSign = _this.seconds < 0 ? "-" : "";
            var seconds = Math.abs(_this.seconds).as("seconds");
            var absSeconds = (seconds.to("seconds") | 0) % 60;
            var absMinutes = (seconds.to("minutes") | 0) % 60;
            var hours = seconds.to("hours") | 0;
            var days = seconds.to("days") | 0;
            return prependSign + "".concat(separateDays && days ? "".concat(days.pluralize("day", "days"), " ") : "").concat(hours || separateDays ? "".concat(separateDays ? (hours % 24).padStart(2) : hours, ":") : "").concat(absMinutes.padStart(2), ":").concat(absSeconds.padStart(2));
        };
        this.seconds = value * this.unitMultipliers[unit];
    }
    return SOLTime;
}());
exports.SOLTime = SOLTime;
//# sourceMappingURL=time.js.map