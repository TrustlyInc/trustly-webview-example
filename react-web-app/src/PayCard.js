import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PayCard(props) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 550, margin: 5}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Launch the Lightbox directly
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant='text' 
          size='small'
          onClick={()=> window.Trustly.establish(props.establishData(), props.TrustlyOptions)} 
        >
          <img src='https://paywithmybank.com/assets/mark_trustly-365x52/mark_trustly-365x52-2_light_en-US.png' alt='Trustly payment mark'/>
        </Button>
      </CardActions>
    </Card>
  );
}
