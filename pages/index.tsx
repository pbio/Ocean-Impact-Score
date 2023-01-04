import * as React from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { SP500, SP500Sectors } from '../lib/SP500_scores.js'
import { Stoxx600, STOXX600Sectors } from '../lib/STOXX600_scores.js'
import ScoreList from '../components/score-list'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  return {
    props: {
      SP500, SP500Sectors, Stoxx600, STOXX600Sectors
    },
  };
}



export default function Home({ scoresList }: AppProps) {
  const [marketType, setMarketType] = React.useState(true)
  //const todayDate = getDate();
  const todayDate = "January 4, 2022";
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
        <Typography variant= "body1" color= "white">
          An Ocean Impact Score for publicly listed companies
        </Typography>
        <Typography variant= "body1" >{todayDate}</Typography>
        <Box sx={{ width: 300, height: 50}} >
        <Button onClick={()=>setMarketType(true)}>SP500</Button>
        <Button onClick={()=>setMarketType(false)}>EU600</Button>
        </Box>

        <ScoreList scoresList={ marketType ? SP500 : Stoxx600 } addInfo={ marketType ? SP500Sectors :  STOXX600Sectors } />
        
        </Container>
        </main>
      <footer>
      </footer>
      </span>
  )
}
