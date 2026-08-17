import { extractDataParams } from "./click-handler";

declare global {
  interface Window {
    __clickLoggerInit?: boolean;
  }
}

if (!window.__clickLoggerInit) {
  window.__clickLoggerInit = true;

  document.addEventListener("click", (event) => {
    const parsedData = extractDataParams(event.target);
    if (!parsedData) return undefined;

    const logEntry = { ...parsedData, timestamp: new Date().toISOString() };

    console.log(logEntry);
  });
}
