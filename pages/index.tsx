import type { GetServerSideProps, NextPage, GetStaticProps } from 'next'
import React from "react"
import Link from 'next/link'
import BlogPostCard from "@/components/blog/BlogPostCard"
import { PageSEO } from "@/components/common/SEO"
import { getLatestPosts } from "@/lib/blog-api"
import { PostType } from "@/interfaces/post"
import FeaturedPostHero from "@/components/blog/FeaturedPostHero"
import FeaturedPostSidebar from "@/components/blog/FeaturedPostSidebar"

type IndexProps = {
    posts: PostType[]
}

const Home: NextPage<IndexProps> = ({ posts }: IndexProps) => {
    return (
        <>
            <PageSEO title="Trigger" description="일상을 TRIGGER" />

            {/* Featured Posts Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:h-[500px]">
                {/* Main Hero Post */}
                <div className="md:col-span-8 h-[400px] md:h-full">
                    {posts[0] && <FeaturedPostHero post={posts[0]} />}
                </div>

                {/* Secondary Posts */}
                <div className="md:col-span-4 h-full">
                     <FeaturedPostSidebar posts={posts.slice(1, 3)} />
                </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-24 flex flex-col items-center justify-center rounded-3xl bg-slate-50 py-16 px-8 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h3 className="mb-2 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-center">더 많은 이야기가 궁금하신가요?</h3>
                <p className="mb-10 text-slate-500 dark:text-slate-400 text-center max-w-md">
                    기술 블로그의 다양한 포스트를 통해 일상의 변화를 만드는 트리거를 찾아보세요.
                </p>
                <Link
                    href="/blog"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-10 py-4 font-bold text-white transition-all hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500 shadow-modern-lg"
                >
                    <span className="relative z-10 uppercase tracking-wider text-sm">Explore All Posts</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    let posts = getLatestPosts(['date', 'description', 'slug', 'title', 'image'])
    posts = posts.map((post) => {
        return {
            ...post,
        }
    })
    return {
        props: { posts },
    }
}

export default Home
