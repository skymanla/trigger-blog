import React from "react"
import Footer from "./Footer"
import NavBar from "./NavBar"
import SectionContainer from "./SectionContainer"

type Props = {
  children: React.ReactNode
}

const Layout = (props: Props) => {
    return (
        <SectionContainer>
            <div className="flex min-h-screen flex-col justify-between">
                <NavBar />
                <main className="mb-auto pt-20 md:pt-0">{props.children}</main>
                <Footer />
            </div>
        </SectionContainer>
      )
}

export default Layout