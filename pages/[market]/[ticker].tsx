import * as React from 'react';
import { useRouter } from 'next/router'
import ScorePlot from '../../components/score-plot';
import { 
    Button, 
    ButtonGroup } from '@mui/material';
import getDate, { getYesterdaysDate, getlastMonthsDate, getlastyearsDate } from '../../lib/getDate';

export async function getServerSideProps(context:any) {
    const API_URL = 'https://esg.cafe/api/v2/'; //need to find better solution
    const API_KEY = '44b6dedca1668563f8c75d7b2c08453f'; //need to find better solution
    const todaysDate:string = getDate() + 'T00:00:00.000Z';
    const lastMonthsDate:string = getlastMonthsDate() + 'T00:00:00.000Z';
    const lastYearsDate:string = getlastyearsDate() + 'T00:00:00.000Z';
    const { ticker, market } = context.query;
    const url30Days = API_URL + 'time-series/esg-score/' + market + '?API_KEY=' + API_KEY + '&interval=1D&start=' + lastMonthsDate + '&finish=' + todaysDate + '&tickers='+ ticker;
    const url1Year = API_URL + 'time-series/esg-score/' + market + '?API_KEY=' + API_KEY + '&interval=1M&start=' + lastYearsDate + '&finish=' + todaysDate + '&tickers='+ ticker;
    const url5Years = API_URL + 'time-series/esg-score/' + market + '?API_KEY=' + API_KEY + '&interval=1M&start=2016-01-05T10:50:35.819Z&finish=' + todaysDate + '&tickers='+ ticker;
    const urlArray = [ url30Days, url1Year, url5Years ];
    const data = await Promise.all(urlArray.map(async (url:string) => {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }))

    return {
            props: { 
                data
            }
        }
}

export default function Plot({data}:{data:any}) {
    const router = useRouter();
    let { ticker, market } = router.query;
    let tickerStr: string;
    if (Array.isArray(ticker)) tickerStr = ticker[0];
    else if (typeof ticker === 'string') tickerStr = ticker;
    else tickerStr = '';
    const [plotType, setPlotType] = React.useState(0);
    const plotTypeTitle: Array<String> = ["30 days", "12 months", "all time"]


    return (<div>
            <h4>{ticker}</h4>
            <ScorePlot 
                scores={Object.keys(data[plotType]).map((key:string) => {
                    const tone = data[plotType][key][tickerStr]?.Tone
                    return {t: key, y: tone};
                })} 
                ticker={ticker} />
            <ButtonGroup>
                <Button 
                variant={plotType==0 ? "contained": "outlined"}
                onClick={()=>setPlotType(0)}>
                    daily
                </Button>
                <Button 
                variant={plotType==1 ? "contained": "outlined"} 
                onClick={()=>setPlotType(1)}>
                    monthly
                </Button>
                <Button 
                variant={plotType==2 ? "contained": "outlined"} 
                onClick={()=>setPlotType(2)}>
                    yearly
                </Button>
            </ButtonGroup>
        </div>);
}

