import * as React from 'react';
import type { AppProps } from 'next/app'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ScorePlot from './score-plot.js';
import { setDatasets } from 'react-chartjs-2/dist/utils.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectTicker, removeTicker } from './select-ticker-slice'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
interface CustomPageProps { 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  open: boolean
}

export default function CustomizedDialogs({ open, setOpen }: AppProps & CustomPageProps):JSX.Element {
  const { ticker, daily, monthly, yearly } = useSelector(selectTicker);
  const dispatch = useDispatch(); 
  const [plotType, setPlotType] = React.useState(0);
  const plotTypeTitle: Array<String> = ["Daily", "Monthly", "Yearly"]
  const setData = function(plotType: Number) {
    if (plotType==2) return yearly
    else if (plotType==1) return monthly
    else return daily
  }

      //async call to get data on specific company
      React.useEffect(()=>{
        //const getData = async function() { //need to go through proxy
            // const options = {
            //     method: 'POST',
            //     headers: {
            //       'content-type': 'application/json',
            //       Origin: 'localhost:3000',
            //       'X-Requested-With': 'www.example.com',
            //       'X-RapidAPI-Key': 'ca8f97584cmsh69c58e9a18bd1dcp12f73cjsn64e6335cc338',
            //       'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
            //     },
            //     body: '{"url":"https://esg.cafe/api/v2/general-info/EU600?API_KEY=44b6dedca1668563f8c75d7b2c08453f&interval=1M&start=2018-11-05T10:50:35.819Z&finish=2023-02-05T10:50:35.819Z"}'
            //   };
              
            // const genInfo = await fetch('https://http-cors-proxy.p.rapidapi.com/', options)
            // const genInfoJson = await genInfo.json();
            // setInfo(genInfoJson);
        //}
        getData();
    }, []);

  return (
      <BootstrapDialog
        onClose={() => {setOpen(false); dispatch(removeTicker())}}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          {ticker + " " + plotTypeTitle[plotType] + " Scores"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ScorePlot 
            scores={setData(plotType)} 
            ticker={ticker} />
        </DialogContent>
        <DialogActions>
        <Button 
          variant={plotType==0 ? "contained": "outlined"}
          onClick={()=>setPlotType(0)}>
            daily
        </Button>
        <Button 
          variant={plotType==1 ? "contained": "outlined"} 
          onClick={()=>setPlotType(1)}>
            monthly
        </Button>
        <Button 
          variant={plotType==2 ? "contained": "outlined"} 
          onClick={()=>setPlotType(2)}>
            yearly
        </Button>
        </DialogActions>
      </BootstrapDialog>
  );
}