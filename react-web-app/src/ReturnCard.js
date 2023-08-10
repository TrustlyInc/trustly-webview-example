import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

export default function ReturnCard(props) {

  React.useEffect(() => {
    // const [establishData, TrustlyOptions] = props;
    // const data = props.establishData();
    // window.Trustly.selectBankWidget(data, props.TrustlyOptions);
  });

  const redirectSummary = params => {
    if (!params.get("transactionId")) return null;
    console.log(JSON.stringify(window.location));
    let success = window.location.pathname.split("/").includes("return");
    return (
        <div>
            <Typography>Transaction {success ? "Successful" : "Failed/Canceled"}</Typography>
            <Typography>Transaction ID: {props.params.get("transactionId")}</Typography>
        </div>
    )
  }

  return (
    <Card sx={{ minWidth: 275, maxWidth: 550, margin: 5}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Transaction Status will appear here:
        </Typography>
        {redirectSummary(props.params)}
      </CardContent>
    </Card>
  );
}
