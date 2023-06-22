import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function SelectBankCard(props) {

  React.useEffect(() => {
    // const [establishData, TrustlyOptions] = props;
    const data = props.establishData();
    window.Trustly.selectBankWidget(data, props.TrustlyOptions);
  });

  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, margin: 5}}>
      <CardContent>
        <div id="widget"></div>
      </CardContent>
    </Card>
  );
}
