class MTX {
    constructor() {
        this.outputs = [];
        this.coins = [];
    }

    addOutput = function (script, value) {
        this.outputs.push(Output.fromScript(script, value));
    };

    addCoin = function addCoin(coin) {
        this.coins.push(new Coin(coin));
    };

    fund(coins, options) {
        var i, select, change;

        select = new CoinSelector(this, options).select(coins);

        // Add coins to transaction.
        for (i = 0; i < select.chosen.length; i++)
            this.addCoin(select.chosen[i]);

        // Attempt to subtract fee.
        if (select.shouldSubtract)
            this.subtractFee(select.fee, select.subtractFee);

        // Add a change output.
        change = new Output();
        change.value = select.change;
        change.script.fromAddress(select.changeAddress);

        if (change.isDust(policy.MIN_RELAY)) {
            // Do nothing. Change is added to fee.
            this.changeIndex = -1;
            assert.equal(this.getFee(), select.fee + select.change);
        } else {
            this.outputs.push(change);
            this.changeIndex = this.outputs.length - 1;
            assert.equal(this.getFee(), select.fee);
        }

        return select;
    }

    coinSelector = function (tx, options) {

        this.tx = tx.clone();
        this.coins = [];
        this.outputValue = 0;
        this.index = 0;
        this.chosen = [];
        this.change = 0;
        this.fee = CoinSelector.MIN_FEE;

        this.selection = 'value';
        this.shouldSubtract = false;
        this.subtractFee = null;
        this.height = -1;
        this.depth = -1;
        this.hardFee = -1;
        this.rate = CoinSelector.FEE_RATE;
        this.maxFee = -1;
        this.round = false;
        this.changeAddress = null;

        // Needed for size estimation.
        this.estimate = null;

        if (options)
            this.fromOptions(options);
    }



}
