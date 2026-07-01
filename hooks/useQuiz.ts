import { useCallback, useEffect, useState } from 'react'
import { QuizItem } from '@/types/quiz'

export const useQuiz = (quizContext: QuizItem[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array<string>(quizContext.length).fill(''))
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setCurrentQuestionIndex(0)
    setUserAnswers(Array<string>(quizContext.length).fill(''))
    setQuizCompleted(false)
    setScore(0)
  }, [quizContext])

  const handleSelectAnswer = useCallback((selectedAnswer: string) => {
    setUserAnswers((answers) => {
      const updatedAnswers = [...answers]
      updatedAnswers[currentQuestionIndex] = selectedAnswer
      return updatedAnswers
    })
  }, [currentQuestionIndex])

  const calculateScore = useCallback(() => {
    const correctAnswers = quizContext.reduce((total, quizItem, index) => {
      return quizItem.answer === userAnswers[index] ? total + 1 : total
    }, 0)

    setScore(correctAnswers)
  }, [quizContext, userAnswers])

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizContext.length - 1) {
      setCurrentQuestionIndex((index) => Math.min(index + 1, quizContext.length - 1))
      return
    }

    setQuizCompleted(true)
    calculateScore()
  }, [calculateScore, currentQuestionIndex, quizContext.length])

  const handleResetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0)
    setUserAnswers(Array<string>(quizContext.length).fill(''))
    setQuizCompleted(false)
    setScore(0)
  }, [quizContext.length])

  useEffect(() => {
    if (!quizCompleted && currentQuestionIndex < quizContext.length) {
      if (userAnswers[currentQuestionIndex]) {
        const timer = setTimeout(handleNextQuestion, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [currentQuestionIndex, handleNextQuestion, quizCompleted, quizContext.length, userAnswers])

  return {
    currentQuestionIndex,
    userAnswers,
    quizCompleted,
    score,
    handleSelectAnswer,
    handleNextQuestion,
    handleResetQuiz,
    setQuizCompleted,
    calculateScore
  }
}
