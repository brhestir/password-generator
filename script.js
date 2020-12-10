// Assignment Code
var generateBtn = document.querySelector("#generate");

// constants
var lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
var uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numberCharset = "0123456789";
var specialCharset = ['\u0020','\u0021','\u0022','\u0023','\u0024','\u0025','\u0026','\u0027','\u0028','\u0029','\u002a','\u002b','\u002c','\u002d','\u002e','\u002f','\u003a','\u003b','\u003c','\u003d','\u003e','\u003f','\u0040','\u005b','\u005c','\u005d','\u005e','\u005f','\u0060','\u007d','\u007d','\u007d','\u007e'].join('');

// specified
var intPwdLenMinInc = 8;
var intPwdLenMaxInc = 64;

// init
var nonZeroOptions = false;
let pwdComplexityParams = new Map();
var intPwdLength = 0;
var pwdGenString = "";
var resultPassword = "";

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword(){
  // re-init
  intPwdLength = 0;
  resultPassword = "";
  pwdGenString = "";
  nonZeroOptions = false;
  pwdComplexityParams = new Map();

  intPwdLength = getPwdLength(intPwdLenMinInc, intPwdLenMaxInc);    // validated
  getPwdComplexityParams();         // populate pwdComplexityParams with choice data
  
  if(nonZeroOptions===true){        // If we have > 0 options to compile
    getPasswordFromGenerator();     // pwgen with selected character-sets
    resultPassword = pwdGenString;  // reuse of interface descriptor
    return resultPassword;          // The password to return;
  }
  else{
    return "No character-set options chosen.\n  Try again with one or more character-sets selected.";
  }
}

// For each char in intPwdLength-long string, randomly choose 1 from set of options
function getPasswordFromGenerator(){
  derefKey = ['l', 'u', 'n', 's'];

  for(i=0, j=Math.floor((Math.random() * 3)); pwdGenString.length<intPwdLength; i++, j=Math.floor((Math.random() * 4))){
    
    if( pwdComplexityParams.get(derefKey[j])===true ){
      switch( derefKey[j] ) {
        case 'l':
          pwdGenString += lowercaseCharset[ Math.floor((Math.random() * (lowercaseCharset.length-1))) ];
          break;
        case 'u':
          pwdGenString += uppercaseCharset[ Math.floor((Math.random() * (uppercaseCharset.length-1))) ];
          break;
        case 'n':
          pwdGenString += numberCharset[ Math.floor((Math.random() * (numberCharset.length-1))) ];
          break;
        case 's':
          pwdGenString += specialCharset[ Math.floor((Math.random() * (specialCharset.length-1))) ];
          break;
      }
    }
  }
}

// Password charset options
function getPwdComplexityParams(){
  if(confirm("Include lowercase characters in password?"))  { pwdComplexityParams.set('l', true), nonZeroOptions = true; };
  if(confirm("Include uppercase characters in password?"))  { pwdComplexityParams.set('u', true), nonZeroOptions = true; };
  if(confirm("Include numeric characters in password?"))    { pwdComplexityParams.set('n', true), nonZeroOptions = true; };
  if(confirm("Include special characters in password?"))    { pwdComplexityParams.set('s', true), nonZeroOptions = true; };
}

// Password length entry
function getPwdLength(minLengthInc, maxLengthInc){
  var result = "0";

  result = prompt("Please enter a number for password length,\nwhere " + minLengthInc + " <= " + " length " + " <= " + maxLengthInc + ".");
  result = parseInt(result);

  if(( (minLengthInc<=result) && (result<=maxLengthInc) )){
    return result;  // return the in-bounds integer
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);