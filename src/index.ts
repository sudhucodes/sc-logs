import { Logger } from "./core/logger";
import { LoggerOptions, LogLevel } from "./types";

export const logger = new Logger();

export const createLogger = (options?: LoggerOptions): Logger => {
    return new Logger(options);
};

export { Logger };
export type { LoggerOptions, LogLevel };
