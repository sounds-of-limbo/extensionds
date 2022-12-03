import { SOLSize, SOLSizeUnit } from "../helpers/size";
import { SOLTime, SOLTimeUnit } from "../helpers/time";
export interface INumberExtension {
    /**
     * Pad start of the number to match specified length with specified character.
     * Uses `String.prototype.padStart` under the hood
     */
    padStart: (maxLength: number, 
    /**
     * Character to pad number with.
     * Defaults to `"0"`
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
     * Treat number as specific numeric unit (time, size, etc.)
     */
    as: <T extends SOLTimeUnit | SOLSizeUnit>(
    /**
     * Unit to treat number as
     */
    unit: T) => T extends SOLTimeUnit ? SOLTime : SOLSize;
}
export declare class SOLNumber implements INumberExtension {
    private readonly value;
    constructor(value: number);
    padStart: (maxLength: number, padWith?: string) => string;
    limit: (min: number, max: number) => number;
    formatThousands: () => string;
    pluralize: (singularForm: string, pluralForm: string, toFixed?: number) => string;
    as: <T extends SOLSizeUnit | SOLTimeUnit>(unit: T) => T extends SOLTimeUnit ? SOLTime : SOLSize;
}
