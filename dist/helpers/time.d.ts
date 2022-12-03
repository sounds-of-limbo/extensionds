export declare type SOLTimeUnit = "seconds" | "minutes" | "hours" | "days";
export declare class SOLTime {
    private unitMultipliers;
    private seconds;
    constructor(value: number, unit: SOLTimeUnit);
    /**
     * Convert time value from current to target time unit
     */
    to: (unit: SOLTimeUnit) => number;
    /**
     * Make time string. For example:
     * **00:42**
     * **04:20**
     * **1:15:01**
     */
    toTimeString: (separateDays?: boolean) => string;
}
