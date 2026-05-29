import { numberIsMixed, numberIsFraction, formatFraction } from "./numbers.js"
export{scaleUnits}
// ------- ------- ------- ------- hee wee ------- ------- ------- ------- 

// 3 tsp = 1TBSP
// 16 TBSP = 1 cup

/*
let allUnits = [
    'cups', 
    'tsp',
    'TBSP',
    'g',
    'mg',
    'oz',
    'fl oz',
]
*/

let units = [
    {name: 'tsp',
        next: 'TBSP',
        multiple: 3,
    },
    {name: 'TBSP',
        next: 'cups',
        multiple: 16,
    },
    {name: 'mg',
        next: 'g',
        multiple: 1000,
    },
]
// 

function scaleUnits(number, unitString){
    let unitObj = units.filter((unit) => (unitString == unit.name))[0]
    let relevantObjFound
    if (unitObj){
        if (numberIsMixed(number) || !numberIsFraction(number)){
            let relevantWholeNumber;
            if (numberIsMixed(number)){
                relevantWholeNumber = number.wholeNumber
            }
            else if (!numberIsFraction(number)){
                relevantWholeNumber = number
            }
            // console.log(relevantWholeNumber)
            if (relevantWholeNumber > unitObj.multiple){
                // console.log(`${relevantWholeNumber} > ${unitObj.multiple}! need to scale!!`)
                let newUnitAmount = Math.floor(relevantWholeNumber / unitObj.multiple)
                
                let wholeNumberRemainder = 
                (relevantWholeNumber % unitObj.multiple != 0) ? ` ${relevantWholeNumber % unitObj.multiple}` : ''
                
                let fractionRemainder;
                if (numberIsMixed(number)){
                    fractionRemainder = ` ${formatFraction({num: number.num, denom: number.denom})}`
                }

                else if (!numberIsFraction(number)){
                    // wholeNumberRemainder = relevantWholeNumber % unitObj.multiple
                    fractionRemainder = '';
                }
                if (fractionRemainder == '' && wholeNumberRemainder == ''){
                    // console.log('no remainder!')
                    unitString = '';
                }

                // console.log(`${newUnitAmount} ${unitObj.next}${wholeNumberRemainder}${fractionRemainder} ${unitString}`)
                return (`${newUnitAmount} ${unitObj.next}${wholeNumberRemainder}${fractionRemainder} ${unitString}`)
            }
        }
    }
    return ''
    // console.log(unitObj, relevantObjFound);
}