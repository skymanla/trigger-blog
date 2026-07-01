import { format, parseISO } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

import { getPostSlugs, getPostSource } from "../../lib/blog-api"
import { PostType } from "../../types/post"
import { PostSEO } from "../../components/common/SEO"
import TableOfContents from "../../components/blog/TableOfContents"
import BackToTop from "../../components/common/BackToTop"
import { TocItem } from "../../lib/toc"

const components = {
    Head,
    Image,
    Link,
    table: (props: ComponentPropsWithoutRef<'table'>) => (
        <div className="not-prose my-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="md-table w-full border-collapse text-[13.5px] leading-relaxed" {...props} />
        </div>
    ),
}

type PostPageProps = {
    source: MDXRemoteSerializeResult
    frontMatter: PostType
    toc: TocItem[]
}

const PostPage = ({ source, frontMatter, toc }: PostPageProps): JSX.Element => {
    const hasToc = Array.isArray(toc) && toc.length > 2

    return (
        <>
            <PostSEO
                title={frontMatter.title}
                description={frontMatter.description}
                slug={frontMatter.slug}
                date={frontMatter.date}
                image={frontMatter.image}
                tags={frontMatter.tags}
            />
            <div className="xl:flex xl:gap-10">
                <article className="min-w-0 xl:flex-1">
                    <h1 className="mb-3 text-gray-900 dark:text-white">
                        {frontMatter.title}
                    </h1>
                    <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
                        {format(parseISO(frontMatter.date as string), 'MMMM dd, yyyy')}
                    </p>

                    {hasToc && (
                        <details className="mb-10 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800/50 xl:hidden">
                            <summary className="cursor-pointer py-1 font-bold text-gray-800 dark:text-gray-100">
                                목차
                            </summary>
                            <ul className="mt-1 space-y-1">
                                {toc.map((item) => (
                                    <li key={item.url} style={{ paddingLeft: `${(item.depth - 2) * 0.75}rem` }}>
                                        <a
                                            href={item.url}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            {item.value}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    )}

                    <div className="prose max-w-none dark:prose-dark">
                        <MDXRemote {...source} components={components} />
                    </div>
                </article>

                {hasToc && (
                    <aside className="hidden xl:block xl:w-60 xl:flex-none">
                        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto pb-10">
                            <TableOfContents toc={toc} />
                        </div>
                    </aside>
                )}
            </div>
            <BackToTop />
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { source, frontMatter, toc } = await getPostSource(params?.slug as string)
    return {
        props: {
            source,
            frontMatter,
            toc,
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
