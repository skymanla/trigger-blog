# Blog Writing Guide (trigger-blog)

> 이 문서는 **에이전트 공용 캐노니컬 가이드**입니다.
> Claude Code, Antigravity, Cursor, Codex 등 어떤 AI 에이전트가 이 저장소에서 새 블로그 글을 작성할 때든 동일하게 따라야 하는 규칙을 정의합니다.
> 다른 에이전트별 진입점([AGENTS.md](../AGENTS.md), [.claude/skills/write-post/SKILL.md](../.claude/skills/write-post/SKILL.md))은 이 문서를 참조합니다.
> 규칙이 변경되면 **이 문서만 수정**하고, 진입점들은 그대로 둡니다.

---

## 0. 프로젝트 한 줄 소개

`trigger-blog` (일상에 방아쇠를 당기다) — 일상의 작은 변화·습관·몰입·미니멀리즘·회고를 다루는 한국어 MDX 에세이 블로그. Next.js 13 + MDX + gray-matter 기반.

## 1. 파일 위치 및 슬러그

- 경로: `posts/<slug>.mdx`
- 슬러그 규칙
  - 영문 주제는 kebab-case (예: `deep-work.mdx`, `the-power-of-micro-habits.mdx`)
  - 한글 주제는 한글 그대로 가능 (예: `2022년-마지막날-회고록.mdx`)
- 작성 전 `posts/`를 확인해 동일/유사 슬러그가 없는지 점검할 것.
- 파일 추가 외에는 다른 페이지·컴포넌트(`pages/blog.tsx`, `components/BlogPostCard.tsx`, `lib/blog-api.ts` 등)를 수정하지 않는다. 글 추가만으로 목록·상세 라우팅이 자동 처리됨.

## 2. Frontmatter (필수)

```mdx
---
title: 글의 한국어 제목
description: 한 줄 요약 (목록 카드에 노출됨)
date: "YYYY-MM-DD"
image: "/images/<file>"
---
```

- `title` — 따옴표 없이 또는 `"…"`로 감쌀 수 있음. 콜론·특수기호가 들어가면 따옴표 필수.
- `description` — 목록 카드에 노출되는 한 줄 요약.
- `date` — **반드시 큰따옴표 + `YYYY-MM-DD`** 형식. 정렬·RSS(`feed`)·sitemap에 직접 영향.
- `image` — `/public/images/` 하위에서 고름. 실제 존재하는 파일만 사용. 새 이미지를 임의로 지어내거나 외부에서 다운로드하지 말 것. 사용 가능한 이미지를 모르면 작성 직전 `ls public/images`로 확인.

## 3. 본문 톤 & 구조

이 블로그는 **"트리거(방아쇠)"** 메타포로 일상의 변화를 이야기하는 한국어 에세이다.

권장 구조:

1. **H1 한 줄짜리 임팩트 있는 제목** — 본문 첫 줄. frontmatter `title`을 그대로 반복하지 말고 도발적/공감 가는 한 줄로.
2. **도입부 2~4문장** — 독자에게 질문을 던지거나, 누구나 겪는 일상의 한 장면을 묘사.
3. **H2 본론 섹션 2~4개** — 각 섹션은 짧고, 필요하면 H3로 더 잘게 나눈다.
4. **목록/숫자 리스트** — 실천 팁이나 비교는 `-` / `1.` 으로 정리.
5. **인용블록** `> ` 으로 책·인물 어록을 한 번 정도 인용 (출처 책 제목은 백틱 + 꺾쇠: `` `<책 제목>` ``).
6. **마무리** — "당신의 트리거는 무엇인가요?" 처럼 독자에게 행동을 권유하며 트리거/방아쇠 메타포로 회수.

## 4. 마크다운/MDX 관습

- 강조: `**굵게**` — 한 섹션에 1~2회의 핵심 문장에만.
- 호흡이 필요한 큰 섹션 사이에 `<br />` 태그를 종종 사용 (`finding-your-daily-trigger.mdx`, `the-power-of-micro-habits.mdx` 참고). 남용 금지.
- 일반 에세이엔 코드블록을 쓰지 않는다. 기술 글에서 코드/명령은 펜스드 코드블록으로.
- 문장은 길지 않게, 단락은 1~3문장 위주의 호흡.
- 모든 본문은 **한국어**. (영문 인용은 따옴표로 묶어 한 문장 정도만 허용)

## 5. 작성 절차 (모든 에이전트 공통)

1. 사용자에게 주제/제목/원하는 톤이 모호하면 **한 번만** 짧게 확인. 명확하면 바로 진행.
2. `ls public/images`로 사용 가능한 이미지 확인 후 주제에 어울리는 것 선택.
3. `ls posts`로 슬러그 충돌 확인.
4. `posts/<slug>.mdx` 파일 생성.
5. 작성 후 사용자가 `npm run dev`로 미리 확인할 수 있음을 안내. 로컬 서버 자동 실행은 사용자 요청이 있을 때만.

## 6. 하지 말 것

- 영어로 본문 작성.
- frontmatter `date` 누락 또는 형식 변경.
- 존재하지 않는 이미지 경로 사용.
- 이미지 파일을 임의로 추가/다운로드 (사용자 동의 없이 외부 자산을 가져오지 말 것).
- 글 작성 후 `git commit` / `git push`를 자동으로 수행 (사용자가 명시적으로 요청할 때만).
- 다른 페이지/컴포넌트 수정.

## 7. 톤별 참고 예시

- 짧은 에세이: `posts/deep-work.mdx`, `posts/digital-minimalism.mdx`
- 구조화된 팁 글: `posts/finding-your-daily-trigger.mdx`, `posts/the-power-of-micro-habits.mdx`
- 회고/일기 톤: `posts/2022년-마지막날-회고록.mdx`
- 기술 글 톤: `posts/pm2를-사용한-node-무중단배포.mdx`, `posts/low-server에서-npm-build.mdx`
