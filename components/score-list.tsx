import * as React from 'react';
import { Box, List, ListItem, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ScoreListItem from './score-list-item';
import getDate from '../lib/getDate';

export default function ScoreList({ Info, Scores }:any ) {
    //state
    const [ dateKey, setDateKey ] = React.useState<string>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedCompany, setCompany] = React.useState<any>();
    const [sort, setSort] = React.useState<number>(3);

    //get date
    const todayDateStrYMD = getDate();

    //create date key when we receive Scores
    React.useEffect(()=>{
        setDateKey(Object.keys(Scores)
                            .find((key) =>{ 
                                return key.includes(todayDateStrYMD.slice(0,-3))
                            }));  
    }, [Scores]); 

    if (Array.isArray(Info) && dateKey)
        return (<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List>
                        <ListItem >
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline" >
                        
                        <Grid md={4} xs={6} sx={{ p: 2 }} item>
                            
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                                <Select
                                    id="select sort"
                                    value={sort}
                                    label="sort"
                                    onChange={event => setSort(Number(event.target.value))} >
                                    {['highest daily', 'lowest daily','highest monthly', 'lowest monthly', 'highest yearly', 'lowest yearly']
                                        .map((sortLabel:string, sortIdx:number) =>
                                            <MenuItem 
                                                key={sortIdx} 
                                                value={sortIdx}>
                                                    {sortLabel}
                                            </MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                 { Info                         //All tickers
                    .sort((a:any, b:any) => {   //sort tickers
                            if (sort === 3) return (Scores[dateKey][b.ticker].Tone - Scores[dateKey][a.ticker].Tone);
                            else if (sort === 4) return (Scores[dateKey][a.ticker].Tone - Scores[dateKey][b.ticker].Tone);
                            else return (Scores[dateKey][a.ticker].Tone - Scores[dateKey][b.ticker].Tone);
                        }) 
                    .slice(0, 40)               // only show top 40
                    .map( (company:any) => {    // show on display
                        return <ScoreListItem 
                                    key={ company.ticker }
                                    data={Scores[dateKey]?.[company.ticker].Tone}
                                    info={company}
                                    setOpen={setOpen} 
                                    setCompany={setCompany}
                                    sort={sort}
                                    />
                 }) }
                </Box>);
    return <div> waiting for server </div>;
}