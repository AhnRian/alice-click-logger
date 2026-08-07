# click-logger 초기 세팅 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** pnpm + Vite + TypeScript 툴체인을 세팅하고, `console.log`만 출력하는 `src/index.ts`를 빌드해서 jsDelivr(npm 경로)로 서빙 가능한 `dist/` 산출물을 만든다.

**Architecture:** 단일 패키지(`click-logger`) 라이브러리. Vite를 라이브러리 모드(`build.lib`)로 사용해 `es`와 `iife` 두 포맷으로 번들링한다. `iife` 산출물이 jsDelivr을 통해 `<script>` 태그로 직접 로드된다.

**Tech Stack:** pnpm, Vite, TypeScript

## Global Constraints

- npm 패키지명: `click-logger` (spec 결정 사항)
- 빌드 포맷: `es`와 `iife` 둘 다 생성, iife 전역 변수명은 `ClickLogger`
- `package.json`에 `main`/`module`/`unpkg`/`jsdelivr` 필드로 `dist/click-logger.js`, `dist/click-logger.iife.js`를 가리켜야 함
- npm publish는 이번 작업 범위 밖 (사용자가 직접 실행)

---

### Task 1: 프로젝트 스캐폴딩 (pnpm + TypeScript + index.ts)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `src/index.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: `src/index.ts` 파일 (Task 2의 Vite 빌드 엔트리로 사용됨)
- Produces: `package.json`의 `name: "click-logger"`, `version: "0.1.0"`, `type: "module"` (Task 2에서 필드 추가로 확장됨)

- [ ] **Step 1: pnpm으로 package.json 초기화**

```bash
pnpm init
```

- [ ] **Step 2: package.json 기본 필드 수정**

`package.json`을 열어 아래 내용으로 맞춘다 (pnpm init이 만든 기본값 위에 수정):

```json
{
  "name": "click-logger",
  "version": "0.1.0",
  "type": "module",
  "description": "",
  "license": "MIT"
}
```

- [ ] **Step 3: TypeScript를 devDependency로 설치**

```bash
pnpm add -D typescript
```

- [ ] **Step 4: tsconfig.json 작성**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

- [ ] **Step 5: src/index.ts 작성**

```typescript
console.log("click-logger initialized");
```

- [ ] **Step 6: .gitignore 작성**

```
node_modules
dist
```

- [ ] **Step 7: TypeScript 컴파일 확인 (타입 에러 없는지만 확인, 산출물은 Task 2의 Vite가 만듦)**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없이 종료 (exit code 0, 출력 없음)

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json src/index.ts .gitignore
git commit -m "Scaffold pnpm + TypeScript project with index.ts entry"
```

---

### Task 2: Vite 라이브러리 빌드 세팅 + jsDelivr용 산출물 검증

**Files:**
- Create: `vite.config.ts`
- Modify: `package.json` (Task 1에서 만든 파일에 필드 추가)

**Interfaces:**
- Consumes: `src/index.ts` (Task 1에서 생성, Vite 빌드 엔트리로 사용)
- Produces: `dist/click-logger.js` (ES 모듈), `dist/click-logger.iife.js` (브라우저 직접 로드용, 전역 변수 `ClickLogger`)

- [ ] **Step 1: Vite를 devDependency로 설치**

```bash
pnpm add -D vite
```

- [ ] **Step 2: vite.config.ts 작성**

```typescript
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ClickLogger",
      fileName: (format) =>
        format === "es" ? "click-logger.js" : `click-logger.${format}.js`,
      formats: ["es", "iife"],
    },
  },
});
```

- [ ] **Step 3: package.json에 빌드 스크립트 및 배포 필드 추가**

`package.json`의 기존 내용에 아래 필드를 병합한다 (Task 1에서 만든 `name`/`version`/`type` 등은 유지):

```json
{
  "main": "dist/click-logger.js",
  "module": "dist/click-logger.js",
  "unpkg": "dist/click-logger.iife.js",
  "jsdelivr": "dist/click-logger.iife.js",
  "files": ["dist"],
  "scripts": {
    "build": "vite build"
  }
}
```

- [ ] **Step 4: 빌드 실행**

```bash
pnpm run build
```

Expected: `dist/click-logger.js`와 `dist/click-logger.iife.js`가 생성됨 (exit code 0)

- [ ] **Step 5: 빌드 산출물 파일 존재 확인**

```bash
test -f dist/click-logger.js && test -f dist/click-logger.iife.js && echo OK
```

Expected: `OK` 출력

- [ ] **Step 6: iife 번들이 실제로 console.log를 실행하는지 확인**

```bash
node dist/click-logger.iife.js
```

Expected: `click-logger initialized` 출력

- [ ] **Step 7: Commit**

```bash
git add vite.config.ts package.json pnpm-lock.yaml
git commit -m "Add Vite library build producing es/iife bundles for jsDelivr"
```
