//Utility obj
var obj = {}

obj.sortAge(a, b) {
  a = a.height === -1 ? 0x7fffffff : a.height;
  b = b.height === -1 ? 0x7fffffff : b.height;
  return a - b;
}

obj.init = function init(coins) {
    this.coins = coins.slice();
    this.outputValue = this.tx.getOutputValue();
    this.index = 0;
    this.chosen = [];
    this.change = 0;
    this.fee = CoinSelector.MIN_FEE;
    this.tx.inputs.length = 0;


    this.coins.sort(sortAge);
}


obj.selectCoins = function (coins) {
    this.init(coins);

    if (this.hardFee !== -1) {
        this.selectHard();
    } else {
        // This is potentially asynchronous:
        // it may invoke the size estimator
        // required for redeem scripts (we
        // may be calling out to a wallet
        // or something similar).
        yield this.selectEstimate();
    }

    if (!this.isFull()) {
        // Still failing to get enough funds.
        throw new FundingError(
            'Not enough funds.',
            this.tx.getInputValue(),
            this.total());
    }

    // How much money is left after filling outputs.
    this.change = this.tx.getInputValue() - this.total();

    return this;
}