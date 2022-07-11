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
    let convertedNumber = new Converter(inputV);
    convertedNumber.convert();

    numberParag.innerHTML = convertedNumber.inputValue;
    binarParag.innerHTML = convertedNumber.binaryValue;
    
    if(convertedNumber.errorMsg){
    errorParag.innerHTML = convertedNumber.errorMsg;
    errorParag.style.color = 'red';
    
        setTimeout(function() {
            errorParag.style.display = 'none';
        }, 2000);
    }  
    if (convertedNumber.inputFormat == convertedNumber.FORMAT_DEC) {
        
        inputFormatParag.innerHTML = '(has decimal format)';
        hexaOrDecimalParag.innerHTML = 'hexadecimal is ' + convertedNumber.convertedValue;
    } else if (convertedNumber.inputFormat == convertedNumber.FORMAT_HEX) {
        inputFormatParag.innerHTML = '(has hexadecimal format)';
        hexaOrDecimalParag.innerHTML = 'decimal is ' + convertedNumber.convertedValue;
    };
    }
    

function run() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', printResults);
}
run();
