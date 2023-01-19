import * as React from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SP500, SP500Sectors } from './lib/SP500_scores.js'
import { STOXX600, STOXX600Sectors } from './lib/STOXX600_scores.js'
import ScoreList from './components/score-list'

export async function getStaticProps() { //Using Static Site Generation for enhanced SEO
  // To Do: Serve json files here from Waves of Change server
  // server side is not set up yet!!
  // const getData = async function(){
  //   try { 
  //     const newSP500Dataset = await fetch('my-json-server.typicode.com/pbio/WavesOfChangeData/blob/main/SP500.json')
  //       .then(response=>response.json())
  //       .then(json => json);
  //     return newSP500Dataset;
  //   } 
  //   catch(error) {
  //     console.error(error)
  //   }
  // }
  // const SP500 = getData();
  return {
    props: {
      SP500, SP500Sectors, STOXX600, STOXX600Sectors
    },
  };
}

export default function Home(props: AppProps) {
  const { pageProps } = props;
  const [marketType, setMarketType] = React.useState(true)
  //const latestDataUploadDate = getDate(); //Need to connect with Ocean Index DB for live data each day
  const latestDataUploadDate = "November 7, 2022";
  return (
      <>
      <Head>
        <title>Ocean Score App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="sm">
          <Typography variant="h2" color="white">
            Ocean Impact Score
          </Typography>
          <Typography variant= "body1" color= "white" sx={{fontWeight: 'bold'}}>
            This site is a simple interface for viewing the Ocean Impact Score by Waves of Change. 
          </Typography>
          <Typography variant= "body1" color= "white" sx={{fontStyle: 'italic'}}> 
            Each public company in this list is assigned a score based on a deep learning model trained on academic papers and reliable articles about the company's environmental impact. In future versions of this tool the score updates will happen in real time. 
          </Typography>
          <Typography variant= "body1" >{'Latest Data Dump: '+ latestDataUploadDate}</Typography>
          <Box sx={{ width: 300, height: 50}} >
            <Button onClick={()=>setMarketType(true)}>SP500</Button>
            <Button onClick={()=>setMarketType(false)}>EU600</Button>
          </Box>
          <ScoreList 
            scoresList={ marketType ? SP500 : STOXX600 } 
            addInfo={ marketType ? SP500Sectors :  STOXX600Sectors } 
            {...pageProps} />
        </Container>
      </main>
      </>
  )
}
