import Link from 'next/link'
import cn from 'classnames'

export default function BlogPostCard({ title, slug, views, description, date }: any) {
    return (
        <Link
            href={`/blog/${slug}`}
            className={cn(
                'group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-modern transition-all hover:-translate-y-1 hover:shadow-modern-lg dark:border-slate-800 dark:bg-slate-900',
            )}
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
                        {views && (
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{new Number(views).toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                    <span className="text-primary-500 opacity-0 transition-opacity group-hover:opacity-100">READ &rarr;</span>
                </div>
            </div>
        </Link>
    )
}
