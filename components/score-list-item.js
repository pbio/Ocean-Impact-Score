import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { ArrowDownward, DragHandle, ArrowUpward } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';


import getDate from "../lib/getDate.js"
import ScorePlot from "./score-plot.js"
export default function ScoreItem ({data, setOpen, setCompany, name}) {
  //const todayDate = getDate(); //when go live, need to implement the today date checker
  const todayDate = "2022-11-07"
  const todayScore=data.daily[todayDate]
  const thisMonthAvg=data.monthly["2022-10"]
  const rankChangeMY = data.ranking.month - data.ranking.year
  const setColor = function(rankChange) {
    if (rankChange > 0) return "green"
    else if (rankChange < 0) return "red"
    else return "white"
  }
  const setIcon = function(rankChange) {
    if (rankChange > 0) return <ArrowUpward color="green" />
    else if (rankChange < 0) return <ArrowDownward color="red" />
    else return <DragHandle />
  }
  //close the dialog
  const handleClickOpen = () => {
    setOpen(true);
    setCompany(data);
  };
  const handleClose = () => {
      setOpen(false);
  };
  return (
    <ListItem>
      <ListItemButton onClick={handleClickOpen} >
      <Grid
  container
  direction="row"
  justifyContent="space-between"
  alignItems="baseline"
>
        <Grid md={4} sm={12}>
          <Typography variant="h3" color="primary">
            {data.ticker}
          </Typography>
          <Typography variant="p" color="white">
            {name}
          </Typography>
        </Grid>
        <Grid md={4} sm={6}>
      <Typography 
        variant="p" >
        {"Today's Score: " + todayScore.toFixed(2)}
        </Typography>
        </Grid>
        <Grid md={4} sm={6}>
        <Tooltip title="month-to-year trend">
      <Typography 
        variant="p" 
        color={setColor(rankChangeMY)} 
        display="flex" justifyContent="flex-end">
         
        {"Rank change: " + rankChangeMY}
        { setIcon(rankChangeMY) }
      </Typography>
      </Tooltip>
      
        </Grid>
        </Grid>
        
      </ListItemButton>
      </ListItem>)
}
