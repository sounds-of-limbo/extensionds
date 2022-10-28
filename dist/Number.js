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
Number.prototype.asBytesToVerboseSize = function (customSizeNames) {
    var self = Number(this);
    var _a = customSizeNames || {}, _b = _a.bytes, bytes = _b === void 0 ? ["byte", "bytes"] : _b, _c = _a.kilobytes, kilobytes = _c === void 0 ? ["kB", "kB"] : _c, _d = _a.megabytes, megabytes = _d === void 0 ? ["MB", "MB"] : _d, _e = _a.gigabytes, gigabytes = _e === void 0 ? ["GB", "GB"] : _e, _f = _a.terabytes, terabytes = _f === void 0 ? ["TB", "TB"] : _f;
    var kb = self / 1024;
    var mb = kb / 1024;
    var gb = mb / 1024;
    var tb = gb / 1024;
    return tb >= 1
        ? tb.pluralize.apply(tb, __spreadArray(__spreadArray([], __read(terabytes), false), [2], false)) : gb >= 1
        ? gb.pluralize.apply(gb, __spreadArray(__spreadArray([], __read(gigabytes), false), [2], false)) : mb >= 1
        ? mb.pluralize.apply(mb, __spreadArray(__spreadArray([], __read(megabytes), false), [2], false)) : kb >= 1
        ? kb.pluralize.apply(kb, __spreadArray(__spreadArray([], __read(kilobytes), false), [2], false)) : self.pluralize.apply(self, __spreadArray([], __read(bytes), false));
};
Number.prototype.asSecondsToTime = function (separateDays) {
    if (separateDays === void 0) { separateDays = false; }
    var self = Number(this);
    var abs = self < 0 ? -self : self;
    var prependSign = self < 0 ? "-" : "";
    var seconds = abs | 0;
    var absSeconds = seconds % 60;
    var absMinutes = (seconds / 60 | 0) % 60;
    var hours = seconds / 60 / 60 | 0;
    var days = 0;
    if (separateDays) {
        days = hours / 24 | 0;
        hours = hours % 24;
    }
    return prependSign + "".concat(separateDays && days ? "".concat(days, " day").concat(days == 1 ? "" : "s", " ") : "").concat(hours || separateDays ? "".concat(separateDays ? hours.padStart(2) : hours, ":") : "").concat(absMinutes.padStart(2), ":").concat(absSeconds.padStart(2));
};
Number.prototype.asSecondsToVerboseTime = function () {
    var self = Number(this);
    var prependSign = self < 0 ? "-" : "";
    var _a = __read(self.asSecondsToTime().split(":").reverse().map(Number).map(Math.abs), 3), s = _a[0], m = _a[1], _b = _a[2], h = _b === void 0 ? 0 : _b;
    return prependSign + ((h ? "".concat(h, " h ") : "") +
        (m ? "".concat(m, " min ") : "") +
        (s ? "".concat(s, " sec ") : "")).trim() || "0 sec";
};
//# sourceMappingURL=Number.js.map