import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/config/siteMetadata'
import GoogleAdsense from "./GoogleAdsense"

type CommonSEOProps = {
    title: string
    description?: string
    ogType: string
    ogImage: string
}

const CommonSEO = ({ title, description, ogType, ogImage }: CommonSEOProps) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={description} />
                <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
                <meta property="og:type" content={ogType} />
                <meta property="og:site_name" content={siteMetadata.title} />
                <meta property="og:description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={ogImage} key={ogImage} />
                <meta name="site.github" content={siteMetadata.github} />
                <link rel="canonical" href={`${siteMetadata.siteUrl}${router.asPath}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {process.env.NODE_ENV === 'production' ? <GoogleAdsense /> : ''}
        </>
    )
}

type PageSEOProps = {
    title: string
    description?: string
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType="website"
            ogImage={ogImageUrl}
        />
    )
}
