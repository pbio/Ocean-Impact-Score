import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface CustomPageProps { 
    selectedIndustry: string,
    setIndustry: React.Dispatch<React.SetStateAction<string>>,
    industries: string[]
}

//export default function IndustrySelector({ selectedIndustry, setIndustry}: AppProps<CustomPageProps> ) {
export default function IndustrySelector({ industries, selectedIndustry, setIndustry }: CustomPageProps ):JSX.Element {
    return (
    <FormControl fullWidth size="small">
        <InputLabel id="select-industry">Industry</InputLabel>
         <Select
            value={selectedIndustry}
            label="industry"
            onChange={(event)=>{
                setIndustry(event.target.value)
            }}
            >
            {industries.map(function(element : string){
                return <MenuItem 
                        key={element} 
                        value={element}>
                        {element}
                    </MenuItem> 
            })}
            <MenuItem 
                key={''}
                value={''}>
                Show All Companies
            </MenuItem>
        </Select>
  </FormControl>);
}