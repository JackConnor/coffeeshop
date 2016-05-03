//DECLARING VARIABLES
//===========================
var braintree = require('braintree')
var Dev = require( '../.Dev.js' )
console.log(Dev.merchantId);

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: Dev.merchantId,
  publicKey: Dev.publicKey,
  privateKey: Dev.privateKey
});
//FUNCTIONS
//===========================

function getToken(req, res){

    gateway.clientToken.generate({}, function (err, token){
      if (err) {
        console.log(err);
        throw err
      } else {
        console.log(token);
        res.json({ "client_token": token.clientToken})
      }
    })

}

function processSale(req, res){

  var transaction = req.body
  gateway.transaction.sale({
    amount: transaction.amount,
    paymentMethodNonce: transaction.payment_method_nonce
  }, function(err, result){
    if (err) {
      throw err
    } else {

      res.json(result)
    }
  })

}



//EXPORTS
//===========================
module.exports = {
  getToken : getToken,
  processSale: processSale
  }
