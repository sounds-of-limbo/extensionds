export declare type CustomLog = "say" | "nfo" | "ok" | "hey" | "no";
export declare type CustomLogFunction = (message: string, ...params: any[]) => void;
declare type CustomConsole = {
    [key in NormalizedCustomLog]: (message: string, ...params: any[]) => void;
};
declare type NormalizedCustomLog = "log" | "info" | "ok" | "warn" | "error";
export declare const customLog: (key: CustomLog) => (message: string, ...params: any[]) => void;
export declare const customConsole: CustomConsole;
export {};
