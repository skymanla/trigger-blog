import type { GetServerSideProps, NextPage, GetStaticProps } from 'next'
import React from "react"
import Link from 'next/link'
import BlogPostCard from "@/components/BlogPostCard"
import { PageSEO } from "@/components/SEO"
import { getLatestPosts } from "@/lib/blog-api"
import { PostType } from "@/interfaces/post"
import FeaturedPostHero from "@/components/FeaturedPostHero"
import FeaturedPostSidebar from "@/components/FeaturedPostSidebar"

type IndexProps = {
    posts: PostType[]
}

const Home: NextPage<IndexProps> = ({ posts }: IndexProps) => {
    return (
        <>
            <PageSEO title="Trigger" description="일상을 TRIGGER" />
            <div className="grid grid-cols-1 gap-6 md:h-[450px] md:grid-cols-3">
                {/* Hero Post (Left 2 columns) */}
                <div className="md:col-span-2 h-full">
                    {posts[0] && <FeaturedPostHero post={posts[0]} />}
                </div>

                {/* Sidebar Posts (Right 1 column) */}
                <div className="md:col-span-1 h-full">
                     <FeaturedPostSidebar posts={posts.slice(1, 3)} />
                </div>
            </div>
            <div className="mt-12 flex justify-center">
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2 border-3 border-black bg-white px-8 py-3 font-mono text-sm font-bold text-black shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-dark-100 dark:bg-dark-800 dark:text-white dark:shadow-neo-dark"
                >
                    <span>VIEW ALL POSTS</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                        />
                    </svg>
                </Link>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
