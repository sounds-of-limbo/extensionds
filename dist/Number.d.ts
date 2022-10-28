interface SizeNames {
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
    /**
     * Treat number as bytes and return verbose size string up to terabytes (TB).
     * For example:
     * **921 bytes**
     * **128 kB**
     * **1.2 MB**
     * **12.28 GB**
     * **1.2 TB**
     */
    asBytesToVerboseSize: (customSizeNames?: SizeNames) => string;
    /**
     * Treat number as seconds and return time string.
     * For example:
     * **00:42**
     * **04:20**
     * **1:15:01**
     */
    asSecondsToTime: (
    /**
     * If there is more than 24 hours, whether there should be extra 'days' label at the start or not.
     * Default: `false`
     */
    separateDays?: boolean) => string;
    /**
     * Treat number as seconds and return verbose time string.
     * For example:
     * **42 sec**
     * **4 min 20 sec**
     * **1 h 15 min 1 sec**
     */
    asSecondsToVerboseTime: () => string;
}
