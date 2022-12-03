export {}

import { CustomLog, CustomLogFunction, customLog } from "./standalone/Console"

type CustomConsole = {
	[key in CustomLog]: CustomLogFunction
}

declare global {
	interface Console extends CustomConsole {}
}

const customLogs: CustomLog[] = [
	"say",
	"nfo",
	"ok",
	"hey",
	"no",
]

customLogs.forEach(key => {
	console[key] = customLog(key)
})