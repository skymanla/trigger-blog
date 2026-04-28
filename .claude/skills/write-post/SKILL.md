---
name: write-post
description: trigger-blog(일상에 방아쇠를 당기다) 프로젝트의 컨벤션과 톤에 맞는 새 MDX 블로그 글을 작성합니다. 사용자가 "블로그 글 써줘", "새 글 작성", "포스트 만들어" 같은 요청을 하면 호출하세요.
---

# write-post

trigger-blog 저장소에 새 글을 추가할 때 사용하는 Claude Code 스킬입니다.

## 단일 출처(single source of truth)

이 스킬은 **얇은 진입점**일 뿐이며, 실제 규칙은 모든 AI 에이전트(Claude Code · Antigravity · Cursor · Codex 등)가 공유하는 캐노니컬 가이드에 정의되어 있습니다.

**작업 전 반드시 다음 문서를 읽고 그 규칙을 그대로 따르세요:**

- [docs/blog-writing-guide.md](../../../docs/blog-writing-guide.md)

해당 문서에는 다음이 정의되어 있습니다:

- 파일 위치 및 슬러그 규칙
- 필수 frontmatter (`title` / `description` / `date` / `image`) 포맷
- 본문 톤 & 구조 (트리거 메타포, H1 도입, H2 본론, 인용·리스트, 마무리 회수)
- 마크다운/MDX 관습 (`<br />`, `**강조**`, 인용블록, 코드블록 사용 시점)
- 작성 절차 (이미지 확인 → 슬러그 충돌 점검 → 파일 생성)
- 금지 사항 (자동 커밋·외부 이미지 다운로드·다른 페이지 수정 등)
- 톤별 참고 예시 파일

## 동작 방식

1. 위 가이드를 읽는다.
2. 사용자에게 주제/톤이 모호하면 한 번만 짧게 확인.
3. `ls public/images`, `ls posts`로 이미지 풀과 슬러그 충돌을 점검.
4. `posts/<slug>.mdx`를 `Write` 도구로 생성.
5. `npm run dev`로 미리볼 수 있음을 안내. 자동 실행은 사용자 요청이 있을 때만.

## 규칙 변경 시

규칙을 바꾸려면 [docs/blog-writing-guide.md](../../../docs/blog-writing-guide.md)만 수정하세요. 이 SKILL.md, [AGENTS.md](../../../AGENTS.md)는 가이드를 가리키기만 하므로 동기화가 필요하지 않습니다.
