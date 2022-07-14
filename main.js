"use strict";
import Converter from './converter.js';


function getInputValue() {
    const inputElem = document.getElementById('inputElem');
    return inputElem.value;
}

function printResults(e) {
    e.preventDefault();
    let numberParag = document.getElementById("inputNum");
    let inputFormatParag = document.getElementById("formatNum");
    let binarParag = document.getElementById("binarNum");
    let hexaOrDecimalParag = document.getElementById("hexaOrDecimalNum");
    let errorParag = document.getElementById("errorParag");
    
    let inputV = getInputValue();
    let converter = new Converter(inputV);
    converter.convert();

    numberParag.innerHTML = converter.inputValue;
    binarParag.innerHTML = converter.binaryValue;
    
    if(converter.errorMsg){
    errorParag.innerHTML = converter.errorMsg;
    errorParag.style.color = 'red';
    
        setTimeout(function() {
            errorParag.style.display = 'none';
        }, 2000);
    }  
    if (converter.inputFormat == converter.FORMAT_DEC) {
        
        inputFormatParag.innerHTML = '(has decimal format)';
        hexaOrDecimalParag.innerHTML = 'hexadecimal is ' + converter.convertedValue;
    } else if (converter.inputFormat == converter.FORMAT_HEX) {
        inputFormatParag.innerHTML = '(has hexadecimal format)';
        hexaOrDecimalParag.innerHTML = 'decimal is ' + converter.convertedValue;
    };
    }
    

function run() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', printResults);
}
run();
