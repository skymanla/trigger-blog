import fs from 'fs'
import matter from 'gray-matter'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { join } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { PostType } from '../interfaces/post'

export const POSTS_PATH = join(process.cwd(), 'posts')

type PostItems = {
    [key: string]: string
}

export function getPostSlugs(): string[] {
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))
}

export function getPostBySlug(slug: string, fields: string[] = []): PostItems {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = join(POSTS_PATH, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items: PostItems = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }
        if (data[field]) {
            items[field] = data[field]
        }
    })

    return items
}

export function getAllPosts(fields: string[] = []): PostItems[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}

export function getLatestPosts(fields: string[] = [], limit = 3): PostItems[] {
    const posts = getAllPosts(fields)
    return posts.slice(0, limit)
}

export async function getPostSource(slug: string): Promise<{
    source: MDXRemoteSerializeResult
    frontMatter: PostType
}> {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = join(POSTS_PATH, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { content, data } = matter(fileContents)

    const source = await serialize(content, {
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

    return { source, frontMatter: data as PostType }
}
