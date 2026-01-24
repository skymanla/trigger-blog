import React, { useState } from "react"
import headerNavLinks from "@/interfaces/headerNaviLinks"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"
import siteMetadata from "@/interfaces/siteMetaData"
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-3 border-black bg-white/80 backdrop-blur dark:bg-dark-900/80 dark:border-dark-100 transition-colors">
        <nav className="container flex items-center justify-between py-4">
            <div>
                <Link href={"/"} aria-label={siteMetadata.headerTitle} className="group flex items-center gap-2 no-underline hover:no-underline">
                    <div className="flex h-10 w-10 items-center justify-center rounded-none border-2 border-black bg-primary-400 font-display text-xl font-bold text-black shadow-neo transition-all group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none dark:border-white">
                        Tr
                    </div>
                    {typeof siteMetadata.headerTitle === 'string' ? (
                        <div className="hidden font-display text-2xl font-bold tracking-tighter sm:block">
                            {siteMetadata.headerTitle}
                        </div>
                    ) : (
                        siteMetadata.headerTitle
                    )}
                </Link>
            </div>
            <div className="flex items-center gap-4 text-base leading-5">
                <div className="hidden sm:flex gap-6">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="font-medium text-dark-900 hover:text-primary-600 dark:text-dark-100 dark:hover:text-primary-400 no-underline hover:no-underline"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <ThemeSwitch />
                <MobileNav />
            </div>
        </nav>
    </header>
  )
}

export default Navbar