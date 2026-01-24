import siteMetadata from "@/interfaces/siteMetaData"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="mt-16 border-t-3 border-black bg-white py-12 dark:border-dark-100 dark:bg-dark-900">
            <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <div className="font-display text-2xl font-bold tracking-tighter">
                        TRIGGER<span className="text-primary-400">.KR</span>
                    </div>
                    <div className="text-sm text-dark-400 dark:text-dark-400">
                        © {new Date().getFullYear()} {siteMetadata.author}
                    </div>
                </div>
                <div className="flex gap-6 font-mono text-sm font-bold">
                    <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">HOME</Link>
                    <Link href="/blog" className="hover:text-primary-600 dark:hover:text-primary-400">BLOG</Link>
                    <Link href="https://github.com/skymanla" target="_blank" rel="noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">GITHUB</Link>
                </div>
            </div>
        </footer>
    )
}