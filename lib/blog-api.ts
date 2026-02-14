import { PostType } from "@/interfaces/post"
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { POSTS_PATH } from "./mdx-util"

export function getPostSlugs(): string[] {
    return fs.readdirSync(POSTS_PATH)
}

export function getPostBySlug(slug: string, fields: string[] = []): PostType {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = join(POSTS_PATH, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items: any = {}

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

    return items as PostType
}

export function getAllPosts(fields: string[] = []): PostType[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => ((post1.date || '') > (post2.date || '') ? -1 : 1))
    return posts
}

export function getLatestPosts(fields: string[] = [], limit = 3): PostType[] {
    const posts = getAllPosts(fields)
    return posts.slice(0, limit)
}