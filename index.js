var https = require('https');
var AuthenticationTransaction = require('./js/authenticationTransaction.js')

publishAuthHead = function () {

  //Get utxo and sign
  https.get({
    host: 'test.insight.dash.siampm.com',
    path: '/api/addr/yhjXYF2V8xkzQeQheUXLPQMDWrmwTuZHJH/utxo'
  },
    function (utxos) {
      var authTx = new AuthenticationTransaction(utxos, '', '').sign('keyring');

      //Broadcast
      http.post('https://test.insight.dash.siampm.com/api/broadcast', auth.toRaw().toString('hex'))
        .success(function (response) {
          return true;
        })
      //todo fail

    });
};

(init = function () {

  return publishAuthHead();

})()


