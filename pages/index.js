import * as React from 'react';
import Head from 'next/head'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
      <span>
      <Head>
        <title>Ocean Score App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Container maxWidth="sm">
      <Typography variant="h4" color="white">
          Ocean Impact Score
        </Typography>
        <Typography variant= "p" color= "white">
          An Ocean Impact Score for publicly listed companies
        </Typography>
        <Typography variant= "p" >{todayDate}</Typography>
        <Box sx={{ width: 300, height: 50}} >
        <Button onClick={()=>setMarketType(true)}>SP500</Button>
        <Button onClick={()=>setMarketType(false)}>EU600</Button>
        </Box>

        <ScoreList scoresList={ marketType ? scoresList : Stoxx600 } addInfo={ marketType ? addInfo :  STOXX600Sectors } />
        
        </Container>
        </main>
      <footer>
      </footer>
      </span>
  )
}
