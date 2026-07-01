import React, { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/common/SEO'
import BlogPostCard from '@/components/blog/BlogPostCard'
import { getAllPosts } from '@/lib/blog-api'
import { GetStaticProps } from 'next'
import { PostType, CATEGORIES, CATEGORY_LABELS } from '@/types/post'
import { format, parseISO } from 'date-fns'
import Fuse from 'fuse.js'

type BlogProps = {
    posts: PostType[]
}

const ALL = 'all'

const Blog = ({ posts }: BlogProps) => {
    const router = useRouter()
    const initialCategory = (router.query.category as string) ?? ALL
    const [activeCategory, setActiveCategory] = useState<string>(initialCategory)
    const [query, setQuery] = useState('')

    // URL 쿼리스트링으로 카테고리 동기화
    useEffect(() => {
        const cat = (router.query.category as string) ?? ALL
        setActiveCategory(cat)
    }, [router.query.category])

    const fuse = useMemo(
        () =>
            new Fuse(posts, {
                keys: ['title', 'description', 'tags'],
                threshold: 0.35,
            }),
        [posts]
    )

    const filtered = useMemo(() => {
        const base = query ? fuse.search(query).map((r) => r.item) : posts
        return activeCategory === ALL
            ? base
            : base.filter((p) => p.category === activeCategory)
    }, [query, activeCategory, posts, fuse])

    const handleCategory = (cat: string) => {
        setActiveCategory(cat)
        const url = cat === ALL ? '/blog' : `/blog?category=${cat}`
        router.push(url, undefined, { shallow: true })
    }

    const categoryCounts = useMemo(
        () =>
            posts.reduce((acc, p) => {
                if (p.category) acc[p.category] = (acc[p.category] ?? 0) + 1
                return acc
            }, {} as Record<string, number>),
        [posts]
    )

    return (
        <>
            <PageSEO
                title={`Trigger 개발 블로그 | ${siteMetadata.headerTitle}`}
                description={siteMetadata.description}
            />
            <div className="pb-12">
                <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                    Articles
                </h1>
                <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
                    기술과 일상에 관한 다양한 생각들을 기록합니다.
                </p>

                {/* 검색창 */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="포스트 검색..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-primary-600"
                    />
                    <svg
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* 카테고리 탭 */}
                <div className="mb-10 flex flex-wrap gap-2">
                    <button
                        onClick={() => handleCategory(ALL)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                            activeCategory === ALL
                                ? 'bg-primary-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                        }`}
                    >
                        전체
                        <span className={`text-xs font-bold ${activeCategory === ALL ? 'text-primary-200' : 'text-slate-400'}`}>
                            {posts.length}
                        </span>
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategory(cat)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                                activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                            }`}
                        >
                            {CATEGORY_LABELS[cat]}
                            <span className={`text-xs font-bold ${activeCategory === cat ? 'text-primary-200' : 'text-slate-400'}`}>
                                {categoryCounts[cat] ?? 0}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 결과 */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((post) => (
                            <BlogPostCard
                                key={post.slug}
                                title={post.title}
                                slug={post.slug}
                                description={post.description}
                                date={
                                    post.date
                                        ? format(parseISO(post.date), 'MMMM dd, yyyy')
                                        : undefined
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-400 dark:text-slate-500">
                        검색 결과가 없습니다.
                    </p>
                )}
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts()

    return {
        props: { posts },
    }
}

export default Blog
