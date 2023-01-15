import * as React from 'react';
import type { AppProps } from 'next/app'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface CustomPageProps { 
    selectedIndustry: string,
    setIndustry: React.Dispatch<React.SetStateAction<string>>
}

//export default function IndustrySelector({ selectedIndustry, setIndustry}: AppProps<CustomPageProps> ) {
export default function IndustrySelector(props: AppProps & CustomPageProps ):JSX.Element {
    const industryList: string[] = [
        "", "Commercial Services", "Communications", "Consumer Durables", "Consumer Non-Durables", "Consumer Services", 
        "Distribution Services", "Electronic Technology", "Energy Minerals", "Finance", "Health Services", "Health Technology", 
        "Industrial Services", "Non-Energy Minerals", "Process Industries", "Producer Manufacturing", "Retail Trade", "Technology Services", 
        "Transportation", "Utilities", "Real Estate"
      ];
    return (
    <FormControl fullWidth size="small">
        <InputLabel id="select-industry">Industry</InputLabel>
         <Select
            value={props.selectedIndustry}
            label="industry"
            onChange={(event)=>{
                props.setIndustry(event.target.value)
            }}
            >
            {industryList.map(function(element : string){
                return element ? 
                    <MenuItem 
                        key={element} 
                        value={element}>
                        {element}
                    </MenuItem> :
                    <MenuItem 
                        key={element}
                        value={element}>
                        Show All Companies
                    </MenuItem>
            })}
        </Select>
  </FormControl>);
}