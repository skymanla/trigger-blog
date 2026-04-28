export const CATEGORIES = ['productivity', 'mindset', 'dev', 'life'] as const
export type Category = typeof CATEGORIES[number]

export const CATEGORY_LABELS: Record<Category, string> = {
    productivity: '생산성',
    mindset: '마인드셋',
    dev: '개발',
    life: '일상',
}

export type PostType = {
    date?: string
    description?: string
    image?: string
    slug: string
    title: string
    category?: Category
    tags?: string[]
}
