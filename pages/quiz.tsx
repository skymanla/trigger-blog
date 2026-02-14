// pages/index.tsx
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import QuizQuestion from '@/components/quiz/QuizQuestion'
import QuizResult from '@/components/quiz/QuizResult'
import { QuizItem } from '@/interfaces/quiz'
import quizData from '@/data/quiz-data.json'
import { PageSEO } from "@/components/common/SEO"
import siteMetadata from "@/data/siteMetadata"
import { useQuiz } from '@/hooks/useQuiz'

const QuizMain: NextPage = () => {
  const [shuffledQuiz, setShuffledQuiz] = useState<QuizItem[]>([])

  useEffect(() => {
    const shuffleArray = (array: any[]) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }
    setShuffledQuiz(shuffleArray(quizData.quizContext))
  }, [])

  const {
    currentQuestionIndex,
    userAnswers,
    quizCompleted,
    score,
    handleSelectAnswer,
    handleNextQuestion,
    handleResetQuiz,
    setQuizCompleted,
    calculateScore
  } = useQuiz(shuffledQuiz)

  if (shuffledQuiz.length === 0) {
    return <div className="container mx-auto p-4 text-center">로딩 중...</div>
  }

  return (
    <>
      <PageSEO title="매일 퀴즈!" description={siteMetadata.description} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">{ quizData.quizTitle }</h1>
        {!quizCompleted ? (
          <>
            {shuffledQuiz.length > 0 && (
              <QuizQuestion
                quizItem={shuffledQuiz[currentQuestionIndex]}
                onSelectAnswer={handleSelectAnswer}
              />
            )}
            <div className="flex justify-between">
              <p>문제 {currentQuestionIndex + 1} / {shuffledQuiz.length}</p>
              {currentQuestionIndex < shuffledQuiz.length - 1 && (
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={handleNextQuestion}
                  disabled={!userAnswers[currentQuestionIndex]}
                >
                  다음 문제
                </button>
              )}
              {currentQuestionIndex === shuffledQuiz.length - 1 && (
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  onClick={() => { setQuizCompleted(true); calculateScore() }}
                  disabled={!userAnswers[currentQuestionIndex]}
                >
                  결과 보기
                </button>
              )}
            </div>
          </>
        ) : (
          <QuizResult score={score} totalQuestions={shuffledQuiz.length} onResetQuiz={handleResetQuiz} />
        )}
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  // quiz-data.json 파일을 import 하여 빌드 시점에 데이터를 로드 (pages/index.tsx 상단에서 import)
  return {
    props: {
      quizData, // quizData를 props로 전달
    },
  }
}


export default QuizMain