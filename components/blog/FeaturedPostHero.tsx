import Link from 'next/link'
import Image from 'next/image'
import { PostType } from '@/interfaces/post'

type Props = {
  post: PostType
}

const FeaturedPostHero = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group relative block h-full w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-modern transition-all hover:shadow-modern-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
      ) : (
        <div className="h-full w-full bg-slate-800" />
      )}

      <div className="absolute bottom-0 left-0 z-20 w-full p-8 md:p-12">
        <span className="mb-4 inline-flex items-center rounded-full bg-primary-500/10 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-primary-400 backdrop-blur-md border border-primary-500/20 uppercase">
          Featured Post
        </span>
        <h2 className="mb-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl tracking-tight">
          {post.title}
        </h2>
        <p className="line-clamp-2 mb-8 max-w-2xl font-sans text-sm text-slate-300 md:text-lg opacity-80">
          {post.description}
        </p>
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-primary-400 group-hover:text-primary-300 transition-colors">
          READ ARTICLE <span className="text-lg">&rarr;</span>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedPostHero
