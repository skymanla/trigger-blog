import type { GetServerSideProps, NextPage, GetStaticProps } from 'next'
import React from "react"
import Link from 'next/link'
import BlogPostCard from "@/components/BlogPostCard"
import { PageSEO } from "@/components/SEO"
import { getLatestPosts } from "@/lib/blog-api"
import { PostType } from "@/interfaces/post"

type IndexProps = {
    posts: PostType[]
}

const Home: NextPage<IndexProps> = ({ posts }: IndexProps) => {
    return (
        <>
            <PageSEO title="Trigger" description="일상을 TRIGGER" />
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
                Featured Posts
            </h3>
            <div className="flex gap-6 flex-col md:flex-row">
                {posts.map((post) => (
                    <BlogPostCard
                        key={post.slug}
                        title={post.description}
                        slug={post.slug}
                        views={post.views}
                        gradient="from-[#D8B4FE] to-[#818CF8]"
                    />
                ))}
            </div>
            <Link
                href="/blog"
                className="flex items-center mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
            >
                <>
                    {'Read all posts'}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 ml-1"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                        />
                    </svg>
                </>
            </Link>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let posts = getLatestPosts(['date', 'description', 'slug', 'title'])
    posts = posts.map((post) => {
        return {
            ...post,
            views: Math.floor(Math.random() * 50).toString(),
        }
    })
    return {
        props: { posts },
    }
}

export default Home
