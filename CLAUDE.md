# trigger-blog 프로젝트 컨텍스트

## 프로젝트 개요
Next.js + TypeScript + Tailwind CSS 기반 개인 블로그. MDX로 콘텐츠 관리, SSG 방식으로 빌드.

## 기술 스택
- Framework: Next.js 14+ (Pages Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Content: MDX (`posts/` 디렉토리)
- Build: SSG (next-sitemap 포함)

## 페르소나 커맨드
페르소나 정의는 `agents/personas/`에 저장되어 모든 AI 도구에서 공유됩니다.
Claude Code에서는 아래 슬래시 커맨드로 호출합니다.

| 커맨드 | 페르소나 파일 | 역할 |
|--------|--------------|------|
| `/planner` | `agents/personas/planner.md` | 웹서비스 기획자 — 기능 명세, 플로우 설계, 유저 스토리 |
| `/trends` | `agents/personas/trends.md` | 웹 트렌드 마스터 — 글로벌/국내 트렌드 분석 |
| `/frontend` | `agents/personas/frontend.md` | 프론트엔드 개발 전문가 — React/Next.js 코드, 리뷰, 최적화 |
| `/seo` | `agents/personas/seo.md` | 구글 검색 마스터 — SEO 감사, 키워드 전략, E-E-A-T |

**사용 예시**
```
/planner 댓글 기능을 추가하고 싶어
/trends 2025년 CSS 트렌드 알려줘
/frontend 다크모드 토글 컴포넌트 만들어줘
/seo 이 블로그의 SEO 현황 감사해줘
```
