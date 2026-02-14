import { PageSEO } from "@/components/common/SEO"
import siteMetadata from "@/data/siteMetadata"

const About = (): JSX.Element => {
    return (
        <>
            <PageSEO title="About - Kim Nam-tae" description="Resume of a Chameleon Developer" />
            <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">

                {/* Header */}
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-10 md:text-6xl md:leading-14 font-display">
                        About <span className="text-primary-500">Me</span>
                    </h1>
                    <div className="border-b-4 border-black dark:border-gray-700 w-24 mb-10"></div>
                </div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Kim Nam-tae",
                            "alternateName": "김남태",
                            "jobTitle": "Backend Developer",
                            "url": "https://trigger.kr/about",
                            "image": "https://trigger.kr/static/images/avatar.png",
                            "sameAs": [
                                "https://github.com/skymanla",
                                "https://www.linkedin.com"
                            ]
                        })
                    }}
                />

                {/* Profile Section */}
                <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
                    <div className="flex flex-col items-center space-x-2 pt-8">
                        {/* Profile Card (Neo-Brutalism) */}
                        <div className="w-full overflow-hidden border-3 border-black bg-white p-6 shadow-neo dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
                            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight font-display text-center">
                                김남태 (Kim Nam-tae)
                            </h3>
                            <div className="text-gray-500 dark:text-gray-400 text-center font-mono text-sm">
                                Chameleon Developer
                            </div>
                            <div className="mt-6 flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-sm font-bold border-b border-gray-200 pb-2">
                                    <span className="text-primary-600">EXP</span> 12+ Years
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold border-b border-gray-200 pb-2">
                                    <span className="text-primary-600">ROLE</span> Backend / Lead
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold">
                                    <span className="text-primary-600">MAIL</span> skymanla@naver.com
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
                        {/* Intro */}
                        <div className="mb-12 border-l-4 border-primary-500 pl-6">
                            <h2 className="text-3xl font-bold mb-4 font-display">
                                &quot;비즈니스 목표를 현실로 만드는<br/>
                                <span className="text-primary-500">Backend</span> 개발자&quot;
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                12년 차, 다양한 언어(Java, Python, PHP)와 환경을 넘나들며 회사의 이익을 최우선으로 하는 개발을 지향합니다.
                                개발자가 가져야 할 기술적 목표에만 매몰되지 않고, <span className="font-bold bg-primary-200 dark:bg-primary-900 px-1">비즈니스가 어디로 가야 하는지</span>를 먼저 고민합니다.
                            </p>
                        </div>

                        {/* Experience */}
                        <h3 className="text-2xl font-bold mb-6 border-b-2 border-black dark:border-white inline-block pb-1 font-display">
                            Experience
                        </h3>

                        <div className="space-y-10">
                            {/* Experience Item 1 */}
                            <div className="relative border-l-3 border-gray-200 dark:border-gray-700 pl-8 ml-2">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-black bg-primary-500"></div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        스파크플러스 (SparkPlus)
                                    </h4>
                                    <span className="font-mono text-sm text-gray-500">2023.10 - Present</span>
                                </div>
                                <p className="font-bold text-gray-600 dark:text-gray-400 mb-4">개발 파트장 / 개발 리소스 관리</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><b>프로젝트 이행율 100% 달성</b>: 4~5년차 팀장 경험을 바탕으로 리소스 최적화.</li>
                                    <li><b>오피스B 신규 런칭</b>: IoT 연동 및 제어 기능 개발 (조명, 에어컨 자동화).</li>
                                    <li><b>성과</b>: 신규 BM 오픈 3개월 내 <b>계약율 100% 달성</b> 기여.</li>
                                </ul>
                            </div>

                            {/* Experience Item 2 */}
                            <div className="relative border-l-3 border-gray-200 dark:border-gray-700 pl-8 ml-2">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-black bg-white"></div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        (주)디노마드
                                    </h4>
                                    <span className="font-mono text-sm text-gray-500">2023.08 - 2023.10</span>
                                </div>
                                <p className="font-bold text-gray-600 dark:text-gray-400 mb-4">수석연구원 / 개발 조직 재구성</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><b>성능 최적화</b>: DB Caching(Redis) 도입으로 페이지 로딩 속도 <b>6s → 0.03s (95% 개선)</b>.</li>
                                    <li><b>배포 안정화</b>: CI/CD 및 코드 리뷰 문화를 정착시켜 상용 배포 에러율 대폭 감소.</li>
                                </ul>
                            </div>

                            {/* Experience Item 3 */}
                            <div className="relative border-l-3 border-gray-200 dark:border-gray-700 pl-8 ml-2">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-black bg-white"></div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        인타임게임즈
                                    </h4>
                                    <span className="font-mono text-sm text-gray-500">2021.06 - 2022.02</span>
                                </div>
                                <p className="font-bold text-gray-600 dark:text-gray-400 mb-4">개발 팀장 / 미들웨어 개발</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><b>DB 부하 80% 감소</b>: 북메이커 배당 데이터 캐싱 미들웨어 구축.</li>
                                    <li><b>처리 속도 2배 향상</b>: RabbitMQ 도입으로 데이터 크롤링과 적재 프로세스 분리.</li>
                                </ul>
                            </div>

                             {/* Experience Item 4 */}
                             <div className="relative border-l-3 border-gray-200 dark:border-gray-700 pl-8 ml-2">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-black bg-white"></div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        마이뱅크
                                    </h4>
                                    <span className="font-mono text-sm text-gray-500">2019.09 - 2021.04</span>
                                </div>
                                <p className="font-bold text-gray-600 dark:text-gray-400 mb-4">개발 매니저 / 레거시 청산</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><b>Language Migration</b>: PHP 레거시 시스템을 Java(Spring Boot)로 100% 전환.</li>
                                    <li><b>업무 효율 89% 증대</b>: 수기 관리되던 보험/환전 업무를 어드민 시스템으로 디지털화.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold mb-6 border-b-2 border-black dark:border-white inline-block pb-1 font-display">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {['Java', 'Spring Boot', 'Python', 'FastAPI', 'PHP', 'Laravel', 'Kotlin', 'Vue.js', 'React Native', 'AWS', 'Docker', 'MySQL', 'Redis'].map((skill) => (
                                    <span key={skill} className="px-3 py-1 font-mono text-sm font-bold border-2 border-black bg-white shadow-neo-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:shadow-none hover:translate-y-1 hover:shadow-none transition-all cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default About