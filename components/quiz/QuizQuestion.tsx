// components/QuizQuestion.tsx
import React from 'react'
import { QuizItem } from '@/interfaces/quiz'

interface QuizQuestionProps {
  quizItem: QuizItem
  onSelectAnswer: (selectedAnswer: string) => void
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ quizItem, onSelectAnswer }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 dark:text-white">{quizItem.question}</h2>
      <ul className="space-y-2">
        {quizItem.options.map((option, index) => (
          <li key={option}>
            <button
              className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded text-left dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => onSelectAnswer(option)}
            >
              {index+1}. {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizQuestion