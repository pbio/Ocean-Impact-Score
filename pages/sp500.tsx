import * as React from "react";
import ScoreList from "../components/score-list";
import getDate, {
  getYesterdaysDate,
  getlastMonthsDate,
} from "../lib/getDate";

export async function getServerSideProps() {
  // Using Server side Generation for enhanced SEO, while getting latest stock information.
  const API_URL = "https://esg.cafe/api/v2/"; //need to find better solution
  const API_KEY = "44b6dedca1668563f8c75d7b2c08453f"; //need to find better solution
  // Get Dates
  const todaysDate: string = getDate() + "T00:00:00.000Z";
  const yesterdaysDate: string = getYesterdaysDate() + "T00:00:00.000Z";
  const lastMonthsDate: string = getlastMonthsDate() + "T00:00:00.000Z";
  // Generate Urls
  //const tickers = '&tickers=TSLA,GOOG,NVDA'; //testing only
  const tickers = ""; //for prod
  const baseUrl: string =
    API_URL + "time-series/esg-score/US500?API_KEY=" + API_KEY + "&interval=";

  const yearlyUrl: string =
    baseUrl + "1M&start=" + lastMonthsDate + "&finish=" + todaysDate + tickers;
  //const monthlyUrl:string = baseUrl + '1D&start=' + lastMonthsDate + '&finish='+ todaysDate + tickers;
  const dailyUrl: string =
    baseUrl + "1D&start=" + yesterdaysDate + "&finish=" + todaysDate + tickers;

  const infoUrl: string =
    API_URL + "general-info/US500?API_KEY=" + API_KEY + tickers;
  const urls: string[] = [yearlyUrl, dailyUrl, infoUrl];
  // Get json here from Waves of Change (esg cafe) server.
  const [yearlyScores, dailyScores, info] = await Promise.all(
    urls.map(async (url: string) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    })
  );


  return {
    props: { Info: info, yearlyScores, dailyScores },
  };
}

export default function Home({
  Info, yearlyScores, dailyScores
}: {
  Info: any[]; yearlyScores: any; dailyScores: any;
}) {
  const todaysDate: string = getDate() + "T00:00:00.000Z";
  const yesterdaysDate: string = getYesterdaysDate() + "T00:00:00.000Z";
  const lastMonthsDate: string = getlastMonthsDate() + "T00:00:00.000Z";
    //parse data into large array of each company
    const organisedScoreData: any = Info.map((company:any) => {
      const ticker = company.ticker;
      const companyScores: any = company;
      //save day scores
      companyScores.dailyScores = [
        [
          todaysDate,
          dailyScores[todaysDate.slice(0, -5)][ticker]?.Tone,
        ],
        [
          yesterdaysDate,
          dailyScores[yesterdaysDate.slice(0, -5)][ticker]?.Tone,
        ],
      ];
      //save month scores
      const monthDateKeys = Object.keys(yearlyScores);
      const thisMonthKey = monthDateKeys.find((date) => {
        return date.includes(todaysDate.slice(0, 7));
      });
      const lastMonthKey = monthDateKeys.find((date) => {
        return date.includes(lastMonthsDate.slice(0, 7));
      });
      if (thisMonthKey && lastMonthKey)
        companyScores.monthlyScores = [
          [thisMonthKey, yearlyScores[thisMonthKey][ticker]?.Tone],
          [lastMonthKey, yearlyScores[lastMonthKey][ticker]?.Tone],
        ];
      //calc/save yearly scores
      // const yearDateKeys = Object.keys(yearlyScores);
      // const yearScore =
      //   yearDateKeys.reduce((total, dateIdx) => {
      //     return total + yearlyScores[dateIdx][company.ticker]?.Tone;
      //   }, 0) / yearDateKeys.length;
      // companyScores.yearlyScores = [[todaysDate, yearScore]];
      return companyScores;
    });
  return <ScoreList Info={organisedScoreData} />;
}
