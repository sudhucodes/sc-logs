import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createLogger, Logger, logger } from "../src";
import { color } from "../src/constants/colors";

describe("sc-logs Logger", () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it("should log info messages with green INFO tag and timestamp", () => {
        logger.info("Server started", { port: 3000 });

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        const [timestamp, levelText, message, extra] = consoleSpy.mock.calls[0];

        expect(timestamp).toContain(color.dim);
        expect(levelText).toBe(`${color.green}INFO  ${color.reset}`);
        expect(message).toBe("Server started");
        expect(extra).toEqual({ port: 3000 });
    });

    it("should log warn messages with yellow WARN tag", () => {
        logger.warn("Low memory warning");

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        const [, levelText, message] = consoleSpy.mock.calls[0];

        expect(levelText).toBe(`${color.yellow}WARN  ${color.reset}`);
        expect(message).toBe("Low memory warning");
    });

    it("should log error messages with red ERROR tag", () => {
        logger.error("Failed to connect to database");

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        const [, levelText, message] = consoleSpy.mock.calls[0];

        expect(levelText).toBe(`${color.red}ERROR ${color.reset}`);
        expect(message).toBe("Failed to connect to database");
    });

    it("should log debug messages with blue DEBUG tag", () => {
        logger.debug("Debug information details");

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        const [, levelText, message] = consoleSpy.mock.calls[0];

        expect(levelText).toBe(`${color.blue}DEBUG ${color.reset}`);
        expect(message).toBe("Debug information details");
    });

  it("should support prefix when initialized with options object", () => {
    const httpLogger = createLogger({ prefix: "HTTP" });
    httpLogger.info("GET /api/v1/users");

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const [, , prefix, message] = consoleSpy.mock.calls[0];
    expect(prefix).toBe(`${color.dim}[HTTP]${color.reset}`);
    expect(message).toBe("GET /api/v1/users");

    const dbLogger = createLogger({ prefix: "DB" });
    dbLogger.warn("Query took 150ms");

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    const [, , prefix2, message2] = consoleSpy.mock.calls[1];
    expect(prefix2).toBe(`${color.dim}[DB]${color.reset}`);
    expect(message2).toBe("Query took 150ms");
  });

    it("should export a working singleton logger instance", () => {
        expect(logger).toBeInstanceOf(Logger);
        expect(typeof logger.info).toBe("function");
        expect(typeof logger.warn).toBe("function");
        expect(typeof logger.error).toBe("function");
        expect(typeof logger.debug).toBe("function");
    });
});
