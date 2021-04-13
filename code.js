// Konta w X różnych bankach, żeby zarabiać na oprocentowaniu z lokaty
// Na każdym koncie z początku mam 15 000
// Każdy bank ma cykl kapitalizacji odsetek co L sekund
// W każdym banku jest cykl zmian oprocentowań lokat(po kapitalizacji odsetek)
// Każdy bank pobiera L2% prowizji (od kwoty przelewu) za przelew do innego banku
// Algorytm, który będzie przelewał pieniądze między lokatami aby zarobić jak najwięcej

// Co minutę informacja o stanie moich środków we wszystkich bankach, oraz mój całościowy kapitał

const X1 = {
    money: 15000,
    L: Math.floor(Math.random() * (11 - 5)) + 5,
    L2: Math.floor(Math.random() * (16 - 1)) + 1,
    Int: 0,
}
const X2 = {
    money: 15000,
    L: Math.floor(Math.random() * (11 - 5)) + 5,
    L2: Math.floor(Math.random() * (16 - 1)) + 1,
    Int: 0,
}
const X3 = {
    money: 15000,
    L: Math.floor(Math.random() * (11 - 5)) + 5,
    L2: Math.floor(Math.random() * (16 - 1)) + 1,
    Int: 0,
}
let allMoney = (X1.money + X2.money + X3.money)

const checkingRate = () => {
    let x1Way = Math.floor((((X1.money + X2.money + X3.money) + ((X1.money + X2.money + X3.money) * X1.Int * 0.01)) - (X1.L2 * (X1.money + X2.money + X3.money) * 0.01))/X1.L);
    let x2Way = Math.floor((((X1.money + X2.money + X3.money) + ((X1.money + X2.money + X3.money) * X2.Int * 0.01)) - (X2.L2 * (X1.money + X2.money + X3.money) * 0.01))/X2.L);
    let x3Way = Math.floor((((X1.money + X2.money + X3.money) + ((X1.money + X2.money + X3.money) * X3.Int * 0.01)) - (X3.L2 * (X1.money + X2.money + X3.money) * 0.01))/X3.L);
    let bestWay = Math.max(x1Way, x2Way, x3Way);
    console.log(x1Way);
    console.log(x2Way);
    console.log(x3Way);
    console.log(`Kapitalizacja banku X1 = ${X1.Int}`);
    console.log(`Kapitalizacja banku X2 = ${X2.Int}`);
    console.log(`Kapitalizacja banku X3 = ${X3.Int}`);

    if(bestWay == x1Way){
        X1.money = (X1.money + X2.money + X3.money) + x1Way - X1.L2;
        X2.money = 0;
        X3.money = 0;
        console.log(`Wybrano bank 1: ${x1Way}`);
    } else if (bestWay == x2Way){
        X2.money = (X1.money + X2.money + X3.money) + x2Way - X2.L2;
        X1.money = 0;
        X3.money = 0;
        console.log(`Wybrano bank 2: ${x2Way}`);
    } else {
        X3.money = (X1.money + X2.money + X3.money) + x3Way - X3.L2;
        X1.money = 0;
        X2.money = 0;
        console.log(`Wybrano bank 3: ${x3Way}`);
    }
}

function X1capitalizacion() {
    X1.Int = Math.floor(Math.random() * (100 - 1)) + 1;
    if(X1.money != 0){
        console.log(`x1 capitalizacion ${X1.money}`);
        checkingRate();
    }
}
function X2capitalizacion() {
    X2.Int = Math.floor(Math.random() * (100 - 1)) + 1;
    if(X2.money != 0){
        console.log(`x2 capitalizacion ${X2.money}`);
        checkingRate();
    }
}
function X3capitalizacion() {
    X3.Int = Math.floor(Math.random() * (100 - 1)) + 1;
    if(X3.money != 0){
        console.log(`x3 capitalizacion ${X3.money}`);
        checkingRate();
    }
}

function checkingAccountBalance () {
    console.log(`Balans twojego konta wynosi: 
    - Bank 1 - ${X1.money},
    - Bank 2 - ${X2.money},
    - Bank 3 - ${X3.money}
    Łączna suma wynosi = ${(X1.money + X2.money + X3.money)}`);
}
checkingRate();
setInterval(X1capitalizacion, X1.L*1000)
setInterval(X2capitalizacion, X2.L*1000)
setInterval(X3capitalizacion, X3.L*1000)
setInterval(checkingAccountBalance, 2000)
