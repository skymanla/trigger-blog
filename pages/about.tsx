import { PageSEO } from "../components/SEO"
import siteMetadata from "../data/siteMetaData"

const About = () => {
    return (
        <>
            <PageSEO title="About" description={siteMetadata.description} />
            <div>About page</div>
        </>
    )
}

export default About