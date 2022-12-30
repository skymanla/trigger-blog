import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import KeenSlider from '../components/keenSlider'
import {CssBaseline} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

// const Home: NextPage = () => {
//     return (
//     <div className={styles.container}>
//         <Head>
//             <title>Welcome Trigger.kr</title>
//             <meta name="description" content="트리거 홈페이지에 오신 걸 환영합니다" />
//             <link rel="icon" href="/favicon.ico" />
//         </Head>
//
//         <KeenSlider />
//         {/*<SwiperSlider />*/}
//     </div>
//     )
// }

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Welcome Trigger.kr</title>
                <meta name="description" content="트리거 홈페이지에 오신 걸 환영합니다" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CssBaseline>
                <Stack direction="row" spacing={2}>
                    <Avatar>H</Avatar>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                </Stack>
            </CssBaseline>
        </>
    )
}

export default Home
