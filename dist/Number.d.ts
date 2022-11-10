interface SOLSizeNames {
    /**
     * default is **byte, bytes**
     */
    bytes?: [string, string];
    /**
     * default is **kB, kB**
     */
    kilobytes?: [string, string];
    /**
     * default is **MB, MB**
     */
    megabytes?: [string, string];
    /**
     * default is **GB, GB**
     */
    gigabytes?: [string, string];
    /**
     * default is **TB, TB**
     */
    terabytes?: [string, string];
}
declare type SOLTimeUnit = "seconds" | "minutes" | "hours" | "days";
declare class SOLTime {
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
declare type SOLSizeUnit = "bytes" | "kilobytes" | "megabytes" | "gigabytes" | "terabytes";
declare class SOLSize {
    private unitMultipliers;
    private bytes;
    constructor(value: number, unit: SOLSizeUnit);
    /**
     * Convert size from current to target size unit
     */
    to: (unit: SOLSizeUnit) => number;
    /**
     * Make verbose size string up to terabytes (TB). For example:
     * **921 bytes**
     * **128 kB**
     * **1.2 MB**
     * **12.28 GB**
     * **1.2 TB**
     */
    toVerboseString: (customSizeNames?: SOLSizeNames) => string;
}
interface Number {
    /**
     * Pad start of the number to match specified length with specified character.
     * Uses String.prototype.padStart under the hood
     */
    padStart: (maxLength: number, 
    /**
     * Character to pad number with.
     * Defaults to "0"
     */
    padWith?: string) => string;
    /**
     * Bounds value to provided min and max values
     */
    limit: (min: number, max: number) => number;
    /**
     * Place space each 3 numbers
     */
    formatThousands: () => string;
    /**
     * Turn number into pluralized string, e.g.
     * **1 item**
     * **24 points**
     */
    pluralize: (singularForm: string, pluralForm: string, 
    /**
     * If provided value is greater than or equal to 0, `Number.toFixed` will be applied to the number.
     * Default: -1,
     */
    toFixed?: number) => string;
    as: <T extends SOLTimeUnit | SOLSizeUnit>(unit: T) => T extends SOLTimeUnit ? SOLTime : SOLSize;
}
