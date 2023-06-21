import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SelectBankCard(props) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, margin: 5}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Pay with Trustly
        </Typography>
        <div id="widget"></div>
      </CardContent>
    </Card>
  );
}
