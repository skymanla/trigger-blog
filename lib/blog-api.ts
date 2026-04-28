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

import { PostType } from '../types/post'

export const POSTS_PATH = join(process.cwd(), 'posts')

export function getPostSlugs(): string[] {
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))
}

function readPostFrontMatter(slug: string): PostType {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = join(POSTS_PATH, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return { ...(data as Omit<PostType, 'slug'>), slug: realSlug }
}

export function getAllPosts(): PostType[] {
    return getPostSlugs()
        .map(readPostFrontMatter)
        .sort((a, b) => ((a.date ?? '') > (b.date ?? '') ? -1 : 1))
}

export function getLatestPosts(limit = 3): PostType[] {
    return getAllPosts().slice(0, limit)
}

export function getAllTags(posts: PostType[] = getAllPosts()): Record<string, number> {
    return posts.reduce((acc, post) => {
        post.tags?.forEach((tag) => {
            acc[tag] = (acc[tag] ?? 0) + 1
        })
        return acc
    }, {} as Record<string, number>)
}

export function getPostsByCategory(category: string): PostType[] {
    return getAllPosts().filter((p) => p.category === category)
}

export function getPostsByTag(tag: string): PostType[] {
    return getAllPosts().filter((p) => p.tags?.includes(tag))
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

    return { source, frontMatter: { ...(data as Omit<PostType, 'slug'>), slug: realSlug } }
}
