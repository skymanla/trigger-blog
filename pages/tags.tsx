import Link from 'next/link'
import React from 'react'
import { GetStaticProps } from 'next'
import { PageSEO } from '@/components/common/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllPosts, getAllTags } from '@/lib/blog-api'
import { CATEGORY_LABELS, Category } from '@/interfaces/post'

type TagsProps = {
    tagMap: Record<string, number>
    categoryCounts: Record<string, number>
}

export default function TagsPage({ tagMap, categoryCounts }: TagsProps) {
    const sortedTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1])

    return (
        <>
            <PageSEO
                title={`태그 — ${siteMetadata.title}`}
                description="블로그 포스트의 카테고리와 태그 목록입니다."
            />
            <div className="pb-12">
                <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                    Tags
                </h1>
                <p className="mb-12 text-lg text-slate-500 dark:text-slate-400">
                    카테고리와 태그로 원하는 글을 찾아보세요.
                </p>

                {/* 카테고리 섹션 */}
                <section className="mb-12">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Categories
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                            <Link
                                key={cat}
                                href={`/blog?category=${cat}`}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-primary-600 dark:hover:bg-slate-700 dark:hover:text-primary-400"
                            >
                                {CATEGORY_LABELS[cat]}
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                                    {categoryCounts[cat] ?? 0}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 태그 섹션 */}
                <section>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {sortedTags.map(([tag, count]) => (
                            <Link
                                key={tag}
                                href={`/tags/${tag}`}
                                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600 transition-all hover:bg-primary-100 hover:text-primary-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-primary-400"
                            >
                                {tag}
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                                    {count}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts(['slug', 'title', 'category', 'tags'])
    const tagMap = getAllTags(posts)

    const categoryCounts = posts.reduce((acc, post) => {
        if (post.category) {
            acc[post.category] = (acc[post.category] ?? 0) + 1
        }
        return acc
    }, {} as Record<string, number>)

    return {
        props: { tagMap, categoryCounts },
    }
}
