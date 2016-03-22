//DECLARING VARIABLES
//===========================
var braintree = require('braintree')

//FUNCTIONS
//===========================

function getToken(req, res){
  
    gateway.clientToken.generate({}, function (err, token){
      if (err) {
        throw err
      } else {
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
      console.log(util.inspect(result))
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