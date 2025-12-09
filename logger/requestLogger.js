
import morgan from "morgan";
import logger from "./index.js";


const stream = {
  write: (message) => logger.http(message.trim())
};

export const requestLogger = morgan("combined", { stream });
