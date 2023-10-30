import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

export default function SelectBankCard(props) {

  React.useEffect(() => {
    // const [establishData, TrustlyOptions] = props;
    const data = props.establishData();
    window.Trustly.selectBankWidget(data, props.TrustlyOptions);

    // logic for handling inLine Lightbox
    let widgetContainer = document.getElementById("widget");
    let lightboxContainer = document.getElementById("lightbox");

    window.Trustly.addPanelListener((command, obj) => {
      switch(command) {
        case "open":
          console.log("Lightbox will open");
          widgetContainer.style.display = 'none';
          break;

        case "close":
          widgetContainer.style.display = 'block';
          lightboxContainer.replaceChildren();
          console.log("Lightbox was closed");
          break;
      }
    });
  });

  return (
    <Card sx={{ minWidth: 275, maxWidth: 550, margin: 5}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Example of the Select Bank Widget
        </Typography>
        <div id="widget"></div>
        <div id="lightbox"></div>
      </CardContent>
    </Card>
  );
}
