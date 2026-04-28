import siteMetadata from "@/data/siteMetadata"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 transition-colors">
            <div className="container mx-auto flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex flex-col items-center gap-3 md:items-start">
                    <div className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        TRIGGER<span className="text-primary-600 dark:text-primary-500">.KR</span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium text-sm">
                    <Link href="/" className="text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">HOME</Link>
                    <Link href="/blog" className="text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">BLOG</Link>
                    <Link href="https://github.com/skymanla" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">GITHUB</Link>
                </div>
            </div>
        </footer>
    )
}