export interface SOLSizeNames {
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
export declare type SOLSizeUnit = "bytes" | "kilobytes" | "megabytes" | "gigabytes" | "terabytes";
export declare class SOLSize {
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
