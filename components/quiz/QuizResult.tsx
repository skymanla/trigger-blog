// components/QuizResult.tsx
import React from 'react'

interface QuizResultProps {
  score: number
  totalQuestions: number
  onResetQuiz: () => void
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onResetQuiz }) => {
  const percentage = (score / totalQuestions) * 100
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">퀴즈 결과</h2>
      <p className="text-lg mb-2">총 {totalQuestions} 문제 중 {score} 문제 정답!</p>
      <p className="text-lg mb-4">정답률: {percentage.toFixed(0)}%</p>
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={onResetQuiz}
      >
        다시 시작하기
      </button>
    </div>
  )
}

export default QuizResult