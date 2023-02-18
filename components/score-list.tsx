import * as React from 'react';
import { Box, 
        List, 
        ListItem, 
        Grid, 
        FormControl, 
        InputLabel, 
        Select, 
        MenuItem, 
        TextField } from '@mui/material';
import ScoreListItem from './score-list-item';
import getDate from '../lib/getDate';
import IndustrySelector from './industry-selector';

export default function ScoreList({ Info }:any ) {
    //state
    const [ dateKey, setDateKey ] = React.useState<string>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedCompany, setCompany] = React.useState<any>();
    const [sort, setSort] = React.useState<number>(3);
    const [searchTerm, setSearch] = React.useState("");
    const [industry, setIndustry] = React.useState("");

    //get date
    const todayDateStrYMD = getDate();

    //create date key when we receive Scores
    // React.useEffect(()=>{
    //     setDateKey(Object.keys(Scores)
    //                         .find((key) =>{ 
    //                             return key.includes(todayDateStrYMD.slice(0,-3))
    //                         }));  
    // }, [Scores]); 

    if (Array.isArray(Info))
        return (<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List>
                        <ListItem >
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline" >

                            {/* Industry selector */}
                            <Grid md={4} xs={6} sx={{ p: 2 }} item>
                                <IndustrySelector 
                                    industries = { Info?.reduce((output, i) => {
                                            if ( output.indexOf(i.Sector) === -1 ) output.push(i.Sector);
                                            return output;
                                        }, [])}
                                    selectedIndustry={industry}
                                    setIndustry={setIndustry} />
                            </Grid>

                            {/* Sort selector */}
                            <Grid md={4} xs={6} sx={{ p: 2 }} item>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Sort</InputLabel>
                                    <Select
                                        id="select sort"
                                        value={sort}
                                        label="sort"
                                        onChange={event => setSort(Number(event.target.value))} >
                                        {['highest daily', 'lowest daily','highest monthly', 'lowest monthly', 'highest yearly', 'lowest yearly']
                                            .map((sortLabel:string, sortIdx:number) =>
                                                <MenuItem 
                                                    key={sortIdx+1} 
                                                    value={sortIdx+1}>
                                                        {sortLabel}
                                                </MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            {/* Search Input  */}
                            <Grid md={4} xs={12} sx={{ p: 2 }} item>
                                <TextField 
                                    variant="outlined" 
                                    label="Search" 
                                    onChange={event => setSearch(event.target.value)} 
                                    size="small" 
                                    fullWidth
                                    />
                            </Grid>
                        </Grid>
                        </ListItem>
                    </List>
                 { Info                         //All tickers
                    .sort((a:any, b:any) => {   //sort tickers
                            switch (sort) {
                                case 1: return b.dailyScores[0][1] - a.dailyScores[0][1];
                                case 2: return a.dailyScores[0][1] - b.dailyScores[0][1];
                                case 3: return b.monthlyScores[0][1] - a.monthlyScores[0][1];
                                case 4: return a.monthlyScores[0][1] - b.monthlyScores[0][1];
                                case 5: return b.yearlyScores[0][1] - a.yearlyScores[0][1];
                                case 6: return a.yearlyScores[0][1] - b.yearlyScores[0][1];
                            } 
                            return 0;
                        }) 
                    .filter(company => {           //industry category filter
                            return company.Sector.includes(industry); 
                        }) 
                    .filter((company)=>{        //search term filter: name and ticker 
                            return company.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || company.Name.toLowerCase().includes(searchTerm.toLowerCase())
                        }) 
                    .slice(0, 40)               // only show top 40
                    .map( (company:any) => {    // show on display
                        let score:number;
                        switch (sort) {
                            case 1:
                            case 2: 
                                score=company.dailyScores[0][1]
                                break;
                            case 3:
                            case 4:
                                score=company.monthlyScores[0][1]
                                break;
                            case 5:
                            case 6:
                                score=company.yearlyScores[0][1]
                                break;
                            default:
                                score=-10000;
                        }
                        return <ScoreListItem 
                                    key={ company.ticker }
                                    info={company}
                                    setOpen={setOpen} 
                                    setCompany={setCompany} 
                                    sort={sort} 
                                    />
                 }) }
                </Box>);
    return <div> Waiting for your data </div>;
}