import type { NextPage, GetStaticProps } from "next"
import React from "react"
import Link from 'next/link'
import { PageSEO } from "@/components/common/SEO"
import { getLatestPosts } from "@/lib/blog-api"
import { PostType } from "@/types/post"
import SpaceBlogLobby from "@/components/space/SpaceBlogLobby"

type IndexProps = {
    posts: PostType[]
}

const Home: NextPage<IndexProps> = ({ posts }: IndexProps) => {
    return (
        <>
            <PageSEO title="Trigger" description="일상을 TRIGGER" />

            <SpaceBlogLobby posts={posts} />

            {/* Bottom Call to Action */}
            <div className="mt-24 flex flex-col items-center justify-center border-t border-slate-200 px-8 py-16 dark:border-slate-800">
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
    let posts = getLatestPosts()
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
