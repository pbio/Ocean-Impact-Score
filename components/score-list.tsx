import * as React from 'react';
import type { AppProps } from 'next/app'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from '@mui/system/styled';

import ScoreDialog from './score-dialog';
import ScoreListItem from './score-list-item';
import IndustrySelector from './industry-selector'
import TopXCutoffLine from './top-x-cutoff-line'

interface CustomPageProps { 
  scoresList: Item[],
  addInfo: any
}

interface Item {
  ticker: string,
  daily: any,
  monthly: any,
  yearly: any,
  ranking: {year: number, month: number, day: number}
}

export default function ScoreList({ scoresList, addInfo, pageProps }: AppProps & CustomPageProps): JSX.Element {
    //Handle the opening and closing of the dialog
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedCompany, setCompany] = React.useState<any>(scoresList[0]);
    const [searchTerm, setSearch] = React.useState("");
    const [industry, setIndustry] = React.useState("");
    const [sort, setSort] = React.useState<number>(1);

    //Handle Sort Type array
    const hst: Array<[string, string, string, number]> = [
      ["daily", "2022-11-06", "2022-11-07",1],
      ["daily", "2022-11-06", "2022-11-07", -1],
      ["monthly", "2021-10", "2022-11", 1],
      ["monthly", "2021-10", "2022-11", -1],
      ["yearly", "2021", "2022", 1],
      ["yearly", "2021", "2022", -1]
    ]

    return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem >
          <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Grid md={4} xs={6} sx={{ p: 2 }} item>
            <IndustrySelector 
              selectedIndustry={industry}
              setIndustry={setIndustry} 
              {...pageProps} />
            
            </Grid>
            <Grid md={4} xs={6} sx={{ p: 2 }} item>
            
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                    id="select sort"
                    value={sort}
                    label="sort"
                    onChange={event => setSort(Number(event.target.value))}
                    >
                    <MenuItem //To do: use map() for this
                        key={1} 
                        value={1}>
                      highest daily
                    </MenuItem>
                    <MenuItem 
                        key={2} 
                        value={2}>
                      lowest daily
                    </MenuItem>
                    <MenuItem 
                        key={3} 
                        value={3}>
                      highest monthly
                    </MenuItem>
                    <MenuItem 
                        key={4} 
                        value={4}>
                      lowest monthly
                    </MenuItem>
                    <MenuItem 
                        key={5} 
                        value={5}>
                      highest yearly
                    </MenuItem>
                    <MenuItem 
                        key={6} 
                        value={6}>
                      lowest yearly
                    </MenuItem>
                </Select>
            </FormControl>
            
            </Grid>
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
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          {
          scoresList
          .sort((a: any, b: any) => hst[sort-1][3]*b[hst[sort-1][0]][hst[sort-1][1]]-hst[sort-1][3]*a[hst[sort-1][0]][hst[sort-1][1]]) //To do: clean up this line to make it understandable
          .map((element, index) => ({...element, rank:[hst[sort-1][3]*index]})) // add yesterday/last months/last years rank
          .sort((a: any, b: any) => hst[sort-1][3]*b[hst[sort-1][0]][hst[sort-1][2]]-hst[sort-1][3]*a[hst[sort-1][0]][hst[sort-1][2]]) //To do: clean up this line to make it understandable
          .map((element, index) => { 
            element.rank[1]=hst[sort-1][3]*index;
            return element })     //add today's/this month/this year rank 
          .filter(element => addInfo[element.ticker]?.[0].includes(industry) ) //industry category filter
          .filter((element)=>{ //search term filter: name and ticker 
              return element.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || addInfo[element.ticker]?.[1]?.toLowerCase().includes(searchTerm.toLowerCase())
            }) 
          .slice(0,50) //only show the top 50 to avoid slowing down app
          .map((element, index )=>{ //map to output the JSX components
              return (<>
                <ScoreListItem 
                  key={element.ticker}
                  data={element}
                  name={(addInfo[element.ticker]) ? addInfo[element.ticker][1] : element.ticker}
                  setOpen={setOpen} 
                  setCompany={setCompany}
                  sort={sort}
                  {...pageProps}
                  />
                  {/* show the cutoff line */}
                  {(index == 4 && searchTerm=="") && <TopXCutoffLine cutoffLimit={index+1} key={"top"+index} />} 
                </>)
            }) 
          }
        </List>
      </nav>
      <ScoreDialog // modal to show the data in graphs
          open={open} 
          setOpen={setOpen}
          {...pageProps} />
    </Box>
  );
}