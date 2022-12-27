import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import KeenSlider from '../components/keenSlider'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome Trigger.kr</title>
        <meta name="description" content="트리거 홈페이지에 오신 걸 환영합니다" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="w-full flex justify-between">
          <h1 className="">Welcome Trigger</h1>
          <div>1depth div</div>
      </div>

        <KeenSlider />
    </div>
  )
}

export default Home
