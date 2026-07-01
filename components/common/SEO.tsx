import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import GoogleAdsense from "./GoogleAdsense"

const getAbsoluteUrl = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
    }

    return `${siteMetadata.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

type CommonSEOProps = {
    title: string
    description?: string
    ogType: string
    ogImage: string
    canonicalUrl?: string
    noindex?: boolean
}

const CommonSEO = ({ title, description, ogType, ogImage, canonicalUrl, noindex = false }: CommonSEOProps) => {
    const router = useRouter()
    const pathWithoutHash = router.asPath.split('#')[0]
    const pathWithoutQuery = pathWithoutHash.split('?')[0]
    const url = canonicalUrl ?? `${siteMetadata.siteUrl}${pathWithoutQuery}`

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content={noindex ? 'noindex, follow' : 'follow, index'} />
                <meta name="description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:type" content={ogType} />
                <meta property="og:site_name" content={siteMetadata.title} />
                <meta property="og:description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={ogImage} key={ogImage} />
                <meta name="site.github" content={siteMetadata.github} />
                <link rel="canonical" href={url} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {process.env.NODE_ENV === 'production' ? <GoogleAdsense /> : ''}
        </>
    )
}

type PageSEOProps = {
    title: string
    description?: string
    noindex?: boolean
}

export const PageSEO = ({ title, description, noindex = false }: PageSEOProps) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType="website"
            ogImage={ogImageUrl}
            noindex={noindex}
        />
    )
}

type PostSEOProps = {
    title: string
    description?: string
    slug: string
    date?: string
    image?: string
    tags?: string[]
}

export const PostSEO = ({ title, description, slug, date, image, tags }: PostSEOProps) => {
    const pageUrl = `${siteMetadata.siteUrl}/blog/${slug}`
    const imageUrl = getAbsoluteUrl(image ?? siteMetadata.socialBanner)
    const fullTitle = `${title} | ${siteMetadata.headerTitle}`

    const articleStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: [imageUrl],
        datePublished: date,
        dateModified: date,
        author: {
            '@type': 'Person',
            name: siteMetadata.author,
            url: siteMetadata.github,
        },
        publisher: {
            '@type': 'Organization',
            name: siteMetadata.title,
            logo: {
                '@type': 'ImageObject',
                url: getAbsoluteUrl(siteMetadata.siteLogo),
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': pageUrl,
        },
        keywords: tags,
        inLanguage: siteMetadata.language,
    }

    const breadcrumbStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: '홈',
                item: siteMetadata.siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: '블로그',
                item: `${siteMetadata.siteUrl}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: title,
                item: pageUrl,
            },
        ],
    }

    return (
        <>
            <CommonSEO
                title={fullTitle}
                description={description}
                ogType="article"
                ogImage={imageUrl}
                canonicalUrl={pageUrl}
            />
            <Head>
                {date && <meta property="article:published_time" content={date} />}
                {tags?.map((tag) => (
                    <meta key={tag} property="article:tag" content={tag} />
                ))}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
                />
            </Head>
        </>
    )
}
