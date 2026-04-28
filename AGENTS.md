# AGENTS.md

이 저장소에서 작업하는 모든 AI 코딩 에이전트(Antigravity, Claude Code, Cursor, Codex 등)를 위한 공용 진입점입니다.

## 프로젝트 개요

- 이름: `trigger-blog` (일상에 방아쇠를 당기다)
- 스택: Next.js 13 (Pages Router), TypeScript (strict), MDX (`next-mdx-remote`), gray-matter, Tailwind CSS
- 배포: `npm run build` → `next export` → `out/` → GitHub Actions + 셸 스크립트로 oracle linux9(aarch64) 배포
- 콘텐츠: `posts/` 하위의 MDX 글이 [pages/blog.tsx](pages/blog.tsx)에 카테고리·태그·검색 UI로 노출되고, [pages/blog/[slug].tsx](pages/blog/[slug].tsx)에서 상세 렌더링됨 ([lib/blog-api.ts](lib/blog-api.ts) 참조).

## 디렉터리 지도

- [posts/](posts/) — 블로그 글 (MDX). frontmatter에 `title / description / date / image / category / tags`.
- [pages/](pages/) — Next.js 라우트.
- [components/](components/) — 도메인별 서브폴더로 정리됨
  - `blog/` — 블로그 카드·히어로·사이드바
  - `common/` — 공통 컴포넌트 (SEO, GoogleAdsense, ThemeSwitch 등)
  - `layout/` — Layout, NavBar, Footer, MobileNav
  - `quiz/` — 퀴즈 UI
- [hooks/](hooks/) — React 커스텀 훅 (useQuiz 등)
- [lib/](lib/) — MDX 로딩·유틸 ([blog-api.ts](lib/blog-api.ts)가 진입점).
- [types/](types/) — 타입 정의 (post, layout, quiz). PostType은 `category`, `tags` 포함.
- [config/](config/) — 정적 설정 (headerNavLinks).
- [data/](data/) — 데이터 (`siteMetadata.ts`, `quiz-data.json`).
- [public/images/](public/images/) — 글에서 참조하는 이미지 자산.
- [agents/personas/](agents/personas/) — AI 페르소나 정의 (아래 참조).
- [docs/](docs/) — 에이전트 공용 가이드.

## 작업별 가이드

### 새 블로그 글 작성

**반드시** [docs/blog-writing-guide.md](docs/blog-writing-guide.md)를 읽고 그 규칙(슬러그·frontmatter·톤·금지사항)을 따른다. 이 문서가 모든 에이전트의 단일 출처(single source of truth)다.

진입점:
- Claude Code: [.claude/skills/write-post/SKILL.md](.claude/skills/write-post/SKILL.md)
- Antigravity / OpenAI Codex / Cursor 등: 이 파일

규칙이 바뀌면 [docs/blog-writing-guide.md](docs/blog-writing-guide.md)만 수정하고 진입점들은 그대로 둔다.

### 페르소나 적용 (작업 유형별 분기)

이 저장소는 작업 유형에 따라 전환할 수 있는 AI 페르소나를 정의합니다. 각 페르소나는 [agents/personas/](agents/personas/)에 저장되어 있습니다.

| 파일 | 역할 | 사용 시점 |
|------|------|-----------|
| [frontend.md](agents/personas/frontend.md) | 프론트엔드 개발 전문가 | React/Next.js 코드, 컴포넌트 설계, 성능 최적화 |
| [planner.md](agents/personas/planner.md) | 웹서비스 기획자 | 기능 명세, 플로우 설계, 유저 스토리 작성 |
| [seo.md](agents/personas/seo.md) | 구글 검색 마스터 | SEO 감사, 키워드 전략, E-E-A-T 분석 |
| [trends.md](agents/personas/trends.md) | 웹 트렌드 마스터 | 글로벌/국내 트렌드 분석 및 예측 |

요청에 다음 키워드가 포함되면 해당 페르소나로 답변:
- "프론트엔드", "컴포넌트", "React", "Next.js" → `frontend.md`
- "기획", "플로우", "유저 스토리", "요구사항" → `planner.md`
- "SEO", "검색", "키워드", "메타" → `seo.md`
- "트렌드", "최신", "동향" → `trends.md`

### 그 외 코드 수정

- 패키지 매니저는 `npm` (`package-lock.json` 존재).
- 린트: `npm run lint` (`.eslintrc.json`에 `@typescript-eslint/no-explicit-any: error` 적용).
- 로컬 개발: `npm run dev`.
- 배포 자동화는 [.github/](.github/) workflow를 통해 동작 — CI/CD 파일 수정은 사용자 확인 필수.

## 공통 행동 규칙

- 사용자 동의 없이 `git commit` / `git push`를 자동 실행하지 않는다.
- 외부에서 이미지·폰트 등 자산을 임의로 다운로드하지 않는다.
- 환경 변수는 [.env.example](.env.example) 형식을 따르며, 실제 `.env`는 커밋하지 않는다.
- 본문(블로그 글) 언어는 한국어. 코드 주석·커밋 메시지도 본 저장소의 기존 스타일(한국어 + 영문 prefix `Feat:` / `Fix:` / `Refactor:` / `Docs:` 등)을 따른다.
- TypeScript strict 모드 준수. `any` 사용 금지 (린트가 차단).
- 컴포넌트는 `components/<도메인>/` 하위 폴더 규칙을 유지.
