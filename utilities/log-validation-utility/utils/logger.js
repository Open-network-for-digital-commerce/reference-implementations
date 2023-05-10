"use strict";
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;
const constants = require("./constants");

const log_dir = constants.LOG_FILE_PATH;

const loggerFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

loggerOpts = {
  console: {
    format: combine(colorize(), timestamp(), loggerFormat),
  },
  file: {
    filename: log_dir + "/validations.log",
    level: "error",
    format: combine(timestamp(), loggerFormat),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  level: "info",
  defaultMeta: { service: "user-service" },
  exitOnError: false,
  transports: [
    new transports.Console(loggerOpts.console),
    new transports.File(loggerOpts.file),
  ],
});

exports.logger = logger;
