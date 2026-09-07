import { describe, expect, it, vi } from "vitest";
import ClickLogger from "./click-handler";

describe("ClickLogger.extractDataParams", () => {
  it("클릭한 요소 자신에게 data-params가 있으면 파싱해서 반환한다", () => {
    document.body.innerHTML = `
      <button id="btn" data-params='{"service":"self"}'></button>
    `;
    const target = document.getElementById("btn");
    const logger = new ClickLogger();

    expect(logger.extractDataParams(target)).toEqual({ service: "self" });
  });

  it("클릭한 요소 자신에겐 없어도 조상 요소에 있으면 찾아서 반환한다", () => {
    document.body.innerHTML = `
      <div data-params='{"service":"parent"}'>
        <button id="btn"></button>
      </div>
    `;
    const target = document.getElementById("btn");
    const logger = new ClickLogger();

    expect(logger.extractDataParams(target)).toEqual({ service: "parent" });
  });

  it("data-params가 자신과 조상 어디에도 없으면 undefined를 반환한다", () => {
    document.body.innerHTML = `<button id="btn"></button>`;
    const target = document.getElementById("btn");
    const logger = new ClickLogger();

    expect(logger.extractDataParams(target)).toBeUndefined();
  });

  it("data-params 값이 깨진 JSON이면 undefined를 반환하고 경고를 남긴다", () => {
    document.body.innerHTML = `<button id="btn" data-params="not-json"></button>`;
    const target = document.getElementById("btn");
    const logger = new ClickLogger();
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(logger.extractDataParams(target)).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledOnce();

    warnSpy.mockRestore();
  });

  it("data-params 값이 파싱은 되지만 순수 객체가 아니면(배열) undefined를 반환한다", () => {
    document.body.innerHTML = `<button id="btn" data-params="[1,2,3]"></button>`;
    const target = document.getElementById("btn");
    const logger = new ClickLogger();

    expect(logger.extractDataParams(target)).toBeUndefined();
  });

  it("data-params 값이 파싱은 되지만 순수 객체가 아니면(숫자) undefined를 반환한다", () => {
    document.body.innerHTML = `<button id="btn" data-params="123"></button>`;
    const target = document.getElementById("btn");
    const logger = new ClickLogger();

    expect(logger.extractDataParams(target)).toBeUndefined();
  });

  it("target이 Element가 아니면(null) undefined를 반환한다", () => {
    const logger = new ClickLogger();

    expect(logger.extractDataParams(null)).toBeUndefined();
  });
});
