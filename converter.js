export default class Converter{


FORMAT_HEX = 1;
FORMAT_DEC = 2;
FORMAT_INVALID = 0; 

constructor(inputValue){
    this.inputValue = inputValue;
};

containsOnlyNumbers(inputValue) {
    let pattern = /^[0-9]*$/;
    return pattern.test(inputValue);
}



convertToBinary(inputValue) {
    let result;

    for (let i = 0, r = ""; i < inputValue.length; i++) {
        let chr = inputValue.substr(i, 1).toLowerCase();
        switch (chr) {
            case '0':
                r += "0000";
                break;
            case '1':
                r += "0001";
                break;
            case '2':
                r += "0010";
                break;
            case '3':
                r += "0011";
                break;
            case '4':
                r += "0100";
                break;
            case '5':
                r += "0101";
                break;
            case '6':
                r += "0110";
                break;
            case '7':
                r += "0111";
                break;
            case '8':
                r += "1000";
                break;
            case '9':
                r += "1001";
                break;
            case 'a':
                r += "1010";
                break;
            case 'b':
                r += "1011";
                break;
            case 'c':
                r += "1100";
                break;
            case 'd':
                r += "1101";
                break;
            case 'e':
                r += "1110";
                break;
            case 'f':
                r += "1111";
                break;
        }

        if (i==inputValue.length-1) {
            result = r;
        }
     
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
            arr[j] = arr[j].toString(16).toUpperCase();
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
    console.log(re3);
    
    let inputWithoutOnePrefix = inputValue.replace(re, "");
    result1 = inputWithoutOnePrefix.replace(re2, "");
    result = result1.replace(re3, "");
    return result;
}

convertToDecimal(inputValue) {
    let result=0;
    let digit;
    let numOfDigits;
    numOfDigits = inputValue.length;
    for (let i = 0; i < numOfDigits; i++) {

        let chr = inputValue.substr(i, 1).toUpperCase();
        switch (chr) {
            case "A":
                digit = 10;
                break;
            case "B":
                digit = 11;
                break;
            case "C":
                digit = 12;
                break;
            case "D":
                digit = 13;
                break;
            case "E":
                digit = 14;
                break
            case 'F':
                digit = 15;
                break;
            default:
                digit = Number(chr);

        }
        
        result = result + digit * Math.pow(16, numOfDigits - 1 - i);

    }
    return result;
}

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
