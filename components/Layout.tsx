import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import SectionContainer from "./SectionContainer";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <SectionContainer>
            <div className="flex h-screen flex-col justify-between">
                <header className="flex items-center justify-between py-10">
                    <NavBar />                    
                    {/* <div className="flex items-center text-base leading-5">
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
                    </div> */}
                </header>
                <main className="mb-auto">{props.children}</main>
                <Footer />
            </div>
        </SectionContainer>
      );
}

export default Layout