import { color } from "../constants/colors";
import { getTimestamp } from "../formatters/timestamp";
import { LoggerOptions } from "../types";

export class Logger {
    public prefix?: string;

    constructor(options: LoggerOptions = {}) {
        this.prefix = options.prefix;
    }

    public info(message: string, ...args: unknown[]): void {
        this.log("INFO", message, color.green, ...args);
    }

    public warn(message: string, ...args: unknown[]): void {
        this.log("WARN", message, color.yellow, ...args);
    }

    public error(message: string, ...args: unknown[]): void {
        this.log("ERROR", message, color.red, ...args);
    }

    public debug(message: string, ...args: unknown[]): void {
        this.log("DEBUG", message, color.blue, ...args);
    }

    public log(level: string, message: string, colorCode: string, ...args: unknown[]): void {
        const timestamp = getTimestamp();
        const levelText = `${colorCode}${level.padEnd(6)}${color.reset}`;

        if (this.prefix) {
            console.log(
                `${color.dim}${timestamp}${color.reset}`,
                levelText,
                `${color.dim}[${this.prefix}]${color.reset}`,
                message,
                ...args,
            );
        } else {
            console.log(`${color.dim}${timestamp}${color.reset}`, levelText, message, ...args);
        }
    }
}
