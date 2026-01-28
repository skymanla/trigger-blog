import { useState } from "react"
import headerNavLinks from "@/interfaces/headerNaviLinks"
import Link from "next/link"

const MobileNav = () => {
    const [navShow, setNavShow] = useState(false)

    const onToggleNav = () => {
        setNavShow((status) => {
            if (status) {
                document.body.style.overflow = 'auto'
            } else {
                // Prevent scrolling
                document.body.style.overflow = 'hidden'
            }
            return !status
        })
    }

    return (
        <div className="sm:hidden">
            <button
                type="button"
                className="ml-1 mr-1 h-8 w-8 rounded py-1"
                aria-label="Toggle Menu"
                onClick={onToggleNav}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-gray-900 dark:text-gray-100"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={`fixed top-0 left-0 z-[100] h-screen w-screen transform bg-white transition-all duration-300 ease-in-out dark:bg-dark-900 ${
                    navShow ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-dark-800">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-primary-400 font-display text-xl font-bold text-black dark:border-white">
                        Tr
                    </div>
                    <button
                        type="button"
                        className="h-8 w-8 rounded"
                        aria-label="Toggle Menu"
                        onClick={onToggleNav}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="text-gray-900 dark:text-gray-100"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="mt-4 h-[calc(100vh-80px)] overflow-y-auto flex flex-col items-center px-4 pb-20">
                    {headerNavLinks.map((link) => (
                        <div key={link.title} className="w-full border-b border-gray-50 dark:border-dark-800 last:border-b-0">
                            <Link
                                href={link.href}
                                className="block py-6 text-center text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                                onClick={onToggleNav}
                            >
                                {link.title}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default MobileNav