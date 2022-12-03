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
exports.customConsole = exports.customLog = void 0;
var nodeColors = {
    no: "\x1b[31m",
    ok: "\x1b[32m",
    hey: "\x1b[33m",
    nfo: "\x1b[34m",
    say: "\x1b[36m",
    _bright: "\x1b[1m",
    _reset: "\x1b[0m",
};
var webColors = {
    say: ["#53868B", "#7AC5CD", "#98F5FF"],
    nfo: ["#1565C0", "#42A5F5", "#18FFFF"],
    ok: ["#008B45", "#00CD66", "#00FF7F"],
    hey: ["#8B8B00", "#CDCD00", "#FFFF00"],
    no: ["#8B1A1A", "#CD2626", "#FF3030"],
};
var customLog = function (key) {
    return function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var parts = message.split("*");
        var styles = __spreadArray([], __read(Array(parts.length)), false).map(function (_, i) {
            return i % 2 == 0
                ? "background: ".concat(webColors[key][0], "; color: ").concat(webColors[key][1], "; font-weight: normal; font-size: 10px; line-height: 10px; padding: 5px 0px")
                : "background: ".concat(webColors[key][0], "; color: ").concat(webColors[key][2], "; font-weight: bold; font-size: 10px; line-height: 10px; padding: 5px 0px");
        });
        typeof window == "undefined"
            ? console.log.apply(console, __spreadArray([parts.map(function (p, i) {
                    var color = nodeColors[key];
                    var _bright = nodeColors._bright, _reset = nodeColors._reset;
                    return "".concat(i % 2 == 1 ? _bright : "").concat(color).concat(p).concat(_reset);
                }).join("")], __read(params.map(function (p) {
                return Array.isArray(p)
                    ? "Array[".concat(p.length, "]")
                    : ["string", "number", "boolean"].includes(typeof p)
                        ? p
                        : p.constructor
                            ? p.constructor.name
                            : "".concat(p);
            })), false)) : console.log.apply(console, __spreadArray(__spreadArray([], __read(__spreadArray(["%c".concat(parts.join("%c"))], __read(styles), false)), false), __read(params), false));
    };
};
exports.customLog = customLog;
exports.customConsole = {
    log: (0, exports.customLog)("say"),
    info: (0, exports.customLog)("nfo"),
    ok: (0, exports.customLog)("ok"),
    warn: (0, exports.customLog)("hey"),
    error: (0, exports.customLog)("no"),
};
//# sourceMappingURL=Console.js.map