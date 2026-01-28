import Link from 'next/link'
import Image from 'next/image'
import { PostType } from '@/interfaces/post'

type Props = {
  post: PostType
}

const FeaturedPostHero = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group relative block h-full w-full overflow-hidden border-3 border-black bg-white shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-dark-100 dark:bg-dark-800 dark:shadow-neo-dark">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      ) : (
        <div className="h-full w-full bg-primary-400" />
      )}

      <div className="absolute bottom-0 left-0 z-20 w-full p-6 md:p-10">
        <span className="mb-4 inline-block border-2 border-black bg-primary-400 px-3 py-1 font-mono text-xs font-bold text-black shadow-neo-sm">
          FEATURED POST
        </span>
        <h2 className="mb-3 font-display text-3xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
          {post.title}
        </h2>
        <p className="line-clamp-2 mb-6 max-w-2xl font-sans text-sm text-gray-200 md:text-lg">
          {post.description}
        </p>
        <div className="inline-flex items-center gap-2 border-b-2 border-primary-400 pb-1 font-mono text-sm font-bold text-primary-400 transition-all group-hover:border-white group-hover:text-white">
          READ ARTICLE &rarr;
        </div>
      </div>
    </Link>
  )
}

export default FeaturedPostHero
