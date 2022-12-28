import React, { useState } from "react";
import headerNavLinks from "../data/headerNaviLinks";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from "../data/siteMetaData";
import Image from "next/image";
import MobileNav from './MobileNav'

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    //   navbar goes here
    <header>
        <nav className="flex items-center justify-between py-10">
            <div>
                <Link href={"/"} aria-label={siteMetadata.headerTitle}>
                    <div className="flex items-center justify-between">
                        {/* logo */}
                        <div className="mr-3">
                            <Image src={"/logo.svg"} alt={siteMetadata.headerTitle} width={64} height={64} />
                        </div>
                        {typeof siteMetadata.headerTitle === 'string' ? (
                            <div className="hidden h-6 text-2xl font-semibold sm:block">
                                {siteMetadata.headerTitle}
                            </div>
                        ) : (
                            siteMetadata.headerTitle
                        )}
                    </div>
                </Link>
            </div>
            <div className="flex items-center text-base leading-5">
                <div className="hidden sm:block">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
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
  );
};

export default Navbar;