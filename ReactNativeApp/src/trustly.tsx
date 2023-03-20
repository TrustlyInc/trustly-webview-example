export const widget = (data = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustly</title>
  <script src="https://sandbox.paywithmybank.com/start/scripts/pwmb.js?accessId=A48B73F694C4C8EE6306" type="text/javascript"></script>
</head>
<body>
  <div id="widget"></div>
  <script>
    var establishData = ${JSON.stringify(data)};
    var PayWithMyBankOptions = {
      dragAndDrop: false,
      widgetContainerId: "widget",
    };
    var widgetCallback = function (data) {
      var fragment = encodeURIComponent(JSON.stringify(data));
      window.location.href = "https://www.acme.com/select-bank-widget#" + fragment;
      return false;
    };
    PayWithMyBank.selectBankWidget(establishData, PayWithMyBankOptions, widgetCallback);
  </script>
</body>
</html>`;

export const establish = (data = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustly</title>
  <script src="https://sandbox.paywithmybank.com/start/scripts/pwmb.js?accessId=A48B73F694C4C8EE6306" type="text/javascript"></script>
</head>
<body>
  <script>
    var establishData = ${JSON.stringify(data)};
    var PayWithMyBankOptions = {
      dragAndDrop: false
    };
    PayWithMyBank.establish(establishData, PayWithMyBankOptions);
  </script>
</body>
</html>`;