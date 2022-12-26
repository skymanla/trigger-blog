import { PageSEO } from "../components/SEO"
import siteMetadata from "../data/siteMetaData"

const Blog = () => {
    return (
        <>
            <PageSEO title="블로그 메인" description={siteMetadata.description} />
            <div>blog page</div>
        </>
    )
}

export default Blog