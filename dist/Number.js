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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var SOLSize = /** @class */ (function () {
    function SOLSize(value, unit) {
        var _this = this;
        this.unitMultipliers = {
            bytes: 1,
            kilobytes: 1024,
            megabytes: Math.pow(1024, 2),
            gigabytes: Math.pow(1024, 3),
            terabytes: Math.pow(1024, 4),
        };
        /**
         * Convert size from current to target size unit
         */
        this.to = function (unit) {
            return _this.bytes / _this.unitMultipliers[unit];
        };
        /**
         * Make verbose size string up to terabytes (TB). For example:
         * **921 bytes**
         * **128 kB**
         * **1.2 MB**
         * **12.28 GB**
         * **1.2 TB**
         */
        this.toVerboseString = function (customSizeNames) {
            var _a, _b, _c, _d, _e;
            var _f = customSizeNames || {}, _g = _f.bytes, bytesLabels = _g === void 0 ? ["byte", "bytes"] : _g, _h = _f.kilobytes, kilobytesLabels = _h === void 0 ? ["kB", "kB"] : _h, _j = _f.megabytes, megabytesLabels = _j === void 0 ? ["MB", "MB"] : _j, _k = _f.gigabytes, gigabytesLabels = _k === void 0 ? ["GB", "GB"] : _k, _l = _f.terabytes, terabytesLabels = _l === void 0 ? ["TB", "TB"] : _l;
            var _m = _this.unitMultipliers, kilobytes = _m.kilobytes, megabytes = _m.megabytes, gigabytes = _m.gigabytes, terabytes = _m.terabytes;
            if (_this.bytes >= terabytes)
                return (_a = (_this.bytes / terabytes)).pluralize.apply(_a, __spreadArray(__spreadArray([], __read(terabytesLabels), false), [2], false));
            if (_this.bytes >= gigabytes)
                return (_b = (_this.bytes / gigabytes)).pluralize.apply(_b, __spreadArray(__spreadArray([], __read(gigabytesLabels), false), [2], false));
            if (_this.bytes >= megabytes)
                return (_c = (_this.bytes / megabytes)).pluralize.apply(_c, __spreadArray(__spreadArray([], __read(megabytesLabels), false), [2], false));
            if (_this.bytes >= kilobytes)
                return (_d = (_this.bytes / kilobytes)).pluralize.apply(_d, __spreadArray(__spreadArray([], __read(kilobytesLabels), false), [2], false));
            return (_e = _this.bytes).pluralize.apply(_e, __spreadArray([], __read(bytesLabels), false));
        };
        this.bytes = value * this.unitMultipliers[unit];
    }
    return SOLSize;
}());
Number.prototype.padStart = function (maxLength, padWith) {
    if (padWith === void 0) { padWith = "0"; }
    return "".concat(this).padStart(maxLength, padWith);
};
Number.prototype.limit = function (min, max) {
    var self = Number(this);
    return self < min
        ? min
        : self > max
            ? max
            : self;
};
Number.prototype.formatThousands = function () {
    var self = Number(this);
    var prependSign = self < 0 ? "-" : "";
    var _a = __read("".concat(self).split("."), 2), int = _a[0], float = _a[1];
    var hasFloat = !!float;
    return prependSign
        + "".concat(int).split("").reverse().join("").match(/[0-9]{1,3}/g).join(" ").split("").reverse().join("")
        + (hasFloat ? ".".concat(float) : "");
};
Number.prototype.pluralize = function (singularForm, pluralForm, toFixed) {
    if (toFixed === void 0) { toFixed = -1; }
    var self = Number(this);
    var formattedSelf = typeof toFixed != "number" || toFixed < 0
        ? self
        : Number(self.toFixed(toFixed));
    return Math.abs(formattedSelf) == 1
        ? "".concat(formattedSelf, " ").concat(singularForm)
        : "".concat(formattedSelf, " ").concat(pluralForm);
};
Number.prototype.as = function (unit) {
    var self = Number(this);
    switch (unit) {
        case "bytes":
        case "kilobytes":
        case "megabytes":
        case "gigabytes":
        case "terabytes":
            return new SOLSize(self, unit); // TODO 'as any' is a workaround - see https://github.com/microsoft/TypeScript/issues/24929
        default:
            return new SOLTime(self, unit);
    }
};
//# sourceMappingURL=Number.js.map