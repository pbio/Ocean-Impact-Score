import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

interface CustomPageProps {
    cutoffLimit: number,
}
export default function TopXCutoffLine({ cutoffLimit}: CustomPageProps){
    return (
        <ListItem>
            <Typography 
                align='center' 
                variant='body1' 
                sx={{px: '16px 16px', bgcolor: '#EEBC1D', color:'black', width:'100%', borderRadius:'16px', fontWeight: '700'}}>
                {'Top '+ cutoffLimit +' Cutoff'}
            </Typography>
        </ListItem>
    );
}