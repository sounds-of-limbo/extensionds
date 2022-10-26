declare type CustomLog = "say" | "nfo" | "ok" | "hey" | "no";
declare type CustomConsole = {
    [key in CustomLog]: (message: string, ...params: Array<any>) => void;
};
interface Console extends CustomConsole {
}
