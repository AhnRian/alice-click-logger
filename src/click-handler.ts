export default class ClickLogger {
  constructor() {}

  static init() {
    if (typeof window === "undefined") return;
    if (window.__clickLoggerInit) return;

    window.__clickLoggerInit = true;

    const logger = new ClickLogger();
    document.addEventListener("click", logger.handleClick);
  }

  private handleClick = (event: MouseEvent) => {
    const parsedData = this.extractDataParams(event.target);
    if (!parsedData) return;

    const logEntry = { ...parsedData, timestamp: new Date().toISOString() };

    console.log(logEntry);
  };

  extractDataParams(
    target: EventTarget | null
  ): Record<string, unknown> | undefined {
    const matchedElement = this.findMatchedElement(target);
    if (!matchedElement) return undefined;

    const parsedData = this.parseDataParamsAttribute(matchedElement);
    if (!this.isPlainObject(parsedData)) return undefined;

    return parsedData;
  }

  findMatchedElement(target: EventTarget | null): Element | undefined {
    if (!(target instanceof Element)) return undefined;
    return target.closest("[data-params]") ?? undefined;
  }

  parseDataParamsAttribute(element: Element): unknown {
    const dataParamsJson = element.getAttribute("data-params");
    if (!dataParamsJson) return undefined;

    try {
      return JSON.parse(dataParamsJson);
    } catch {
      console.warn("[click-logger] invalid data-params JSON:", dataParamsJson);
      return undefined;
    }
  }

  isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}
