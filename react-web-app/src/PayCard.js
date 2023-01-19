import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PayCard(props) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, margin: 5}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Thanks for shopping with us!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> window.Trustly.establish(props.establishData(), props.TrustlyOptions)}>
          Pay with Trustly
        </Button>
      </CardActions>
    </Card>
  );
}
