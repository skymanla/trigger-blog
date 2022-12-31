import type { NextPage } from 'next'
import Head from 'next/head'
import BlogPostCard from "../components/BlogPostCard";
import React from "react";
import Link from 'next/link'


const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Welcome Trigger.kr</title>
                <meta name="description" content="트리거 홈페이지에 오신 걸 환영합니다" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
                Featured Posts
            </h3>
            <div className="flex gap-6 flex-col md:flex-row">
                <BlogPostCard
                    title="트리거에 오신 것을 환영합니다"
                    slug="hello-world"
                    gradient="from-[#D8B4FE] to-[#818CF8]"
                />
                <BlogPostCard
                    title="pm2를 사용한 Node 무중단 배포 - frontend 초보의 쉬운 node 서버 배포기"
                    slug="pm2를-사용한-node-무중단배포"
                    gradient="from-[#D8B4FE] to-[#818CF8]"
                />
                {/*<BlogPostCard*/}
                {/*    title="Rust Is The Future of JavaScript Infrastructure"*/}
                {/*    slug="rust"*/}
                {/*    gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"*/}
                {/*/>*/}
                {/*<BlogPostCard*/}
                {/*    title="Past, Present, and Future of React State Management"*/}
                {/*    slug="react-state-management"*/}
                {/*    gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"*/}
                {/*/>*/}
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

export default Home
