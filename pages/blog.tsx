import Link from 'next/link'
import React from 'react'
import siteMetadata from "../data/siteMetaData"
import { PageSEO } from "../components/SEO"
import { getAllPosts } from "../lib/blog-api"
import { GetStaticProps } from "next"
import { PostType } from "../data/post"
import { format, parseISO } from 'date-fns'

type IndexProps = {
    posts: PostType[]
}

const Blog = ({ posts }: IndexProps) => {
    return (
        <>
            <PageSEO title="블로그 메인" description={siteMetadata.description} />
            {posts.map((post) => (
                <article key={post.slug} className="mt-12">
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        {format(parseISO(post.date as string), 'MMMM dd, yyyy')}
                    </p>
                    <h1 className="mb-2 text-xl">
                        <Link
                            as={`/blog/${post.slug}`}
                            href={`/blog/[slug]`}
                            className="text-gray-900 dark:text-white dark:hover:text-blue-400"
                        >
                            {post.title}
                        </Link>
                    </h1>
                    <p className="mb-3">{post.description}</p>
                    <p>
                        <Link as={`/blog/${post.slug}`} href={`/blog/[slug]`}>
                            <span>Read More</span>
                        </Link>
                    </p>
                </article>
            ))}
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