'use strict';

class AuthenticationTransaction {

  constructor(utxos, toAddress, amountInDuffs) {
    this.network = 'testnet';
    this.inputs = this.getInputs(utxos);
    this.changeAddress = utxos[0].address;
    this.identityOutput = getIdentityOutput(toAddress, amountInDuffs);
    this.feeSatoshisPerKb = 0.0001; //pvr: get from config
  };

  getInputs(utxos) {
    return utxos.data.map(utxo => {
      return {
        height: 0, //pvr todo
        version: 0,
        coinbase: false,
        value: utxo.amount,
        script: '', //pvr todo
        hash: '', //pvr todo
        index: utxo.vout
      };
    });
  }

  getIdentityOutput(addressString, amount) {
    new Output({
      address: new Address(addr),
      value: amount
    })
  }

  sign(keyring) {

    var mtx = new MTX(address, duffs)

    mtx.fund(


    );

    mtx.sign(new Keyring());

    //Others ouputs
  }

  toRaw() {
    return this.mtx.toTX().toRaw()
  }

  fromOptions(script) {
    assert(options, 'Script data is required.');

    if (Buffer.isBuffer(options))
      return this.fromRaw(options);

    if (Array.isArray(options))
      return this.fromArray(options);

    if (options.raw) {
      if (!options.code)
        return this.fromRaw(options.raw);
      assert(Buffer.isBuffer(options.raw), 'Raw must be a Buffer.');
      this.raw = options.raw;
    }

    if (options.code) {
      if (!options.raw)
        return this.fromCode(options.code);
      assert(Array.isArray(options.code), 'Code must be an array.');
      this.code = options.code;
    }

    return this;
  };

}

module.exports = AuthenticationTransaction;