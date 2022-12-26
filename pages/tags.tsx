import { PageSEO } from "../components/SEO"
import siteMetadata from "../data/siteMetaData"

const Tags = () => {
    return (
        <>
            <PageSEO title="Tags 메인" description={siteMetadata.description} />
            <div>Tags page</div>
        </>
    )
}

export default Tags