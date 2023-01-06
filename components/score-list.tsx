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

import ScoreDialog from './score-dialog';
import ScoreListItem from './score-list-item';
import IndustrySelector from './industry-selector'
interface CustomPageProps { 
  scoresList: any,
  addInfo: any
}

export default function ScoreList({ scoresList, addInfo, pageProps }: AppProps & CustomPageProps) {
    //Handle the opening and closing of the dialog
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedCompany, setCompany] = React.useState<any>(scoresList[0]);
    const [searchTerm, setSearch] = React.useState("");
    const [industry, setIndustry] = React.useState("");
    const [sort, setSort] = React.useState<string | number>(1);



    //handle Sort type
    switch(sort){
      case 1: //latest day high - low
        scoresList.sort((a, b) => b.daily["2022-11-07"]-a.daily["2022-11-07"])
        break;
      case 2: //latest day low - high
        scoresList.sort((a, b) => a.daily["2022-11-07"]-b.daily["2022-11-07"])
        break;
      case 3: //latest yearly low - high
        scoresList.sort((a, b) => b.yearly["2022"]-a.yearly["2022"])
        break;
      case 4: //latest yearly high - low
        scoresList.sort((a, b) => a.yearly["2022"]-b.yearly["2022"])
        break;
    }
    //Create one ScoreListItem for each company in the List, with state hooks
    const myScores=[]
    
    if (searchTerm=="" && industry=="") //no search or industry filter
    scoresList.forEach((element, key)=>{
        myScores.push(
            <ScoreListItem 
                key={key} 
                data={element}
                name={(addInfo[element.ticker]) ? addInfo[element.ticker][1] : element.ticker}
                setOpen={setOpen} 
                setCompany={setCompany}
                sort={sort}
                {...pageProps}
                />
            );
    });
    else if (industry) //Execute if we have a industry filter selected
    scoresList.forEach((element, key)=>{
      if (addInfo[element.ticker] && addInfo[element.ticker][0]==industry)
      myScores.push(
          <ScoreListItem 
              key={key}
              data={element}
              name={(addInfo[element.ticker]) ? addInfo[element.ticker][1] : element.ticker}
              setOpen={setOpen}
              setCompany={setCompany}
              sort={sort}
              {...pageProps}
              />
          );
    });
    else //Execute if we have a search in process
    scoresList.forEach((element, key)=>{
      if (element.ticker.toLowerCase().includes(searchTerm.toLowerCase()))
      myScores.push(
          <ScoreListItem 
              key={key}
              data={element}
              name={(addInfo[element.ticker]) ? addInfo[element.ticker][1] : element.ticker}
              setOpen={setOpen}
              setCompany={setCompany}
              sort={sort}
              {...pageProps}
              />
          );
    });

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
            <Grid md={4} xs={6} spacing={3}>
            <IndustrySelector 
              selectedIndustry={industry}
              setIndustry={setIndustry} 
              {...pageProps} />
            </Grid>
            <Grid md={4} xs={6} spacing={3}>
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
            </Grid>
            <Grid md={4} xs={12} spacing={3}>
            <TextField 
              variant="outlined" 
              label="Search" 
              onChange={event => setSearch(event.target.value)} 
              size="small" 
               />
            </Grid>
            </Grid>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
            { myScores }
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