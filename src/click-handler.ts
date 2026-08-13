export function extractDataParams(
  target: EventTarget | null
): Record<string, unknown> | undefined {
  const isElement = target instanceof Element;
  if (!isElement) return undefined;

  const matchedElement = target.closest("[data-params]");
  if (!matchedElement) return undefined;

  const dataParamsJson = matchedElement.getAttribute("data-params");
  if (!dataParamsJson) return undefined;

  let parsedData: unknown;

  try {
    parsedData = JSON.parse(dataParamsJson);
  } catch {
    console.warn("[click-logger] invalid data-params JSON:", dataParamsJson);
    return undefined;
  }

  const isValidParams =
    typeof parsedData === "object" &&
    parsedData !== null &&
    !Array.isArray(parsedData);

  if (!isValidParams) return undefined;

  return parsedData as Record<string, unknown>;
}
