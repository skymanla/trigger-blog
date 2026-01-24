import Link from 'next/link'
import { PostType } from '@/interfaces/post'

type Props = {
  posts: PostType[]
}

const FeaturedPostSidebar = ({ posts }: Props) => {
  return (
    <div className="flex h-full flex-col gap-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group relative flex flex-1 flex-col justify-center border-3 border-black bg-white p-6 shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-dark-100 dark:bg-dark-800 dark:shadow-neo-dark"
        >
          <div className="relative z-10">
            <h3 className="mb-2 font-display text-xl font-bold leading-tight text-dark-900 group-hover:text-primary-600 dark:text-dark-50 dark:group-hover:text-primary-400">
              {post.title}
            </h3>
            <p className="line-clamp-2 font-sans text-sm text-dark-400 dark:text-dark-300">
              {post.description}
            </p>
            <div className="mt-4 font-mono text-xs font-bold text-dark-300 group-hover:text-primary-700 dark:group-hover:text-primary-400">
              {post.date}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default FeaturedPostSidebar
