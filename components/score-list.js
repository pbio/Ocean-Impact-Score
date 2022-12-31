import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import ScoreDialog from './score-dialog.tsx';
import ScoreListItem from './score-list-item.js';
import IndustrySelector from './industry-selector.tsx'

export default function ScoreList({ scoresList, addInfo }) {
    //Handle the opening and closing of the dialog
    const [open, setOpen] = React.useState(false);
    const [selectedCompany, setCompany] = React.useState(scoresList[0]);
    const [searchTerm, setSearch] = React.useState("");
    const [industry, setIndustry] = React.useState("");

    const industryList = [
      "", "Commercial Services", "Communications", "Consumer Durables", "Consumer Non-Durables", "Consumer Services", 
      "Distribution Services", "Electronic Technology", "Energy Minerals", "Finance", "Health Services", "Health Technology", 
      "Industrial Services", "Non-Energy Minerals", "Process Industries", "Producer Manufacturing", "Retail Trade", "Technology Services", 
      "Transportation", "Utilities", "Real Estate"
    ];

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
              />
          );
    });
    else //Execute if we have a search in process
    scoresList.forEach((element, key)=>{
      if (element.ticker.includes(searchTerm))
      myScores.push(
          <ScoreListItem 
              key={key}
              data={element}
              name={(addInfo[element.ticker]) ? addInfo[element.ticker][1] : element.ticker}
              setOpen={setOpen}
              setCompany={setCompany}
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
            <Grid md={6} spacing={3}>
            <IndustrySelector 
            selectedIndustry={industry}
            setIndustry={setIndustry} 
            industryList={industryList} />
            </Grid>
            <Grid md={6} spacing={3}>
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
                setOpen={setOpen} />
    </Box>
  );
}