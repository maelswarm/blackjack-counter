# bj-counter

BJ counter is a simple HiLo card tracker built in node.js

## Install

```npm install```

```node main.js```

## Usage

First enter how many decks are in use.
Then enter the cards to remove from the deck.
Each time a card is removed, your terminal will display the stats on each card by number value.

```
1 := Ace, 2 := Two ... 11 := Jack 12 := Queen 13 := King
Please enter a card number to remove it: 12
Remaining: A 22/24 Chance of next draw: 8.76%
||||||||||||||||||||||
Remaining: 2 21/24 Chance of next draw: 8.37%
|||||||||||||||||||||
Remaining: 3 16/24 Chance of next draw: 6.37%
||||||||||||||||
Remaining: 4 16/24 Chance of next draw: 6.37%
||||||||||||||||
Remaining: 5 18/24 Chance of next draw: 7.17%
||||||||||||||||||
Remaining: 6 14/24 Chance of next draw: 5.58%
||||||||||||||
Remaining: 7 22/24 Chance of next draw: 8.76%
||||||||||||||||||||||
Remaining: 8 17/24 Chance of next draw: 6.77%
|||||||||||||||||
Remaining: 9 18/24 Chance of next draw: 7.17%
||||||||||||||||||
Remaining: 10 23/24 Chance of next draw: 9.16%
|||||||||||||||||||||||
Remaining: J 23/24 Chance of next draw: 9.16%
|||||||||||||||||||||||
Remaining: Q 21/24 Chance of next draw: 8.37%
|||||||||||||||||||||
Remaining: K 20/24 Chance of next draw: 7.97%
||||||||||||||||||||
HiLo count:24
|                                -----------------------O       |
```
