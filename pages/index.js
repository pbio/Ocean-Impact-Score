import Head from 'next/head'

import { scoresList, addInfo } from '../lib/scores.js'
import ScoreList from '../components/score-list.js'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  scoresList.sort((a, b) => b.daily["2022-11-07"]-a.daily["2022-11-07"])
  return {
    props: {
      scoresList, addInfo
    },
  };
}

export default function Home({ scoresList }) {
  //const todayDate = getDate();
  const todayDate = "December 8th 2022";
  return (
    <div className={styles.container}>
      <Head>
        <title>Ocean Score App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h4 className={styles.title}>
          Ocean Impact Score
        </h4>
        <p className={styles.description}>
          An Ocean Impact Score for publicly listed companies
        </p>
        <p>{todayDate}</p>
        <ScoreList scoresList={ scoresList } addInfo={ addInfo } />
      </main>
      <footer>
      </footer>
    </div>
  )
}
