import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import siteMetadata from "../data/siteMetaData";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
          {/* google adsense */}
          <script async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1586372003132738"
                  crossOrigin="anonymous"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>    
  )
}

export default MyApp
