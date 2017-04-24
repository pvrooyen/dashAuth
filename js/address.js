class Address {

    constructor(options) {

        this.hash = ZERO_HASH160;
        this.type = PUBKEYHASH;
        this.version = -1;
        this.network = 'testnet';

        // Todo
        // if (options)
        //     this.fromOptions(options);
    }

    isPubkeyhash() {
        return this.type === PUBKEYHASH;
    };

    isScripthash() {
        return this.type === SCRIPTHASH;
    };

}