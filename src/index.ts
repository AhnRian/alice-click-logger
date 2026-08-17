import ClickLogger from "./click-handler";

declare global {
  interface Window {
    __clickLoggerInit?: boolean;
  }
}

ClickLogger.init();
