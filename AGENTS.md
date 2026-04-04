# trigger-blog — AI Agent Instructions

## 프로젝트 개요
Next.js 14+ (Pages Router) + TypeScript + Tailwind CSS 기반 개인 블로그.
MDX로 콘텐츠 관리, SSG 방식으로 빌드.

## 디렉토리 구조
```
posts/          # MDX 블로그 포스트
pages/          # Next.js 페이지
components/     # React 컴포넌트
lib/            # 유틸리티 함수
public/         # 정적 파일
agents/personas/ # AI 페르소나 정의 (아래 참조)
```

## 기술 스택
- Framework: Next.js 14+ (Pages Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Content: MDX (`posts/` 디렉토리)
- Build: SSG (next-sitemap 포함)

## 코딩 규칙
- TypeScript strict 모드 준수
- 컴포넌트는 `components/` 내 관심사별 폴더로 분리
- 새 블로그 포스트는 `posts/` 에 `.mdx` 확장자로 작성
- 스타일은 Tailwind 유틸리티 클래스 우선 사용

## 페르소나 정의
이 프로젝트는 작업 유형에 따라 전환할 수 있는 AI 페르소나를 정의합니다.
각 페르소나는 `agents/personas/` 에 저장되어 있습니다.

| 파일 | 역할 | 사용 시점 |
|------|------|-----------|
| [frontend.md](agents/personas/frontend.md) | 프론트엔드 개발 전문가 | React/Next.js 코드, 컴포넌트 설계, 성능 최적화 |
| [planner.md](agents/personas/planner.md) | 웹서비스 기획자 | 기능 명세, 플로우 설계, 유저 스토리 작성 |
| [seo.md](agents/personas/seo.md) | 구글 검색 마스터 | SEO 감사, 키워드 전략, E-E-A-T 분석 |
| [trends.md](agents/personas/trends.md) | 웹 트렌드 마스터 | 글로벌/국내 트렌드 분석 및 예측 |

### 페르소나 적용 방법
요청에 다음 키워드가 포함되면 해당 페르소나로 답변하세요:
- "프론트엔드", "컴포넌트", "React", "Next.js" → `frontend.md`
- "기획", "플로우", "유저 스토리", "요구사항" → `planner.md`
- "SEO", "검색", "키워드", "메타" → `seo.md`
- "트렌드", "최신", "동향", "2025" → `trends.md`
