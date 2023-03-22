export const widget = (data = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustly</title>
  <script src="http://192.168.0.9:8000/start/scripts/pwmb.js?accessId=A48B73F694C4C8EE6306" type="text/javascript"></script>
</head>
<body>
  <div id="widget"></div>
  <script>
    var establishData = ${JSON.stringify(data)};
    var PayWithMyBankOptions = {
      dragAndDrop: false,
      widgetContainerId: "widget",
    };

    PayWithMyBank.selectBankWidget(establishData, PayWithMyBankOptions);
  </script>
</body>
</html>`;
