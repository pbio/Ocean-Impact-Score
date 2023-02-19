import * as React from 'react';
import ScoreList from '../components/score-list';


export async function getServerSideProps() { 
  // Using Server side Generation for enhanced SEO
  // Get json files here from Waves of Change (esg cafe) server
  const API_URL = 'https://esg.cafe/api/v2/'; //need to find better solution
  const API_KEY = '44b6dedca1668563f8c75d7b2c08453f'; //need to find better solution
  const urls = [API_URL + 'time-series/esg-score/SP500?API_KEY=' + API_KEY + '&interval=1M&start=2022-12-05T10:50:35.819Z&finish=2023-02-05T10:50:35.819Z&tickers=AMZN,GOOG',
                API_URL + 'general-info/SP500?API_KEY=' + API_KEY + '&tickers=AMZN,GOOG'];
    const [ SP500Scores, SP500Info  ] = await Promise.all(urls.map(async (url:string) => {
                                            const response = await fetch(url);
                                            const data = await response.json();
                                            return data;
                                          }));
    
  // Pass through proxy
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //     Origin: 'localhost:3000',
  //     'X-Requested-With': 'www.example.com',
  //     'X-RapidAPI-Key': 'ca8f97584cmsh69c58e9a18bd1dcp12f73cjsn64e6335cc338',
  //     'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
  //   },
  //   body: '{"url":"https://esg.cafe/api/v2/general-info/EU600?API_KEY=44b6dedca1668563f8c75d7b2c08453f"}'
  // };
  //
  // const response = await fetch('https://http-cors-proxy.p.rapidapi.com/', options)
  //
  // Parse the JSON
  // const data = await response.json();

  return {
      props: { Info: SP500Info, Scores: SP500Scores },
  };
}

export default function Home({ Info, Scores }:{ Info:any, Scores:any }) {
  
  React.useEffect(() => { //have an issue with the url
    console.log( Info );
    console.log( Scores );
  }, [Info]);

  return (
           <ScoreList 
              Info = { Info } 
              Scores = { Scores } /> 
  )
}
