import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { ArrowDownward, DragHandle, ArrowUpward } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addTicker } from "./select-ticker-slice";

interface Item {
  ticker: string;
  daily: any;
  monthly: any;
  yearly: any;
  ranking: { year: number; month: number; day: number };
  rank: number[];
}
interface Info {
  Exchange: string;
  ISIN: string;
  Location: string;
  Name: string;
  RelatedCompanies: any;
  Sector: string;
  class: string;
  currency: string;
  market: string;
  ticker: string;
  dailyScores: [string, number][];
  monthlyScores: [string, number][];
  yearlyScores: [string, number][];
  rank:number[];
}

interface CustomPageProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCompany: React.Dispatch<React.SetStateAction<object>>;
  info: Info;
  sort: number;

}

export default function ScoreItem({
  setOpen,
  setCompany,
  info,
  sort,
}: CustomPageProps): JSX.Element {
  const router = useRouter();
  const dispatch: any = useDispatch();

  // const rankChangeMY: number  = info.rank?.[0] - info.rank?.[1]
  // const setColor = function(rankChange: Number) {
  //   if (rankChange > 0) return "green"
  //   else if (rankChange < 0) return "red"
  //   else return "white"
  // }
  // const setIcon = function(rankChange: Number) {
  //   if (rankChange > 0) return <ArrowUpward color="success" />
  //   else if (rankChange < 0) return <ArrowDownward color="error" />
  //   else return <DragHandle />
  // }
  //close the dialog
  const handleClickOpen = () => {
    router.push(`/${info.market}/${info.ticker}`);
    setOpen(true);
    //setCompany(data);
    //dispatch(addTicker(data))
  };
  const handleClose = () => {
    setOpen(false);
  };
  //Show the right score based on day/month/year view
  const createScoreContent = function (sort: number, info: any) {
    switch (sort) {
      case 1:
      case 2:
        return info.dailyScores[0][1]
          ? "Today's Score: " + info.dailyScores[0][1].toFixed(2)
          : "No score available";
      case 3:
      case 4:
        return info.monthlyScores[0][1]
          ? "This month's Score: " + info.monthlyScores[0][1].toFixed(2)
          : "No score available";
      case 5:
      case 6:
        return info.yearlyScores[0][1]
          ? "This year's Score: " + info.yearlyScores[0][1].toFixed(2)
          : "No score available";
      default:
        break;
    }
  };
  return (
    <ListItem>
      <ListItemButton onClick={handleClickOpen} sx={{ borderRadius: "16px" }}>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='baseline'>
          <Grid md={4} sm={12} item>
            <Typography variant='h3' color='primary'>
              {info.ticker}
            </Typography>
            <Typography variant='body1' color='white'>
              {info.Name}
            </Typography>
          </Grid>
          <Grid md={4} sm={6} item>
            <Typography variant='body1'>
              {createScoreContent(sort, info)}
            </Typography>
          </Grid>
          <Grid md={4} sm={6} item>
            <Typography variant='body1'>No rankings available yet</Typography>
          </Grid>
          {/* {(sort === 5 || sort === 6) ? 
          <Typography variant='body1'>no rankings available for the year yet</Typography>
          :
          <Grid md={4} sm={6} item>
            <Typography variant='body1' color={setColor(rankChangeMY)}>
              {rankChangeMY}
            </Typography>
            {setIcon(rankChangeMY)}
          </Grid>} */}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}
