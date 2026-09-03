import { createLogger, logger } from "../src";

console.log("\n--- Default Logger ---");
logger.info("Application starting...", { port: 8080, env: "production" });
logger.debug("Connecting to Redis cache on localhost:6379");
logger.warn("High memory usage detected (85%)");
logger.error("Failed to process payment request #9482", new Error("Network timeout"));

console.log("\n--- Prefixed Loggers ---");
const httpLogger = createLogger({ prefix: "HTTP" });
httpLogger.info("GET /api/v1/users 200 OK (14ms)");

const dbLogger = createLogger({ prefix: "Database" });
dbLogger.info("Executing query: SELECT * FROM users WHERE active = true");
dbLogger.warn("Query took longer than expected: 250ms");
dbLogger.error("Query connection timeout");
