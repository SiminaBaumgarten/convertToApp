"use strict";
import Converter from './converter.js';

const FORMAT_HEX = 1;
const FORMAT_DEC = 2;
let inputFormat;
//const FORMAT_INVALID = 0;


function removeHexSignature(inputValue) {
    let result = '';
    let result1 = '';
    let re = /^([0X]|[0X]|[#])/;
    let re2 = /^([x]|[X])/;
    let re3 = /h$/i;
    
    let inputWithoutOnePrefix = inputValue.replace(re, "");
    result1 = inputWithoutOnePrefix.replace(re2, "");
    result = result1.replace(re3, "");
    return result;
}


function containsOnlyNumbers(inputValue) {
    let pattern = /^[0-9]*$/;
    return pattern.test(inputValue);
}

function detectInputFormat(inputValue) {
    let result = "";
    if (containsOnlyNumbers(inputValue)) {
        result = FORMAT_DEC;
    } else {
        result = FORMAT_HEX;
    }

    return result;
}

function validateInput(inputValue) {
    let result = true;
    let pattern = /^#*([a-f]|[A-F]|[0-9]|[0x]|[0X]|[hH])*$/;
    if (pattern.test(inputValue)) {
        result = true;
    } else {
        result = false;
    }
    //check if input contains non-hexa & non-numeric characters and chars is one of the #, x, h.
    return result;
}

function convert(inputValue) {
    let inputFormat;
    let convertedValue;
    let binaryValue;
    let inputIsValid;
    inputIsValid= validateInput(inputValue);
    
    let converter = new Converter(-1);
    //todo: use base inside convertor
    if (inputIsValid) {
    
        inputFormat = detectInputFormat(inputValue);
        if (inputFormat == FORMAT_HEX) {
            inputValue = removeHexSignature(inputValue);
            convertedValue = converter.convertToDecimal(inputValue);
        } else if (inputFormat == FORMAT_DEC) {
            convertedValue = converter.convertToHexa(inputValue);
        } else {
            errorMsg = "Unkown Input Format";
        }
        
        binaryValue = converter.convertToBinary(inputValue);
            
       
    } else {
        errorMsg = "Invalid input";
    } 
    let results = {
        convertedValue: convertedValue,
        binaryValue: binaryValue,
        inputFormat: inputFormat,
        errorMsg: errorMsg
    }
    return results;
    //printResults(inputValue, convertedValue, binaryValue, inputFormat, errorMsg); 
}

function getInputValue() {
    const inputElem = document.getElementById('inputElem');
    return inputElem.value;
}



function printResults(e) {
    e.preventDefault();
    let inputValue = getInputValue();
    let convertedResult = convert(inputValue);
   
    let numberParag = document.getElementById("inputNum");
    let inputFormatParag = document.getElementById("formatNum");
    let binarParag = document.getElementById("binarNum");
    let hexaOrDecimalParag = document.getElementById("hexaOrDecimalNum");
    let errorParag = document.getElementById("errorParag");
    

    numberParag.innerHTML = inputValue;
    binarParag.innerHTML = convertedResult.binaryValue;
    
    if(convertedResult.errorMsg){
    errorParag.innerHTML = convertedResult.errorMsg;
    errorParag.style.color = 'red';
    
        setTimeout(function() {
            errorParag.style.display = 'none';
        }, 2000);
    }  
    if (convertedResult.inputFormat == FORMAT_DEC) {
        inputFormatParag.innerHTML = '(has decimal format)';
        hexaOrDecimalParag.innerHTML = 'hexadecimal is ' + convertedResult.convertedValue;
    } else if (convertedResult.inputFormat == FORMAT_HEX) {
        inputFormatParag.innerHTML = '(has hexadecimal format)';
        hexaOrDecimalParag.innerHTML = 'decimal is ' + convertedResult.convertedValue;
    };
    }
    
  
function run() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', printResults);
}
run();


