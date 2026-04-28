# AGENTS.md

이 저장소에서 작업하는 모든 AI 코딩 에이전트(Antigravity, Claude Code, Cursor, Codex 등)를 위한 공용 진입점입니다.

## 프로젝트 개요

- 이름: `trigger-blog` (일상에 방아쇠를 당기다)
- 스택: Next.js 13, MDX(`mdx-bundler` / `next-mdx-remote`), gray-matter, Tailwind, MUI, Emotion
- 빌드/배포: `npm run build` (`next build && next export`) → `out/` 정적 산출물 → GitHub Actions + 셸 스크립트로 oracle linux9(aarch64) 서버 배포
- 콘텐츠: `posts/` 하위의 MDX 글이 [pages/blog.tsx](pages/blog.tsx) 목록과 [pages/blog/[slug].tsx](pages/blog/[slug].tsx) 상세 라우트로 자동 노출됨 (`lib/blog-api.ts` 참조).

## 디렉터리 지도

- [posts/](posts/) — 블로그 글 (MDX). 글 추가 시 다른 곳을 건드릴 필요 없음.
- [pages/](pages/) — Next.js 라우트.
- [components/](components/) — UI 컴포넌트.
- [lib/](lib/) — MDX 로딩, 날짜 포맷, fetcher 등 유틸.
- [interfaces/](interfaces/) — 타입 정의.
- [public/images/](public/images/) — 글에서 참조하는 이미지 자산.
- [data/](data/) — 퀴즈 등 정적 데이터.

## 작업별 가이드

### 새 블로그 글 작성

**반드시** [docs/blog-writing-guide.md](docs/blog-writing-guide.md)를 읽고 그 규칙(슬러그·frontmatter·톤·금지사항)을 그대로 따른다. 이 문서가 모든 에이전트의 단일 출처(single source of truth)다.

다른 에이전트별 진입점은 모두 같은 가이드를 가리킨다:

- Claude Code: [.claude/skills/write-post/SKILL.md](.claude/skills/write-post/SKILL.md)
- Antigravity / OpenAI Codex / Cursor 등 `AGENTS.md` 컨벤션 따르는 에이전트: 이 파일

규칙이 바뀌면 [docs/blog-writing-guide.md](docs/blog-writing-guide.md)만 수정하고, 진입점 파일들은 그대로 둔다.

### 그 외 코드 수정

- 패키지 매니저는 `npm` 사용 (`package-lock.json` 존재).
- 린트: `npm run lint`.
- 로컬 개발: `npm run dev`.
- 배포 자동화는 [.github/](.github/) workflow를 통해 동작 — CI/CD 파일을 수정할 때는 사용자 확인 필수.

## 공통 행동 규칙

- 사용자 동의 없이 `git commit` / `git push`를 자동 실행하지 않는다.
- 외부에서 이미지·폰트 등 자산을 임의로 다운로드하지 않는다.
- 환경 변수는 [.env.example](.env.example) 형식을 따르며, 실제 `.env`는 커밋하지 않는다.
- 본문(블로그 글) 언어는 한국어. 코드 주석·커밋 메시지도 본 저장소의 기존 스타일(한국어 + 영문 prefix `Feat:` / `Fix:` 등)을 따른다.
