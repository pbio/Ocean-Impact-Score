import * as React from 'react';
import { useRouter } from 'next/router'


export async function getServerSideProps(context:any) {
    const { ticker } = context.query;
    const url = process.env.API_URL + 'time-series/esg-score/EU600?API_KEY=' + process.env.API_KEY + '&interval=1M&start=2022-12-05T10:50:35.819Z&finish=2023-02-05T10:50:35.819Z&tickers='+ticker;
    const response = await fetch(url);
    const responseJson = await response.json();
    
    return {
            props: { 
                data: responseJson
            }
        }
}

export default function Plot({data}:{data:any}) {
    const router = useRouter();
    const { ticker } = router.query;
    return (<div>
            <h4>{ticker}</h4>
            {Object.keys(data).map((key:string) => {
                    const tone = data[key][ticker]?.Tone
                    return <div> { `${key.slice(0, -9)} : ${tone}` } </div>;
                })}
        </div>);
}

