import * as React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Heading({ todayDateStrYMD }:{ todayDateStrYMD: string }) {
    return (<>
        <Typography variant="h2" color="white" align="center">
            Ocean Impact Score
        </Typography>
        <Typography variant= "body1" color= "white" sx={{ fontWeight: 'bold' }}>
            An interface for viewing the Ocean Impact Score by Waves of Change
        </Typography>
        <Typography variant= "body1" color= "white" sx={{ fontStyle: 'italic' }}> 
            Each public company in the SP500/STOXX600 is given an ocean impact score coming from our deep learning models trained on academic papers and reliable articles pertaining to the company&rsquo;s environmental and specifically &rsquo;Ocean&rsquo; impact. 
            <br></br>Future versions of this tool will update all scores in real time. 
        </Typography>
        <Typography variant= "body1" >{ `Latest Data Dump: ${todayDateStrYMD}` }</Typography>
        <Box sx={{ width: 300, height: 50}} >
            <Link href='/sp500'><Button> SP500 </Button></Link>
            <Link href='/eu600'><Button> EU600 </Button></Link>
        </Box>
        </>);
}