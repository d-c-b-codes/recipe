export{
    handleString, multiplyFractions, formatFraction, reduceFraction, fractionToMixedNumber, // to script
    numberIsFraction, numberIsMixed, // to units
}

// ------- ------- ------- ------- STRINGS ------- ------- ------- ------- 

// turn string into number, either [2, 4] or 2.5
function handleString(string){
    if (stringIsFraction(string)){
                return splitFraction(string)
        }
        else{
            return parseFloat(string)
        }
}

// check if the string is a fraction
function stringIsFraction(string){
    if (string.includes('/')){ return true}
    else {return false}
}

// format fraction nicely as m/n with superscript & subscript
function formatFraction(number){
    if (numberIsMixed(number)){
        return `${number.wholeNumber} <sup>${number.num}</sup>/<sub>${number.denom}</sub>`
    }
    if (numberIsFraction(number)){
        return `<sup>${number.num}</sup>/<sub>${number.denom}</sub>`
    }
    else return number
}
// ------- ------- ------- ------- FRACTIONS ------- ------- ------- ------- 

// split fraction into object, i.e. {num: 2, denom: 5}
function splitFraction(string){
    if (string.includes('/')){
        return {num: parseFloat(string.split('/')[0]), denom: parseFloat(string.split('/')[1])}
    }
    else {
        console.error(`not a fraction!!`)
    }
}

// check if number is a fraction
function numberIsFraction(number){
    if (number.num) {
        // console.log(`${number} is fraction`)
        return true
    }
    else {return false}
}

function numberIsMixed(number){
    if (number.wholeNumber) {
        // console.log(`${number} has whole #`)
        return true
    }
    else {return false}
}

function reduceFraction(number){
    if (numberIsFraction(number)){
        let gcd = function gcd(a, b){
            return b ? gcd(b, a%b) : a;
        }
        gcd = gcd(number.num, number.denom);
        if (number.denom / gcd == 1){
            return number.num / gcd;
        }
        else {
            return {num: number.num / gcd, denom: number.denom / gcd}
        }
    }
    else {return number}
    
}

/*
// from stack overflow lol hee wee
function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}
*/

function multiplyFractions(a, b){

    // a is a fraction
    if (numberIsFraction(a)){
        if (numberIsFraction(b)){ // a/m * b/n
            // multiply fractions
            return {num: a.num * b.num, denom: a.denom * b.denom}

        }
        else { // a/m * b
            return {num: a.num * b, denom: a.denom}
        }
    }
    else {
        if (numberIsFraction(b)){ // a * b/m
            return {num: a * b.num, denom: b.denom}
        }
        else { // a * b
            return `${a * b}`
        }
    }
}

function fractionToMixedNumber(number){
let mixedNumber = number;
    if (numberIsFraction(number)){
        if (number.num > number.denom){
            // console.log(`${number.num} > ${number.denom}`)
            mixedNumber.wholeNumber = Math.floor(number.num / number.denom)
            mixedNumber.num = number.num % number.denom
            // mixedNumber.denom = number.denom // unnecessary because number already has same denom?
        }
    }
    return mixedNumber;
}