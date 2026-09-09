# @black-peach-cake/click-logger

`data-params` 속성을 가진 요소(또는 그 조상)를 클릭하면 자동으로 감지해서 로그를 남기는 경량 이벤트 위임 클릭 로거입니다. `document`에 클릭 리스너 하나만 등록하고, `closest("[data-params]")`로 클릭 지점에서 조상 방향으로 탐색합니다.

**[라이브 데모 보기](https://ahnrian.github.io/alice-click-logger/)** — 브라우저에서 직접 클릭해보고 결과를 바로 확인할 수 있습니다.

## 설치

```bash
npm install @black-peach-cake/click-logger
# 또는
pnpm add @black-peach-cake/click-logger
```

## 사용법

### ESM

```js
import "@black-peach-cake/click-logger";
```

import하는 순간 `document`에 클릭 리스너가 등록됩니다(사이드 이펙트 모듈, 별도 초기화 호출 불필요).

### `<script>` 태그 (CDN)

```html
<script src="https://unpkg.com/@black-peach-cake/click-logger"></script>
```

### 마크업

로깅하고 싶은 요소(또는 그 조상)에 `data-params`를 JSON 문자열로 넣어두면 됩니다.

```html
<button data-params='{"service":"signup", "cta":"header"}'>가입하기</button>

<!-- 조상에 있어도 인식됩니다 -->
<div data-params='{"section":"pricing"}'>
  <button>더 알아보기</button>
</div>
```

버튼을 클릭하면 콘솔에 아래처럼 찍힙니다.

```js
{ service: "signup", cta: "header", timestamp: "2026-09-09T12:00:00.000Z" }
```

- `data-params`가 없는 요소를 클릭하면 아무 로그도 남지 않습니다.
- `data-params` 값이 올바른 JSON 객체가 아니면(깨진 JSON, 배열, 숫자 등) `console.warn`만 남기고 무시합니다.

## 테스트

Vitest + jsdom 기반 유닛테스트가 포함되어 있습니다.

```bash
pnpm test
```

## 라이선스

ISC
