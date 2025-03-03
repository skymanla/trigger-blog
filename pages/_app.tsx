import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import siteMetadata from "@/interfaces/siteMetaData"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
          {/* google adsense */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
