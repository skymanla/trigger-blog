import { format, parseISO } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { getPostSlugs, getPostSource } from "../../lib/blog-api"
import { MetaProps } from "../../types/layout"
import { PostType } from "../../types/post"
import { PageSEO } from "../../components/common/SEO"
import siteMetadata from "../../data/siteMetadata"

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
    const { source, frontMatter } = await getPostSource(params?.slug as string)
    return {
        props: {
            source,
            frontMatter,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getPostSlugs()
        .map((path) => path.replace(/\.mdx?$/, ''))
        .map((slug) => ({ params: { slug } }))
    return {
        paths,
        fallback: false,
    }
}

export default PostPage
