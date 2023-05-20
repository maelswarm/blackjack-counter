const Big = require('big.js');

let count = 0;
let DECK_COUNT = -1

class BigDecimal {
    constructor(value) {
        let [ints, decis] = String(value).split(".").concat("");
        decis = decis.padEnd(BigDecimal.decimals, "0");
        this.bigint = BigInt(ints + decis);
    }
    static fromBigInt(bigint) {
        return Object.assign(Object.create(BigDecimal.prototype), { bigint });
    }
    divide(divisor) {
        return BigDecimal.fromBigInt(this.bigint * BigInt("1" + "0".repeat(BigDecimal.decimals)) / divisor.bigint);
    }
    toString() {
        const s = this.bigint.toString().padStart(BigDecimal.decimals + 1, "0");
        return s.slice(0, -BigDecimal.decimals) + "." + s.slice(-BigDecimal.decimals)
            .replace(/\.?0+$/, "");
    }
}
BigDecimal.decimals = 18;

let cards_count_length = 13;
let cards_count = [];


let TOTAL_CARDS = DECK_COUNT * 13 * 4;
let DRAWN_CARDS = 0;

const f = (i) => {
    let i1 = BigInt(i);
    let i2 = BigInt(i);
    if (i2 <= 0) {
        return 1n;
    }
    while (i2 > 1n) {
        --i2;
        i1 *= i2;
    }
    return i1;
}

const calc_draw_chance = (idx) => {

    let N = TOTAL_CARDS - DRAWN_CARDS;
    let k = cards_count[idx];
    let n = 1;
    let x = 1;
    let a1 = (new Big(f(k))).div((new Big(f(x)).times(f(k - x)))).times(new Big(f(N - k))).div((new Big(f((N - k) - (n - x))).times(f(n - x))));
    let a2 = (new Big(f(N))).div((new Big(f(n)).times(f(N - n))));
    return a1.div(a2);
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
    console.log("Welcome to BlackJack counter.");
    process.stdout.write("Please enter ahow many decks are in the shoe: ");
    process.stdin.on('data', function (input) {

        let i1 = parseInt(input.toString().trim());
        if (!(i1 > 0 && i1 < 14)) {
            return;
        }

        if (DECK_COUNT === -1) {
            DECK_COUNT = Number(i1);
            for (let i = 0; i < cards_count_length; ++i) {
                cards_count.push(4 * DECK_COUNT);
            }
            TOTAL_CARDS = DECK_COUNT * 13 * 4;
            console.log("1 := Ace, 2 := Two ... 11 := Jack 12 := Queen 13 := King");
            process.stdout.write("Please enter a card number to remove it: ");
        } else {
            if (cards_count[i1 - 1] < 1) {
                return;
            }
            --cards_count[i1 - 1];
            ++DRAWN_CARDS;
            for (let i = 0; i < cards_count_length; ++i) {
                let f1 = calc_draw_chance(i);
                process.stdout.write("Remaining: " + (i + 1) + ' ' + cards_count[i] + '/' + 4 * DECK_COUNT + ' Chance of next draw: ' + (f1 * 100).toFixed(2) + "%\n");
                for (let z = 0; z < cards_count[i]; ++z) {
                    process.stdout.write("|");
                }
                process.stdout.write("\n");
            }
            calcCount(i1);
            console.log("HiLo count:" + count);
            console.log("1 := Ace, 2 := Two ... 11 := Jack 12 := Queen 13 := King");
            process.stdout.write("Please enter a card number to remove it: ");
        }
    });
}

main();