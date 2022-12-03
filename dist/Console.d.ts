export {};
import { CustomLog, CustomLogFunction } from "./standalone/Console";
declare type CustomConsole = {
    [key in CustomLog]: CustomLogFunction;
};
declare global {
    interface Console extends CustomConsole {
    }
}
