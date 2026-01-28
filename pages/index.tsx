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
            <div className="mt-20 flex flex-col items-center justify-center border-t-3 border-black py-12 dark:border-dark-100">
                <h3 className="mb-6 font-display text-2xl font-bold">더 많은 이야기가 궁금하신가요?</h3>
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-3 border-3 border-black bg-primary-400 px-10 py-4 font-mono text-base font-bold text-black shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-white"
                >
                    <span>EXPLORE ALL POSTS</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 transition-transform group-hover:translate-x-1"
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
