import { extractDataParams } from "./click-handler";

document.addEventListener("click", (event) => {
  const parsedData = extractDataParams(event.target);
  if (!parsedData) return undefined;

  const logEntry = { ...parsedData, timestamp: new Date().toISOString() };

  console.log(logEntry);
});
