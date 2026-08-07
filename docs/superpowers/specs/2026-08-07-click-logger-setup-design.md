# click-logger 프로젝트 초기 세팅 설계

## 배경

빈 저장소(클릭로거)에 클릭 로거 라이브러리 개발을 위한 기본 툴체인을 구성한다. 최종적으로 npm에 퍼블리시하여 jsDelivr CDN(`cdn.jsdelivr.net/npm/click-logger`)으로 브라우저에서 바로 로드할 수 있게 만드는 것이 목표다.

## 범위

이번 작업은 로컬 빌드 세팅까지다. `npm publish`는 사용자가 준비되면 직접 실행한다.

## 결정 사항

- 패키지 매니저: pnpm
- 번들러: Vite (라이브러리 모드)
- 언어: TypeScript
- npm 패키지명: `click-logger`
- 배포 방식: npm 퍼블리시 → jsDelivr가 npm 기반 경로로 자동 서빙 (`cdn.jsdelivr.net/npm/click-logger`)
- 빌드 포맷: `es`(모듈 사용용)와 `iife`(브라우저 `<script>` 태그 직접 로드용) 둘 다 생성. 전역 변수명은 `ClickLogger`.

## 구성 파일

- `package.json`
  - `name: "click-logger"`, `version: "0.1.0"`, `type: "module"`
  - `main`, `module`, `unpkg`, `jsdelivr` 필드가 각각 `dist/click-logger.js` / `dist/click-logger.iife.js`를 가리키도록 설정
  - `files: ["dist"]`
  - `scripts.build`: `vite build`
  - devDependencies: `vite`, `typescript`
- `tsconfig.json`: 라이브러리용 기본 TS 설정 (target ES2020+, strict, moduleResolution bundler 등)
- `vite.config.ts`: `build.lib` 설정 (`entry: src/index.ts`, `formats: ['es', 'iife']`, `name: 'ClickLogger'`)
- `src/index.ts`: `console.log`만 출력하는 진입 파일
- `.gitignore`: `node_modules`, `dist`

## 빌드 산출물

- `dist/click-logger.js` — ES 모듈
- `dist/click-logger.iife.js` — 브라우저 `<script src="https://cdn.jsdelivr.net/npm/click-logger">` 로 직접 로드 가능한 번들

## 테스트 / 검증

- `pnpm install` 정상 완료
- `pnpm build` 실행 시 `dist/click-logger.js`, `dist/click-logger.iife.js` 생성 확인
- 생성된 `dist/click-logger.iife.js`를 Node 또는 브라우저 콘솔에서 실행해 `console.log` 출력 확인

## 범위 밖

- npm 퍼블리시 자체 실행
- 클릭 로깅 실제 기능 구현 (현재는 `console.log` placeholder만)
- 테스트 프레임워크 세팅
