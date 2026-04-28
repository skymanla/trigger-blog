import Link from 'next/link'

type BlogPostCardProps = {
    title: string
    slug: string
    description?: string
    date?: string
}

export default function BlogPostCard({ title, slug, description, date }: BlogPostCardProps) {
    return (
        <Link
            href={`/blog/${slug}`}
            className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-modern transition-all hover:-translate-y-1 hover:shadow-modern-lg dark:border-slate-800 dark:bg-slate-900"
        >
            <div className="flex h-full flex-col">
                <div className="mb-3">
                    <h4 className="font-display text-lg font-bold leading-tight text-slate-900 group-hover:text-primary-600 dark:text-slate-100 dark:group-hover:text-primary-400 transition-colors">
                        {title}
                    </h4>
                </div>
                {description && (
                    <p className="line-clamp-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                )}
                <div className="mt-auto flex items-center justify-between font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    <div className="flex items-center gap-3">
                        {date && <span>{date}</span>}
                    </div>
                    <span className="text-primary-500 opacity-0 transition-opacity group-hover:opacity-100">READ &rarr;</span>
                </div>
            </div>
        </Link>
    )
}
