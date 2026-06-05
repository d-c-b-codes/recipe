// modules
import {handleString, multiplyFractions, formatFraction, reduceFraction, fractionToMixedNumber} 
from "./numbers.js"

import { scaleUnits } from "./units.js";

// classes
class exampleClass{ 
    constructor(data, elements, keyElement){
        // actual data
        this.data = data;
        // elements
        this.elements = elements;
        this.firstElement = elements[0];
        this.keyElement = keyElement;
        // bound methods
        let classFunction = this.classFunction.bind(this);
        // event listeners
        this.firstElement.addEventListener('event', classFunction);
    }
    // methods
    classFunction(){
        return
        // do stuff requiring class' info
    }
}

// ------- ------- ------- ------- vars ------- ------- ------- ------- 
let allUnits = [
    'cups', 
    'tsp',
    'TBSP',
    'g',
    'mg',
    'oz',
    'lb',
    'fl oz',
    'dash',
    'sprinkle',
    'pinch',
    'cowboy',

]

// ------- ------- ------- ------- doc elements ------- ------- ------- ------- 
const doc = document;

// ------- ------- ------- ------- input elements ------- ------- ------- ------- 
const input = doc.getElementById('input-element')
const addIngredientButton = doc.getElementById('add-ingredient-btn')
const inputTable = doc.getElementById('input-table')
const recipeTitleInput = doc.getElementById('title-input')
const multiplierInput = doc.getElementById('multiplier')
const clearInputButton = doc.getElementById('clear-input-btn')

// ------- ------- ------- ------- output elements ------- ------- ------- ------- 
const outputTitle = doc.getElementById('output-title')
const outputTable = doc.getElementById('output-table')
const copyButton = doc.getElementById('copy-btn')

// ------- ------- ------- ------- event listeners ------- ------- ------- ------- 
addIngredientButton.addEventListener('click', createInputRow)
recipeTitleInput.addEventListener('input', changeTitle)
multiplierInput.addEventListener('input', changeTitle)
multiplierInput.addEventListener('input', generateOutputRows)
copyButton.addEventListener('click', copyRecipe)
clearInputButton.addEventListener('click', clearInputRows)

// ------- ------- ------- ------- on load ------- ------- ------- ------- 
function onLoad(){

    loadDummyIngredients();
    multiplier.value = '3/4';
    generateOutputRows();
    recipeTitleInput.value = 'spoom';
    changeTitle();
}

function clearInputRows(){
    console.log('clear input button pressed')
    inputTable.innerHTML = '';
    generateOutputRows();
    createInputRow();
}

function loadDummyIngredients(){
    let dummyIngredients = ['butter', 'melted butter', 'cream', 'sugar', 'its so healthy', 'unicorn dreams']
    let dummyNotes = ['sifted', 'room temp', 'chilled', 'chopped', 'diced', 'cowboy']
    let dummyAmounts = ['3/2', 'dash', '7', '8', '5000', '60']
    for (let i = 0; i < 6; i++){
        let row = createInputRow();
        row.children[0].children[0].value = dummyAmounts[i]
        row.children[1].children[0].children[i + 1].selected = true;
        row.children[2].children[0].value = dummyIngredients[i]
        row.children[3].children[0].value = dummyNotes[i]
    }
}

onLoad();
// ------- ------- ------- ------- functions ------- ------- ------- ------- 
function changeTitle(){
    let title = (recipeTitleInput.value == '') ? '[recipe]' : recipeTitleInput.value;
    outputTitle.innerText = `${title} (x${multiplierInput.value} batch)`
}

function copyRecipe(){
    navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([outputTable.outerHTML], {
          type: "text/html"
        }),
        "text/plain": new Blob([outputTable.innerText], {
          type: "text/plain"
        }),
      }),])
}

function generateOutputRows(){
    outputTable.innerHTML = '';
    if (multiplierInput.value != ''){

        for (let row of inputTable.children){
            // console.log(inputTable.chi)
            let outputRow = Object.assign(doc.createElement('tr'), {
                class: 'output-tr'
            }) 
            outputTable.appendChild(outputRow)
            if (outputTable.children.length % 2 == 1){
                outputRow.style.backgroundColor = 'lightgray';
            }

            let oldAmount = row.children[0].children[0].value
            let specialCharacter = handleSpecialCharacters(row, multiplierInput.value)
            oldAmount = row.children[0].children[0].value
            // special characters :)) has to happen before others b/c overwrites some stuff

            let multiplier = handleString(multiplierInput.value)
            let name = row.children[2].children[0].value
            let notes = row.children[3].children[0].value
            let unit = row.children[1].children[0].value
            

            // numbers!
            let amountString = oldAmount;
            let scaledUnits = '';
            // console.log(amountString)
            if (oldAmount != ''){
                amountString = handleString(oldAmount)
                // console.log(amountString)
                let improperFraction =  multiplyFractions(amountString, multiplier);
                let reducedFraction = reduceFraction(improperFraction)
                let mixedNumber = fractionToMixedNumber(reducedFraction)
                scaledUnits = scaleUnits(mixedNumber, unit)
                amountString = `${formatFraction(mixedNumber)} ${unit}`
            }

            let amountInnerHTML = specialCharacter != '' ? `${specialCharacter}` : amountString;
            
            outputRow.appendChild(Object.assign(doc.createElement('td'), {
                innerText: name,
            }))
            outputRow.appendChild(Object.assign(doc.createElement('td'), {
                innerText: notes,
            }))
            outputRow.appendChild(Object.assign(doc.createElement('td'), {
                // innerHTML: `${amountString} ${unit}`,
                innerHTML: amountInnerHTML,
            }))
            outputRow.appendChild(Object.assign(doc.createElement('td'), {
                innerHTML: scaledUnits,
            }))
            /*
            if (scaledUnits){
            }
            */
            // row.children[1].children[0].value = dummyAmounts[i]
            // row.children[2].children[0].children[i + 1].selected = true;
            // console.log(outputRow)
        }
    }
}

function unhandleSpecialCharacters(character, amountInput, unitSelector){
    if (character){
            if (unitSelector.value != character.name){
                let childrenToRemove = []
                for (let opt of unitSelector.children){
                    if (opt.value == character.name){
                        childrenToRemove.push(opt)
                    }
                }
                for (let opt of childrenToRemove){
                    unitSelector.removeChild(opt);
                }
                amountInput.value = '';
                // let option = .filter((opt) => (opt.value == character.name))[0]
            }
            else return '';
        }
}

function handleSpecialCharacters(row, multiplier){
    let castOfCharacters = [
        {name: 'cowboy', emoji: '🤠'},
        {name: 'pinch', emoji: 'Ԅ(≖‿≖ԅ)'},
        {name: 'sprinkle', emoji: '✨'},
        {name: 'dash', emoji: '🏃'},
    ]

    let unit = row.children[1].children[0]
    let amount = row.children[0].children[0]
    let relevantCharacter = castOfCharacters.filter((char) => 
        (
            /*
            // char.name == unit.value 
            // || 
            */
            char.emoji == amount.value 
            || 
            char.name == amount.value ))[0]

    if (relevantCharacter){
        if (relevantCharacter.name == amount.value){
            console.log(relevantCharacter.emoji)
                    
            // set amount to emoji :)
            amount.value = relevantCharacter.emoji

            // set unit to relevant unit 
            for (let opt of unit.children){
                if (opt.value == relevantCharacter.name){
                    opt.selected = true;
                }
            }
        }
        else { // if it's already the emoji
            relevantCharacter.name = unit.value;
        }
        // (otherwise the amount string is the emoji already & we don't have to do all that)

        // send relevant string to output
        return `${multiplier} ${relevantCharacter.name} ${relevantCharacter.emoji}`
    }
    
    /*
    let alreadyFilled = castOfCharacters.filter((char) => (char.emoji == string))[0]
    if (alreadyFilled){
            unhandleSpecialCharacters(alreadyFilled, amountInput, unitSelector);
            return '';
        }

    let relevantCharacter = castOfCharacters.filter((char) => 
        (char.name == string || char.emoji == string))[0]
    
    if (relevantCharacter){
        console.log(relevantCharacter.emoji)
        // set amount to emoji :)
        amountInput.value = relevantCharacter.emoji
        // set unit to amount
        
        let newUnit = Object.assign(doc.createElement('option'), {
            innerText: string,
            value: string,
            selected: true,
        })
        unitSelector.appendChild(newUnit)  
        return `${multiplier} ${relevantCharacter.name} ${relevantCharacter.emoji}`
        
    }
    */
    else { // no match
        return '';
    }
}


function createInputRow(){
    let inputTypes = ['amount', 'unit', 'ingredient', 'notes', 'delete']
    let row = doc.createElement('tr')
    inputTable.appendChild(row)
    for (let type of inputTypes){
        let td = Object.assign(doc.createElement('td'), {
            class: `input-${type}`,

        })
        let element;
        if (type == 'delete'){
            element = Object.assign(doc.createElement('button'), {
            class: `input-delete-btn`,
            innerHTML: `X`,
            })
            element.addEventListener('click', () => {
                inputTable.removeChild(row);
                generateOutputRows();
            })
        }

        else if (type == 'unit'){
            element = createUnitSelector()
        }

        else {
            element = Object.assign(doc.createElement('input'), {
            type: 'text',
            placeholder: type,
            class: `input-${type}`,
        })
        }
        td.appendChild(element);
        element.addEventListener('input', () => {
            generateOutputRows();
            checkForInputRows();
        })
        row.appendChild(td);
    }
    return row;
}

function checkForInputRows(){
    let lastChild = inputTable.lastChild; 
    for (let td of lastChild.children){
        if (td.children[0].value != ''){
            console.log(td.children[0].value)
            createInputRow();
            return;
        }
    }
}

function createUnitSelector(){
    let select = doc.createElement('select')
    select.innerHTML = 'unit';
    // doc.body.appendChild(select)

    let nullOption = Object.assign(doc.createElement('option'), {
        selected: true,
        // disabled: true,
        innerHTML: 'unit',
        value: '',
        }
    )
    select.appendChild(nullOption)
    for (let unit of allUnits){
        let option = Object.assign(doc.createElement('option'), {
            innerHTML: unit,
            value: unit,
        })
        select.append(option)
    }
    return select
}