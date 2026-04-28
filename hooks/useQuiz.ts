import { useState, useEffect } from 'react'

export const useQuiz = (quizeContext: any[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
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
      if (userAnswers[currentQuestionIndex]) {
        const timer = setTimeout(handleNextQuestion, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [currentQuestionIndex, userAnswers, quizCompleted])

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
