const { createLogger, format, transports } = require("winston");

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()],
});

module.exports = logger;
