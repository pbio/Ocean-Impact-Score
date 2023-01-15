import * as React from 'react';
import type { AppProps } from 'next/app'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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

interface CustomPageProps { 
  scoresList: Item[],
  addInfo: any
}

const Item = styled('div')(({ theme }) => ({
  //padding: theme.spacing(1),
  //textAlign: 'center'
}));

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
    const [sort, setSort] = React.useState<string | number>(1);

    //handle Sort type
    switch(sort){
      case 1: //latest day high - low
        scoresList.sort((a: Item, b: Item) => b.daily["2022-11-07"]-a.daily["2022-11-07"])
        break;
      case 2: //latest day low - high
        scoresList.sort((a: Item, b: Item) => a.daily["2022-11-07"]-b.daily["2022-11-07"])
        break;
      case 3: //latest yearly low - high
        scoresList.sort((a: Item, b: Item) => b.yearly["2022"]-a.yearly["2022"])
        break;
      case 4: //latest yearly high - low
        scoresList.sort((a: Item, b: Item) => a.yearly["2022"]-b.yearly["2022"])
        break;
    }

    return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
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
          <Grid md={4} xs={6} spacing={3} sx={{ p: 2 }} >
            <Item>
            <IndustrySelector 
              selectedIndustry={industry}
              setIndustry={setIndustry} 
              {...pageProps} />
            </Item>
            </Grid>
            <Grid md={4} xs={6} spacing={3} sx={{ p: 2 }} >
            <Item>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                    id="select sort"
                    value={sort}
                    label="sort"
                    onChange={event => setSort(event.target.value)}
                    >
                    <MenuItem 
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
                      highest yearly
                    </MenuItem>
                    <MenuItem 
                        key={4} 
                        value={4}>
                      lowest yearly
                    </MenuItem>
                </Select>
            </FormControl>
            </Item>
            </Grid>
            <Grid 
              md={4} xs={12} 
              spacing={3} sx={{ p: 2 }} >
              <Item>
              <TextField 
                variant="outlined" 
                label="Search" 
                onChange={event => setSearch(event.target.value)} 
                size="small" 
                />
                </Item>
            </Grid>
          </Grid>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          {!industry ? 
          scoresList
            .filter((element)=>{ //search
              return element.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || addInfo[element.ticker]?.[1]?.toLowerCase().includes(searchTerm.toLowerCase())
            }) 
            .slice(0,50) //only show the top 50
            .map(element=>
              <ScoreListItem 
                  key={element.ticker} 
                  data={element}
                  name={(addInfo[element.ticker]) ? addInfo[element.ticker][1] : element.ticker}
                  setOpen={setOpen} 
                  setCompany={setCompany}
                  sort={sort}
                  {...pageProps}
                  />) 
          : 
          scoresList
            .filter(element => addInfo[element.ticker]?.[0]==industry ) //industry category filter
            .filter((element)=>{
              return element.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || addInfo[element.ticker]?.[1]?.toLowerCase().includes(searchTerm.toLowerCase())
            }) //search
            .slice(0,50) //only show the top 50
            .map(element=>
                <ScoreListItem 
                    key={element.ticker}
                    data={element}
                    name={(addInfo[element.ticker]) ? addInfo[element.ticker][1] : element.ticker}
                    setOpen={setOpen}
                    setCompany={setCompany}
                    sort={sort}
                    {...pageProps}
                    />)
          }
        </List>
      </nav>
      <ScoreDialog 
          ticker={selectedCompany.ticker} 
          monthly={selectedCompany.monthly} 
          yearly={selectedCompany.yearly} 
          daily={selectedCompany.daily}
          open={open} 
          setOpen={setOpen}
          {...pageProps} />
    </Box>
  );
}