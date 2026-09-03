# sc-logs

A simple, zero-dependency console logger for Node.js and TypeScript.

## Features

- Zero dependencies
- ANSI color formatting with timestamped output
- Prefix support for scoping logs
- Dual ESM and CommonJS support
- Full TypeScript definitions

## Installation

```bash
npm install sc-logs
# or
pnpm add sc-logs
# or
yarn add sc-logs
```

## Usage

### Basic

```typescript
import { logger } from "sc-logs";

logger.info("Server listening on port 3000");
logger.debug("Parsing request payload", { userId: 42 });
logger.warn("Disk space running low");
logger.error("Database connection lost", new Error("ECONNREFUSED"));
```

### With Prefix

```typescript
import { createLogger } from "sc-logs";

const httpLogger = createLogger({ prefix: "HTTP" });
httpLogger.info("GET /api/v1/users 200 OK");

const dbLogger = createLogger({ prefix: "Database" });
dbLogger.warn("Query took 250ms");
```

### CommonJS

```javascript
const { logger, createLogger } = require("sc-logs");

logger.info("Hello from CommonJS");
const apiLogger = createLogger({ prefix: "API" });
apiLogger.info("API ready");
```

## Log Levels & Colors

| Level | Color | Output Format |
| :--- | :--- | :--- |
| `INFO` | Green | `DD/MM/YYYY HH:mm:ss INFO   [prefix] message` |
| `WARN` | Yellow | `DD/MM/YYYY HH:mm:ss WARN   [prefix] message` |
| `ERROR` | Red | `DD/MM/YYYY HH:mm:ss ERROR  [prefix] message` |
| `DEBUG` | Blue | `DD/MM/YYYY HH:mm:ss DEBUG  [prefix] message` |

## Development

```bash
pnpm install
pnpm run build
pnpm test
```

## License

MIT
