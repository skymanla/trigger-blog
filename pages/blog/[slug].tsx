import { format, parseISO } from 'date-fns'
import fs from 'fs'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { postFilePaths, POSTS_PATH } from "../../lib/mdx-util"
import { MetaProps } from "../../data/layout"
import { PostType } from "../../data/post"
import { PageSEO } from "../../components/SEO"
import siteMetadata from "../../data/siteMetaData"

const components = {
    Head,
    Image,
    Link,
}

type PostPageProps = {
    source: MDXRemoteSerializeResult
    frontMatter: PostType
}

const PostPage = ({ source, frontMatter }: PostPageProps): JSX.Element => {
    const customMeta: MetaProps = {
        title: `${frontMatter.title} - ${siteMetadata.description}`,
        description: frontMatter.description,
        image: `${frontMatter.image}`,
        date: frontMatter.date,
        type: 'article',
    }

    return (
        <>
            <PageSEO title={customMeta.title} description={customMeta.description} />
            <article>
                <h1 className="mb-3 text-gray-900 dark:text-white">
                    {frontMatter.title}
                </h1>
                <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
                    {format(parseISO(frontMatter.date as string), 'MMMM dd, yyyy')}
                </p>
                <div className="prose dark:prose-dark">
                    <MDXRemote {...source} components={components} />
                </div>
            </article>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // @ts-ignore
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(postFilePath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            development: false,
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeSlug,
                rehypeCodeTitles,
                rehypePrism,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: {
                            className: ['anchor'],
                        },
                    },
                ],
            ],
            format: 'mdx',
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))
    return {
        paths,
        fallback: false,
    }
}

export default PostPage