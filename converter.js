"use strict";
export default class Converter{


FORMAT_HEX = 1;
FORMAT_DEC = 2;
FORMAT_INVALID = 0;
BIN_DICTIONARY = { 
    '0': "0000",
    '1': "0001",
    '2': "0010",
    '3': "0011",
    '4': "0100",
    '5': "0101",
    '6': "0110",
    '7': "0111",
    '8': "1000",
    '9': "1001",
    'a': "1010",
    'b': "1011",
    'c': "1100",
    'd': "1101",
    'e': "1110",
    'f': "1111"
};
HEXA_DICTIONARY = {
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
};

TO_HEXA_DICTIONARY = {
    10 : 'A' ,
    11 : 'B',
    12 : 'C',
    '13' : 'D',
    14 :'E',
    '15' : 'F',
};

constructor(inputValue){
    this.inputValue = inputValue;
};

containsOnlyNumbers(inputValue) {
    let pattern = /^[0-9]*$/;
    return pattern.test(inputValue);
}



convertToBinary(inputValue) {
    let result = "";
    
    for (let i = 0; i < inputValue.length; i++) {
        let chr = inputValue[i].toLowerCase();
        result += this.BIN_DICTIONARY[chr];
     
    }
  
    return result;
}

convertToHexa(inputValue) {
    let result;

    let arr = [];
    let i = inputValue;
    do {
        arr.push(i % 16);
        i = (i - i % 16) / 16;
    }
    while (i > 0);
   
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] > 9) {
            arr[j] = this.TO_HEXA_DICTIONARY[arr[j]];
            //arr[j] = arr[j].toString(16).toUpperCase();
        } else {
            arr[j] = arr[j];
        }
    }
    arr.reverse();
    result = "";
    result = arr.join("");
    return result;
}

removeHexSignature(inputValue) {
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

convertToDecimal(inputValue) {
    let result=0;
    let numOfDigits;
    numOfDigits = inputValue.length;
    for (let i = 0; i < numOfDigits; i++) {
        let chr = inputValue[i].toUpperCase();
        let re = /[abcdef]/i;
        if(re.test(inputValue[i])){
            chr = this.HEXA_DICTIONARY[chr];
        }else{
            chr = chr;
        }
        result = Number(result) + Number(chr) * Math.pow(16, numOfDigits - 1 - i);
        };
        return result;
    };


detectInputFormat(inputValue) {
    let result = "";
    if (this.containsOnlyNumbers(inputValue)) {
        result = this.FORMAT_DEC;
    } else {
        result = this.FORMAT_HEX;
    }

    return result;
}

validateInput(inputValue) {
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

convert() {
  
    
    let inputIsValid = this.validateInput(this.inputValue);

    if (inputIsValid) {
        this.inputFormat = this.detectInputFormat(this.inputValue);
        if (this.inputFormat == this.FORMAT_HEX) {
            this.inputValue = this.removeHexSignature(this.inputValue);
            this.convertedValue = this.convertToDecimal(this.inputValue);
        } else if (this.inputFormat == this.FORMAT_DEC) {
            this.convertedValue = this.convertToHexa(this.inputValue);
        } else {
            this.errorMsg = "Unkown Input Format";
        }
        
        this.binaryValue = this.convertToBinary(this.inputValue, this.inputFormat);
            
       
    } else {
        this.errorMsg = "Invalid input";
    }  
}

}
