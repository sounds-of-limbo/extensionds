"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Console_1 = require("./standalone/Console");
var customLogs = [
    "say",
    "nfo",
    "ok",
    "hey",
    "no",
];
customLogs.forEach(function (key) {
    console[key] = (0, Console_1.customLog)(key);
});
//# sourceMappingURL=Console.js.map