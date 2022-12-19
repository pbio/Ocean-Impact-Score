import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { ArrowDownward, DragHandle, ArrowUpward } from '@mui/icons-material';
import Grid from '@mui/material/Grid';


import getDate from "../lib/getDate.js"
import ScorePlot from "./score-plot.js"
export default function ScoreItem ({data, setOpen, setCompany, name}) {
  //const todayDate = getDate(); //when go live, need to implement the today date checker
  const todayDate = "2022-11-07"
  const todayScore=data.daily[todayDate]
  const thisMonthAvg=data.monthly["2022-10"]
  const setColor = function(todayScore, thisMonthAvg) {
    if (todayScore > thisMonthAvg) return "green"
    else if (todayScore < thisMonthAvg) return "red"
    else return "black"
  }
  const setIcon = function(todayScore, thisMonthAvg) {
    if (todayScore > thisMonthAvg) return <ArrowUpward color="green" />
    else if (todayScore < thisMonthAvg) return <ArrowDownward color="red" />
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
  spacing={3}
  direction="row"
  justifyContent="space-between"
  alignItems="baseline"
>
        <Grid md={6}>
          <Typography variant="h3" color="primary">
            {data.ticker}
          </Typography>
          <Typography variant="p" color="black">
            {name}
          </Typography>
        </Grid>
        <Grid md={6} >
        
      <Typography 
        variant="p" 
        color={setColor(todayScore, thisMonthAvg)} 
        display="flex" justifyContent="flex-end">
         
        {"score: " + todayScore.toFixed(2)}
        { setIcon(todayScore, thisMonthAvg) }
      </Typography>
      
        </Grid>
        </Grid>
        
      </ListItemButton>
      </ListItem>)
}
