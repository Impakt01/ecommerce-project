

const checkoutBtnPaypal = (val) => {
    var amount = val/710
    const totalAmount = amount.toFixed(2)

    const paypalHiddenClass = document.getElementsByClassName('paypalHidden')[0]
    paypalHiddenClass.classList.remove('paypalHidden')

    paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalAmount.toString()
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(function(orderData) {
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            const transaction = orderData.purchase_units[0].payments.captures[0];

            const element = document.getElementById('paypal-button-container');
            element.innerHTML = '<h3>Thank you for your payment!</h3>';
          });
        }
      }).render('#paypal-button-container')
}