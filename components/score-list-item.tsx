import type { AppProps } from 'next/app'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { ArrowDownward, DragHandle, ArrowUpward } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

//import getDate from "../lib/getDate.ts"
interface CustomPageProps { 
  data: any,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCompany: React.Dispatch<React.SetStateAction<object>>,
  name: string,
  sort: number
}

export default function ScoreItem ({data, setOpen, setCompany, name, sort}: AppProps & CustomPageProps):JSX.Element {
  //const todayDate = getDate(); //when go live, need to implement the today date checker
  const todayDate: string = "2022-11-07"
  const todayScore: number = data.daily[todayDate]
  const thisMonthAvg: number = data.monthly["2022-10"]
  const rankChangeMY: number  = data.ranking.month - data.ranking.year
  const setColor = function(rankChange: Number) {
    if (rankChange > 0) return "green"
    else if (rankChange < 0) return "red"
    else return "white"
  }
  const setIcon = function(rankChange: Number) {
    if (rankChange > 0) return <ArrowUpward color="success" />
    else if (rankChange < 0) return <ArrowDownward color="error" />
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
  //Show the right score based on day/month/year view
  const createScoreContent = function(sort: Number, TodaysScore: Number, YearsScore: Number){
    switch (sort) {
      case 1:
      case 2:
        return "Today's Score: " + TodaysScore.toFixed(2)
      case 3:
      case 4:
        return YearsScore ? "This Year's Score: " + YearsScore.toFixed(2) : "No score available"
      default:
        break;
    }
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
          <Typography variant="body1" color="white">
            {name}
          </Typography>
        </Grid>
        <Grid md={4} sm={6}>
          <Typography 
            variant="body1" >
              {createScoreContent(sort, todayScore, data.yearly["2022"])}
            </Typography>
            </Grid>
            <Grid md={4} sm={6}>
            <Tooltip title="month-to-year trend">
              <Typography 
                variant="body1" 
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
