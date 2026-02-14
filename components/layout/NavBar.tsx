import React, { useState } from "react"
import headerNavLinks from "@/interfaces/headerNaviLinks"
import Link from "next/link"
import ThemeSwitch from "../common/ThemeSwitch"
import siteMetadata from "@/data/siteMetadata"
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70 transition-colors">
        <nav className="container mx-auto flex items-center justify-between py-3 px-6 sm:px-0">
            <div>
                <Link href={"/"} aria-label={siteMetadata.headerTitle} className="group flex items-center gap-2 no-underline hover:no-underline">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 font-display text-lg font-bold text-white shadow-modern transition-all group-hover:scale-105 dark:bg-primary-500">
                        Tr
                    </div>
                    {typeof siteMetadata.headerTitle === 'string' ? (
                        <div className="hidden font-display text-xl font-bold tracking-tight sm:block text-slate-900 dark:text-white">
                            {siteMetadata.headerTitle}
                        </div>
                    ) : (
                        siteMetadata.headerTitle
                    )}
                </Link>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium">
                <div className="hidden sm:flex gap-8">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 no-underline hover:no-underline transition-colors"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
                    <ThemeSwitch />
                    <MobileNav />
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar