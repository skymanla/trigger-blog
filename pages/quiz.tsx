// pages/index.tsx
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import QuizQuestion from '@/components/QuizQuestion'
import QuizResult from '@/components/QuizResult'
import { QuizItem } from '@/interfaces/quiz'
import quizData from '@/data/quiz-data.json' // 퀴즈 데이터 임포트
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/interfaces/siteMetaData"

const QuizMain: NextPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const quizeContext = quizData.quizContext
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(quizeContext.length).fill(null))
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const handleSelectAnswer = (selectedAnswer: string) => {
    const updatedAnswers = [...userAnswers]
    updatedAnswers[currentQuestionIndex] = selectedAnswer
    setUserAnswers(updatedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizeContext.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // 퀴즈 종료
      setQuizCompleted(true)
      calculateScore()
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    quizeContext.forEach((quizItem, index) => {
      if (quizItem.answer === userAnswers[index]) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
  }

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers(Array(quizeContext.length).fill(null))
    setQuizCompleted(false)
    setScore(0)
  }

  useEffect(() => {
    if (!quizCompleted && currentQuestionIndex < quizeContext.length) {
      // 현재 문제에 대한 답변이 있으면 자동으로 다음 문제로 넘어가도록 (선택 사항)
      if (userAnswers[currentQuestionIndex]) {
        setTimeout(handleNextQuestion, 500) // 0.5초 후 자동 진행 (선택 사항)
      }
    }
  }, [currentQuestionIndex, userAnswers, quizCompleted])


  return (
    <>
      <PageSEO title="매일 퀴즈!" description={siteMetadata.description} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">{ quizData.quizTitle }</h1>
        {!quizCompleted ? (
          <>
            {quizeContext.length > 0 && (
              <QuizQuestion
                quizItem={quizeContext[currentQuestionIndex]}
                onSelectAnswer={handleSelectAnswer}
              />
            )}
            <div className="flex justify-between">
              <p>문제 {currentQuestionIndex + 1} / {quizeContext.length}</p>
              {currentQuestionIndex < quizeContext.length - 1 && (
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={handleNextQuestion}
                  disabled={!userAnswers[currentQuestionIndex]} // 답변이 있어야 활성화 (선택 사항)
                >
                  다음 문제
                </button>
              )}
              {currentQuestionIndex === quizeContext.length - 1 && (
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  onClick={() => { setQuizCompleted(true); calculateScore() }}
                  disabled={!userAnswers[currentQuestionIndex]} // 답변이 있어야 활성화 (선택 사항)
                >
                  결과 보기
                </button>
              )}
            </div>
          </>
        ) : (
          <QuizResult score={score} totalQuestions={quizeContext.length} onResetQuiz={handleResetQuiz} />
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