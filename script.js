const passwordDisplay=document.getElementById("passwordDisplay");
const passwordLength=document.getElementById("passwordLength");
const lengthValueSpan=document.getElementById("lengthValue");
const includeUppercase=document.getElementById("includeUppercase");
const includeLowercase=document.getElementById("includeLowercase");
const includeNumbers=document.getElementById("includeNumbers");
const includeSymbols=document.getElementById("includeSymbols");
const generateButton=document.getElementById("generateButton");
const copyButton=document.getElementById("copyButton");
const messageBox=document.getElementById("messageBox");

const uppercaseChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars="abcdefghijklmnopqrstuvwxyz";
const numberChars="0123456789";
const symbolChars="!@#$%^&*()_+[]{}|;:,.<>?";

passwordLength.addEventListener("input", ()=>{
    lengthValueSpan.textContent=passwordLength.value
});

function generatePassword(){
    let characters="";
    let generatedPassword="";
    const length=parseInt(passwordLength.value);

    if(includeUppercase.checked) characters+=uppercaseChars;
    if(includeLowercase.checked) characters+=lowercaseChars;
    if(includeNumbers.checked) characters+=numberChars;
    if(includeSymbols.checked) characters+=symbolChars;

    if(characters.length===0){
        showMessage("Please select at least one character type!", "red");
        return '';
    }

    for(let i=0;i<length;i++){
        const randomIndex=Math.floor(Math.random()*characters.length);
        generatedPassword+=characters[randomIndex];
    }

    return generatedPassword
}

function showMessage(message, type="green"){
    messageBox.textContent=message;
    messageBox.style.backgroundColor = type === "red" ? "#ef4444" : "#22c55e";
    messageBox.classList.add("show");
    setTimeout(()=>{
        messageBox.classList.remove("show");
    }, 2000);
}

generateButton.addEventListener("click", ()=>{
    const newPassword=generatePassword();
    passwordDisplay.value=newPassword;
});

copyButton.addEventListener("click", ()=>{
    if(passwordDisplay.value){
        passwordDisplay.select();
        passwordDisplay.setSelectionRange(0, 99999); 

        document.execCommand("copy");

        showMessage("Password copied to clipboard!");
    }else{
        showMessage("No password to copy!", "red");
    }
});

window.onload=()=>{
    passwordDisplay.value=generatePassword();
};