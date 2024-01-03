import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

export default function SelectBankCard(props) {
  useEffect(() => {
    const { establishData, TrustlyOptions } = props;

    (async () => {
      const data = await establishData();
      window.Trustly.selectBankWidget(data, TrustlyOptions);
    })();
  }, [props]);

  return (
    <Card sx={{ minWidth: 275, maxWidth: 550, margin: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Example of the Select Bank Widget
        </Typography>
        <div id='widget'></div>
      </CardContent>
    </Card>
  );
}
