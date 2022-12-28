import * as React from 'react';
import Head from 'next/head'
import Button from '@mui/material/Button';

import { scoresList, addInfo } from '../lib/SP500_scores.js'
import { Stoxx600, STOXX600Sectors } from '../lib/STOXX600_scores.js'
import ScoreList from '../components/score-list.js'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  scoresList.sort((a, b) => b.daily["2022-11-07"]-a.daily["2022-11-07"])
  return {
    props: {
      scoresList, addInfo, Stoxx600, STOXX600Sectors
    },
  };
}

export default function Home({ scoresList }) {
  const [marketType, setMarketType] = React.useState(true)
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
        <Button onClick={()=>setMarketType(true)}>SP500</Button><Button onClick={()=>setMarketType(false)}>EU600</Button>
        <ScoreList scoresList={ marketType ? scoresList : Stoxx600 } addInfo={ marketType ? addInfo :  STOXX600Sectors } />
      </main>
      <footer>
      </footer>
    </div>
  )
}
