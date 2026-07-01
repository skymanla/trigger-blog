import Link from 'next/link'
import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PageSEO } from '@/components/common/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllPosts, getPostsByTag } from '@/lib/blog-api'
import { PostType } from '@/types/post'
import BlogPostCard from '@/components/blog/BlogPostCard'
import { format, parseISO } from 'date-fns'

type TagPageProps = {
    tag: string
    posts: PostType[]
    noindex: boolean
}

export default function TagPage({ tag, posts, noindex }: TagPageProps) {
    const title = `#${tag}`
    const description = `"${tag}" 태그가 붙은 포스트 ${posts.length}개`

    return (
        <>
            {noindex && (
                <Head>
                    <meta name="robots" content="noindex, follow" />
                </Head>
            )}
            <PageSEO title={`${title} — ${siteMetadata.title}`} description={description} />

            <div className="pb-12">
                {/* 브레드크럼 */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
                    <Link href="/tags" className="hover:text-primary-600 transition-colors">
                        태그
                    </Link>
                    <span>/</span>
                    <span className="text-slate-600 dark:text-slate-300">{tag}</span>
                </nav>

                <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                    #{tag}
                </h1>
                <p className="mb-12 text-lg text-slate-500 dark:text-slate-400">{description}</p>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogPostCard
                                key={post.slug}
                                title={post.title}
                                slug={post.slug}
                                description={post.description}
                                date={post.date ? format(parseISO(post.date), 'MMMM dd, yyyy') : undefined}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500">아직 이 태그의 포스트가 없습니다.</p>
                )}
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts()
    const tags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])))

    return {
        paths: tags.map((tag) => ({ params: { tag } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const tag = params?.tag as string
    const posts = getPostsByTag(tag)
    const noindex = posts.length < 2

    return {
        props: { tag, posts, noindex },
    }
}
