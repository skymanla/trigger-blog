import Link from 'next/link'
import { PostType } from '@/interfaces/post'

type Props = {
  posts: PostType[]
}

const FeaturedPostSidebar = ({ posts }: Props) => {
  return (
    <div className="flex h-full flex-col gap-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group relative flex flex-1 flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-modern transition-all hover:-translate-y-1 hover:shadow-modern-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="relative z-10">
            <h3 className="mb-2 font-display text-lg font-bold leading-tight text-slate-900 group-hover:text-primary-600 dark:text-slate-100 dark:group-hover:text-primary-400 transition-colors">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
              {post.description}
            </p>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              <span>{post.date}</span>
              <span className="text-primary-500 opacity-0 transition-opacity group-hover:opacity-100">READ &rarr;</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default FeaturedPostSidebar
