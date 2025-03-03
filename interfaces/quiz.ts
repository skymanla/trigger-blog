// interfaces/quiz.ts
export interface QuizItem {
    question: string
    options: string[]
    answer: string
    explanation?: string // 해설은 선택 사항
  }