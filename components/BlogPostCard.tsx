import Link from 'next/link'
import cn from 'classnames'

export default function BlogPostCard({ title, slug, gradient, views }: any) {
    // const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
    // const views = data?.total
    return (
        <Link
            href={`/blog/${slug}`}
            className={cn(
                'group relative flex w-full transform flex-col justify-between overflow-hidden border-3 border-black bg-white p-6 shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-dark-100 dark:bg-dark-800 dark:shadow-neo-dark md:w-1/3',
            )}
        >
            <div className="flex h-full flex-col justify-between">
                <div>
                    <h4 className="mb-4 font-display text-xl font-bold leading-tight text-dark-900 group-hover:text-primary-600 dark:text-dark-50 dark:group-hover:text-primary-400">
                        {title}
                    </h4>
                </div>
                {views && (
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-dark-400 group-hover:text-primary-700 dark:group-hover:text-primary-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        <span>
                            {new Number(views).toLocaleString()}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    )
}
