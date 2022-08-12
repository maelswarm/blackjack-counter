const Big = require('big.js');

let count = 0;

class BigDecimal {
    constructor(value) {
        let [ints, decis] = String(value).split(".").concat("");
        decis = decis.padEnd(BigDecimal.decimals, "0");
        this.bigint = BigInt(ints + decis);
    }
    static fromBigInt(bigint) {
        return Object.assign(Object.create(BigDecimal.prototype), { bigint });
    }
    divide(divisor) { // You would need to provide methods for other operations
        return BigDecimal.fromBigInt(this.bigint * BigInt("1" + "0".repeat(BigDecimal.decimals)) / divisor.bigint);
    }
    toString() {
        const s = this.bigint.toString().padStart(BigDecimal.decimals + 1, "0");
        return s.slice(0, -BigDecimal.decimals) + "." + s.slice(-BigDecimal.decimals)
            .replace(/\.?0+$/, "");
    }
}
BigDecimal.decimals = 18;

const DEFS = {
    ACE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    DECK_COUNT: 8
};

let cards_count_length = 13;
let cards_count = [];
for (let i = 0; i < cards_count_length; ++i) {
    cards_count.push(4 * DEFS.DECK_COUNT);
}

let TOTAL_CARDS = DEFS.DECK_COUNT * 13 * 4;
let DRAWN_CARDS = 0;

const ftl = (i) => {
    let i1 = BigInt(i);
    let i2 = BigInt(i);
    if (i2 <= 0) {
        return 1n;
    }
    while (i2 > 1n) {
        i1 *= i2;
        --i2;
        //printf("%d\n", i1);
    }
    return i1;
}

const calc_draw_chance = (idx) => {

    let N = TOTAL_CARDS - DRAWN_CARDS;
    let K = cards_count[idx];
    let n = 1;
    let k = 1;
    //console.log((ftl(K) + ftl(N - K) + ftl(n) + ftl(N - n)).toString(), (ftl(N) + ftl(k) + ftl(K - k) + ftl(n - k) + ftl(N - K - n + k)).toString());
    let p1 = new Big((ftl(K) * ftl(N - K) * ftl(n) * ftl(N - n)).toString())
    let p2 = new Big((ftl(N) * ftl(k) * ftl(K - k) * ftl(n - k) * ftl(N - K - n + k)).toString());
    return p1.div(p2);
}

const calcCount = (i1) => {
    if (i1 > 9 || i1 === 1) {
        --count;
    } else if (i1 > 1 && i1 < 7) {
        ++count
    }
}

function main() {
    let i1;

    process.stdin.on('data', function (input) {
        let i1 = parseInt(input.toString().trim());
        if (!(i1 > 0 && i1 < 14)) {
            return;
        }
        if(cards_count[i1 - 1] < 1) {
            return;
        }
        --cards_count[i1 - 1];
        ++DRAWN_CARDS;
        for (let i = 0; i < cards_count_length; ++i) {
            let f1 = calc_draw_chance(i);
            process.stdout.write(i + 1 + ':' + cards_count[i] + '/' + 4 * DEFS.DECK_COUNT + ' ' + f1.toString() + "\n");
            for (let z = 0; z < cards_count[i]; ++z) {
                process.stdout.write("|");
            }
            process.stdout.write("\n");
        }
        calcCount(i1);
        console.log("count:" + count);
    });
}

main();