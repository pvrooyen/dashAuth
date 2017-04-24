class Script {
    constructor() {
        this.raw = {};
        code = [];
    }

    fromPubkeyhash(hash) {
        this.raw = new Buffer(23);
        this.raw[0] = opcodes.OP_DUP;
        this.raw[1] = opcodes.OP_HASH160;
        this.raw[2] = 0x14;
        hash.copy(this.raw, 3);
        this.raw[23] = opcodes.OP_EQUALVERIFY;
        this.raw[24] = opcodes.OP_CHECKSIG;

        this.code.push(new Opcode(opcodes.OP_DUP));
        this.code.push(new Opcode(opcodes.OP_HASH160));
        this.code.push(new Opcode(0x14, this.raw.slice(3, 23)));
        this.code.push(new Opcode(opcodes.OP_EQUALVERIFY));
        this.code.push(new Opcode(opcodes.OP_CHECKSIG));
    };

    fromScripthash(hash) {
        this.raw = new Buffer(23);
        this.raw[0] = opcodes.OP_HASH160;
        this.raw[1] = 0x14;
        hash.copy(this.raw, 2);
        this.raw[22] = opcodes.OP_EQUAL;

        this.code.push(new Opcode(opcodes.OP_HASH160));
        this.code.push(new Opcode(0x14, this.raw.slice(2, 22)));
        this.code.push(new Opcode(opcodes.OP_EQUAL));
    };

    fromAddress(address) {

        if (address.isPubkeyhash())
            return this.fromPubkeyhash(address.hash);

        if (address.isScripthash())
            return this.fromScripthash(address.hash);
    };
}