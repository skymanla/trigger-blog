import { PageSEO } from "../components/SEO"
import siteMetadata from "../data/siteMetaData"

const Projects = () => {
    return (
        <>
            <PageSEO title="Projects 메인" description={siteMetadata.description} />
            <div>Projects page</div>
        </>
    )
}

export default Projects