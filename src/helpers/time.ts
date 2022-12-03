export type SOLTimeUnit =
	| "seconds"
	| "minutes"
	| "hours"
	| "days"

export class SOLTime {
	private unitMultipliers
		: {
			[key in SOLTimeUnit]: number
		}
		= {
			seconds: 1,
			minutes: 60,
			hours: 3600,
			days: 86400,
		}

	private seconds
		: number
		
	constructor(
		value: number,
		unit: SOLTimeUnit,
	) {
		this.seconds = value * this.unitMultipliers[unit]
	}

	/**
	 * Convert time value from current to target time unit
	 */
	to = (
		unit: SOLTimeUnit,
	): number => {
		return this.seconds / this.unitMultipliers[unit]
	}

	/**
	 * Make time string. For example:  
	 * **00:42**  
	 * **04:20**  
	 * **1:15:01**  
	 */
	toTimeString = (
		/**
		 * If there is more than 24 hours, whether there should be extra 'days' label at the start or not.  
		 * Default: `false`
		 */
		separateDays?: boolean
	): string => {
		const prependSign = this.seconds < 0 ? "-" : ""

		const seconds = Math.abs(this.seconds).as("seconds")
		const absSeconds = (seconds.to("seconds") | 0) % 60
		const absMinutes = (seconds.to("minutes") | 0) % 60

		const hours = seconds.to("hours") | 0
		const days = seconds.to("days") | 0

		return prependSign + `${
			separateDays && days ? `${days.pluralize("day", "days")} ` : ""}${
			hours || separateDays ? `${separateDays ? (hours % 24).padStart(2) : hours}:` : "" }${
			absMinutes.padStart(2) }:${
			absSeconds.padStart(2)
		}`
	}
}