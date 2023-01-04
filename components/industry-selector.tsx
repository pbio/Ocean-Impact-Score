import * as React from 'react';
import type { AppProps } from 'next/app'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function IndustrySelector({ selectedIndustry, setIndustry, industryList}: AppProps) {
    return (    
    <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
         <Select
            id="select industry"
            value={selectedIndustry}
            label="industry"
            onChange={(event)=>{
                setIndustry(event.target.value)
            }}
            >
            {industryList.map(function(element : string){
                return <MenuItem 
                            key={element} 
                            value={element}>
                        {element}
                        </MenuItem>
            })}
        </Select>
  </FormControl>);
}