import * as React from 'react';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


// export function IndustrySelector2({ setIndustry, industryList}) {
//     const buttons= []
//     industryList.forEach(function(element){
//         buttons.push(
//         <Button 
//             key={element} 
//             onClick={()=>{setIndustry(element)}}>
//             {element}
//         </Button>);
//     })
//   return (<>{buttons}</>)
// }

export default function IndustrySelector({ selectedIndustry, setIndustry, industryList}) {
    const items= []
    industryList.forEach(function(element){
        items.push(
        <MenuItem 
            key={element} 
            value={element}>
        {element}
        </MenuItem>);
    })
    return (    
    <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedIndustry}
            label="Age"
            onChange={(event)=>{
                setIndustry(event.target.value)
            }}
            >
            {items}
        </Select>
  </FormControl>);
}