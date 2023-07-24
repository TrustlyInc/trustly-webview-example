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
          Example of a button that launches the Lightbox directly
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant='text' 
          size='small'
          onClick={()=> window.Trustly.establish(props.establishData(), props.TrustlyOptions)} 
        >
          <img src='https://paywithmybank.com/start/asset/mark_trustly-256x65_1_light_en-US.png' alt='Trustly payment mark'/>
          {/* https://paywithmybank.com/start/asset/mark_trustly-256x65_1_light_en-US.png */}
        </Button>
      </CardActions>
    </Card>
  );
}
