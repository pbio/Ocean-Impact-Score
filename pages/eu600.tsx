import * as React from 'react';
import ScoreList from '../components/score-list';

export async function getServerSideProps() { 
  // Using Server side Generation for enhanced SEO, while getting latest stock information.
  // Get json here from Waves of Change (esg cafe) server. 
  // API key : '44b6dedca1668563f8c75d7b2c08453f';
    const urls = ['https://esg.cafe/api/v2/time-series/esg-score/EU600?API_KEY=44b6dedca1668563f8c75d7b2c08453f&interval=1M&start=2022-12-05T10:50:35.819Z&finish=2023-02-05T10:50:35.819Z&tickers=BMW,NESN',
                  'https://esg.cafe/api/v2/general-info/EU600?API_KEY=44b6dedca1668563f8c75d7b2c08453f&tickers=BMW,NESN'];
    const [ EU600Scores, EU600Info  ] = await Promise.all(urls.map(async (url:string) => {
                                            const response = await fetch(url);
                                            const data = await response.json();
                                            return data;
                                          }));
  return {
      props: { Info: EU600Info, Scores: EU600Scores },
  };
}

export default function Home({ Info, Scores }:{ Info:any, Scores:any }) {
  return (
           <ScoreList 
              Info= { Info } 
              Scores= { Scores } /> 
  )
}
