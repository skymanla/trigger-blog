import React from "react"
import Footer from "./Footer"
import NavBar from "./NavBar"
import SectionContainer from "../common/SectionContainer"

type Props = {
  children: React.ReactNode
}

const Layout = (props: Props) => {
    return (
        <div className="flex min-h-screen flex-col justify-between dark:bg-slate-950">
            <NavBar />
            <SectionContainer>
                <main className="mb-auto pt-20 md:pt-0">{props.children}</main>
            </SectionContainer>
            <Footer />
        </div>
      )
}

export default Layout