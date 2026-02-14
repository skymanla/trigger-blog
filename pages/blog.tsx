import Link from 'next/link'
import React from 'react'
import siteMetadata from "@/data/siteMetadata"
import { PageSEO } from "@/components/common/SEO"
import BlogPostCard from "@/components/blog/BlogPostCard"
import { getAllPosts } from "@/lib/blog-api"
import { GetStaticProps } from "next"
import { PostType } from "@/interfaces/post"
import { format, parseISO } from 'date-fns'

type BlogProps = {
    posts: PostType[]
}

const Blog = ({ posts }: BlogProps) => {
    return (
        <>
            <PageSEO title="블로그 메인" description={siteMetadata.description} />
            <div className="pb-12">
                <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                    Articles
                </h1>
                <p className="mb-12 text-lg text-slate-500 dark:text-slate-400">
                    기술과 일상에 관한 다양한 생각들을 기록합니다.
                </p>
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
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts(['date', 'description', 'slug', 'title'])

    return {
        props: { posts },
    }
}

export default Blog