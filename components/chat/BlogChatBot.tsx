import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const SYSTEM_PROMPT = `당신은 'Trigger' 블로그의 AI 테크 어시스턴트입니다. 개발자 및 기술 독자들의 질문에 친절하고 똑 부러진 어조로 답하고, 블로그의 주요 포스트를 검색하거나 기술 정보를 위트 있게 요약해 안내하세요. 답변 시 개발 용어와 마크다운 코드 블록 포맷을 깔끔하게 활용하여 가독성이 뛰어난 테크니컬 라이팅 스타일로 답변하십시오.`;

const SUGGESTIONS = [
  "이 블로그의 기술 스택은 무엇인가요?",
  "Next.js에서 SEO 최적화 방법",
  "React 18 동시성(Concurrency) 요약",
  "Llama Guard 3 보안 가드레일 개념"
];

const MOCK_ANSWERS: { [key: string]: string } = {
  "이 블로그의 기술 스택은 무엇인가요?":
    "Trigger 블로그는 현대적이고 쾌속 빌드가 가능한 정적 사이트 생성을 목표로 구성된 모던 테크 스택입니다.\n\n```json\n{\n  \"Framework\": \"Next.js (Pages Router)\",\n  \"Language\": \"TypeScript (v4.9)\",\n  \"Styling\": \"Tailwind CSS (v3.2) & next-themes\",\n  \"Content\": \"next-mdx-remote & rehype plugins\",\n  \"Build\": \"Static Export (next export)\"\n}\n```\n\n**💡 핵심 특징:**\n* MDX 기반의 마크다운 포스트 작성 환경\n* `next-sitemap`을 통한 동적 사이트맵 및 RSS 자동 갱신\n* `rehype-prism-plus`와 `rehype-code-titles`를 통한 미려한 소스코드 하이라이팅 지원",
  "Next.js에서 SEO 최적화 방법":
    "Next.js에서 검색엔진 최적화(SEO)를 달성하기 위해서는 프레임워크가 제공하는 메타데이터 최적화 기능과 시맨틱 HTML 활용이 필수적입니다.\n\n**1. Page-level Meta Tags**\n* `next/head` 컴포넌트를 활용해 각 페이지마다 유니크한 `<title>`, `<meta name=\"description\">`을 매핑합니다.\n\n**2. JSON-LD 구조화 데이터 삽입**\n* 검색 엔진에 블로그 포스트의 구조를 더 잘 전달할 수 있도록 스키마 마크업을 활용합니다.\n\n**3. 이미지 최적화 (`next/image`)**\n* CLS(Cumulative Layout Shift) 방지 및 WebP 포맷 인코딩으로 모바일 LCP 점수를 최적화합니다.\n\n**4. dynamic sitemap & robots.txt**\n* `next-sitemap`과 같은 패키지를 이용해 빌드 시점에 최신 포스트 색인을 자동으로 빌드하여 검색 로봇에 전송합니다.",
  "React 18 동시성(Concurrency) 요약":
    "React 18의 핵심은 **'동시성(Concurrency)'** 렌더링 엔진의 도입이며, 핵심 훅은 `useTransition`과 `useDeferredValue`입니다.\n\n```typescript\nconst [isPending, startTransition] = useTransition();\n```\n\n* **작업 중단 가능 (Interruptible Rendering)**: 긴 렌더링 작업 도중 유저가 타이핑을 시도하면 기존 렌더링을 일시 중단하고 타이핑 이벤트에 우선순위를 부여합니다.\n* **자동 일괄 처리 (Automatic Batching)**: 여러 개의 상태 업데이트(`useState`)가 비동기 흐름 속에서도 단 한 번의 리렌더링으로 자동 결합됩니다.\n* **Suspense 지원**: 데이터 로딩과 컴포넌트 렌더링의 시차를 컴포넌트 차원에서 선언적으로 조율할 수 있습니다.",
  "Llama Guard 3 보안 가드레일 개념":
    "Llama Guard 3는 LLM 입출력 단계에서 유해한 요청과 오작동을 차단하는 오픈소스 **보안 가드레일(Guardrail)** 분류기 모델입니다.\n\n**주요 메커니즘:**\n1. **입력 검사(Prompt Shielding)**: 탈옥(Jailbreak), 개인정보 탈취, 위법 지침 등 13가지 유해 카테고리에 해당하는 요청이 유입되는 경우 LLM 본 모델로 전달하기 전에 차단합니다.\n2. **출력 검사(Response Filtering)**: Ollama Gemma 4 본 모델이 혹여 부적절하거나 유해한 답변을 생성하는 경우, 가드레일 미들웨어가 이를 최종 필터링하여 안전한 우회 문구(`safe` 또는 `unsafe` 분석 기반)로 대체하여 브라우저에 반환합니다.\n3. **경량화 추론**: CPU/ARM 환경인 Oracle aarch64 서버의 부하를 덜기 위해 `llama-guard3:1b` 등 경량 양자화 모델을 사용하여 밀리초 단위로 안전성을 진단합니다."
};

const DEFAULT_MOCK = "Hello! Trigger AI Assistant에 접속하셨습니다. 기술 블로그 읽기, 코드 분석, IT 토픽 요약을 지원하기 위해 설계된 전용 챗봇입니다. 현재 서버가 오프라인이므로 시뮬레이션 데이터베이스 기반으로 정적 요약을 출력합니다. 서버 가동 시 가드레일이 검증한 Gemma 4 모델의 실시간 응답을 수신할 수 있습니다.";

const COMMON_API_BASE_URL = (
  process.env.NEXT_PUBLIC_COMMON_API_BASE_URL || "http://localhost:8080"
).replace(/\/$/, "");
const CHAT_COMPLETIONS_URL = `${COMMON_API_BASE_URL}/api/sites/TRIGGER/chat/completions`;

export default function BlogChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 로컬스토리지 대화 기록 관리
  useEffect(() => {
    const saved = localStorage.getItem("trigger_chat_history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse Trigger chat history", e);
      }
    }
  }, []);

  const saveMessages = (newMsgs: Message[]) => {
    setMessages(newMsgs);
    localStorage.setItem("trigger_chat_history", JSON.stringify(newMsgs));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMsg];
    saveMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // 공통 API가 Pipelines/Ollama 호출과 가드레일 토큰을 서버 사이드에서 관리한다.
      const response = await fetch(CHAT_COMPLETIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            }))
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Server offline");
      }

      const data = await response.json();
      const botResponseText = data.choices[0].message.content;

      const botMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toISOString()
      };
      saveMessages([...updatedMessages, botMsg]);
    } catch (e) {
      console.warn("Trigger ChatBot offline. Operating in simulation mode.");
      
      setTimeout(() => {
        const trimmedQuery = textToSend.trim();
        let matchedResponse = DEFAULT_MOCK;
        
        for (const key of Object.keys(MOCK_ANSWERS)) {
          if (trimmedQuery.includes(key) || key.includes(trimmedQuery)) {
            matchedResponse = MOCK_ANSWERS[key];
            break;
          }
        }

        const botMsg: Message = {
          id: Math.random().toString(36).substring(7),
          sender: "bot",
          text: `[Tech Simulator Mode]\n\n${matchedResponse}`,
          timestamp: new Date().toISOString()
        };
        saveMessages([...updatedMessages, botMsg]);
        setIsLoading(false);
      }, 1000);
      return;
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    if (window.confirm("개발 대화 세션을 초기화하고 메인 셸로 복귀하겠습니까?")) {
      setMessages([]);
      localStorage.removeItem("trigger_chat_history");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono text-slate-300">
      {/* 챗봇 모달창 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[420px] h-[550px] bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right">
          {/* 헤더 */}
          <div className="bg-slate-950 px-5 py-4 flex items-center justify-between border-b border-slate-800 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded border border-cyan-500/50 flex items-center justify-center font-bold text-xs text-cyan-400 bg-cyan-950/30 animate-pulse">
                &gt;_
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-100">Trigger Terminal</h3>
                <p className="text-[9px] text-cyan-400 font-mono">SYSTEM ACTIVE // SECURE PORT</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <button 
                onClick={handleClear} 
                className="text-slate-500 hover:text-cyan-400 transition-colors"
                title="Reset session"
              >
                [RESET]
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-500 hover:text-red-400 transition-colors font-bold text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          {/* 대화 영역 */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950/40">
            {messages.length === 0 ? (
              <div className="space-y-5">
                <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800 text-xs leading-relaxed text-slate-400 shadow-inner">
                  <span className="text-cyan-400">root@trigger-blog:~$</span> ./init_chatbot --guardrail
                  <br /><br />
                  보안 가드레일이 동작 중인 AI 테크 어시스턴트 인스턴스가 생성되었습니다. 블로그 아키텍처 및 코딩 요령을 하단 셸을 통해 문의하십시오.
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider pl-1">{"// AVAILABLE COMMANDS:"}</p>
                  <div className="flex flex-col space-y-2">
                    {SUGGESTIONS.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(s)}
                        className="text-left w-full bg-slate-900/60 hover:bg-slate-800/80 text-xs text-slate-300 border border-slate-800 hover:border-cyan-500/30 py-2 px-3 rounded transition-all duration-200 shadow-sm"
                      >
                        {`$ query --type "${s}"`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-lg px-4 py-3 text-xs leading-relaxed shadow-md whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-cyan-950/50 text-cyan-100 border border-cyan-500/40 rounded-tr-none"
                        : "bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))
            )}

            {/* 로딩 바 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg rounded-tl-none px-4 py-2.5 shadow-sm flex items-center space-x-1.5 font-bold">
                  <span>SYSTEM COMPUTING</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 폼 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center space-x-2"
          >
            <span className="text-cyan-400 font-bold text-xs pl-1">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter tech query..."
              className="flex-1 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none focus:border-cyan-500/50 text-slate-100 bg-slate-950"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-cyan-950/40 hover:text-cyan-400 text-slate-400 border border-slate-800 hover:border-cyan-500/30 p-2 rounded transition-colors shadow-sm disabled:opacity-50"
              disabled={isLoading || !input.trim()}
            >
              EXEC
            </button>
          </form>
        </div>
      )}

      {/* 플로팅 토글 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-950 hover:bg-slate-900 text-cyan-400 border border-slate-800 hover:border-cyan-400 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
        aria-label="상담 챗봇 열기"
      >
        {isOpen ? (
          <span className="text-xs font-bold font-mono">SYS_X</span>
        ) : (
          <span className="text-lg font-mono">&gt;_</span>
        )}
      </button>
    </div>
  );
}
