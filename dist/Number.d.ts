import { INumberExtension } from "./standalone/Number";
export {};
declare global {
    interface Number extends INumberExtension {
    }
}
