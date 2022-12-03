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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOLSize = void 0;
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
exports.SOLSize = SOLSize;
//# sourceMappingURL=size.js.map