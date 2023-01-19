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
  ticker: String,
  daily: Object,
  monthly: Object,
  yearly: Object,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  open: boolean
}

export default function CustomizedDialogs({ticker, monthly, yearly, daily, open, setOpen}: AppProps & CustomPageProps):JSX.Element {
  const [plotType, setPlotType] = React.useState(0);
  const plotTypeTitle: Array<String> = ["Daily", "Monthly", "Yearly"]
  const setData = function(plotType: Number) {
    if (plotType==2) return yearly
    else if (plotType==1) return monthly
    else return daily
  }
  return (
      <BootstrapDialog
        onClose={() => setOpen(false)}
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