import { Line } from 'react-chartjs-2';
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    
interface PlotData {
  labels: string[],
  datasets: any[],
}   


export default function ScorePlot({scores, ticker}: any) {
   
    const data:PlotData = {
      labels: scores.map( (score:any) => score.t.slice(0, -9) ),
      datasets: [{
        label: ticker +' score by Ocean Index',
        data: scores.map( (score:any) => score.y ),
        fill: false,
        lineTension: 0.3,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      }],
    };

    return <div>
      <Line
        data={data}
        width={400}
        height={400}
      />
    </div>
};