import * as React from 'react';
import ScoreList from '../components/score-list';
import getDate, { getYesterdaysDate, getlastMonthsDate, getlastyearsDate } from '../lib/getDate';

export async function getServerSideProps() { 
  // Using Server side Generation for enhanced SEO, while getting latest stock information.
  
  // Get Dates
  const todaysDate:string = getDate() +'T00:00:00.000Z';
  const yesterdaysDate:string = getYesterdaysDate() +'T00:00:00.000Z';
  const lastMonthsDate:string = getlastMonthsDate() +'T00:00:00.000Z';
  const lastYearsDate:string = getlastyearsDate() +'T00:00:00.000Z';

  // Generate Urls
  //const tickers = '&tickers=BMW,NESN'; //testing only
  const tickers = ''; //for prod
  const baseUrl:string = process.env.API_URL + 'time-series/esg-score/EU600?API_KEY=' + process.env.API_KEY + '&interval=';

  const yearlyUrl:string = baseUrl + '1M&start=' + lastYearsDate + '&finish='+ todaysDate + tickers;
  const monthlyUrl:string = baseUrl + '1D&start=' + lastMonthsDate + '&finish='+ todaysDate + tickers;
  const dailyUrl:string = baseUrl + '1D&start='+ yesterdaysDate + '&finish='+ todaysDate + tickers;

  const infoUrl:string = process.env.API_URL + 'general-info/EU600?API_KEY=' + process.env.API_KEY + tickers;
  const urls:string[] = [ yearlyUrl, monthlyUrl, dailyUrl, infoUrl ];
  // Get json here from Waves of Change (esg cafe) server. 
  const [ yearlyScores, monthlyScores, dailyScores, EU600Info  ] = await Promise.all(urls.map(async (url:string) => {
                                            const response = await fetch(url);
                                            const data = await response.json();
                                            return data;
                                          }));
  
  return {
      props: { Info: EU600Info, monthlyScores, dailyScores, yearlyScores },
  };
}

export default function Home({ Info, monthlyScores, yearlyScores, dailyScores}:{ Info:any[], dailyScores:any, monthlyScores: any, yearlyScores: any }) {
  const todaysDate = getDate();
  const yesterdaysDate = getYesterdaysDate();

  //save all daily/monthly/yearly single scores
  const organisedScoreData:any = Info.map(company => {
    const ticker=company.ticker;
    const companyScores: any = {...company};
    //save day scores
    companyScores.dailyScores = [[todaysDate+'T00:00:00', dailyScores[todaysDate+'T00:00:00'][ticker]?.Tone],
                                [yesterdaysDate+'T00:00:00', dailyScores[yesterdaysDate+'T00:00:00'][ticker]?.Tone]];
    //save month scores
    const monthDateKeys =  Object.keys(monthlyScores);
    const monthScore = monthDateKeys.reduce((total, dateIdx) =>{ return total + monthlyScores[dateIdx][company.ticker]?.Tone }, 0) / monthDateKeys.length;
    companyScores.monthlyScores = [[todaysDate+'T00:00:00', monthScore]];
    //calc/save yearly scores
    const yearDateKeys =  Object.keys(yearlyScores);
    const yearScore = yearDateKeys.reduce((total, dateIdx) =>{ return total + yearlyScores[dateIdx][company.ticker]?.Tone }, 0) / yearDateKeys.length;
    companyScores.yearlyScores = [[todaysDate+'T00:00:00', yearScore]];
    return companyScores;
  })
  console.log(organisedScoreData);
  //return (<div>testing in progress</div>)
  return (
           <ScoreList 
              Info= { organisedScoreData }  /> 
  )
}
