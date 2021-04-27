const passwordDisplay = document.getElementById("passwordDisplay");
const amountRange = document.getElementById("amountRange");
const amountNumbers = document.getElementById("amountNumbers");
const lowerCase = document.getElementById("includesLowerCase")
const upperCase = document.getElementById("includesUpperCase");
const numbers = document.getElementById("includesNumbers");
const symbols = document.getElementById("includesSymbols");
const body = document.getElementsByTagName('body');
const symbolsChecked = symbols.checked;
const generateButton = document.getElementById("generate-button")


function makeEqual(e) {
    const value = e.target.value;
    amountRange.value = value;
    amountNumbers.value = value;
}
amountRange.addEventListener('input', makeEqual);
amountNumbers.addEventListener('input', makeEqual);

passwordDisplay.addEventListener("dblclick", doc => {
    doc.preventDefault();
    const characters = amountNumbers.value;
    const symbolsChecked = symbols.checked;
    const numbersChecked = numbers.checked;
    const upperChecked = upperCase.checked;
    const lowerChecked = lowerCase.checked;
    const password = generate(characters, symbolsChecked, numbersChecked, upperChecked, lowerChecked)
    passwordDisplay.innerText = password;
})


function formArray(low, high) {
    let arr = [];
    for (let i = low; i <= high; i++) {
        arr.push(i);
    }
    return arr;
}

const lowerCaseCharCodes = formArray(97, 122);
const upperCaseCharCodes = formArray(65, 90);
const numbersCharCodes = formArray(48, 57);
const symbolsCharCodes = formArray(33, 47).concat(formArray(58, 64)).concat(formArray(91, 96));

function generate(characters, symbolsChecked, numbersChecked, upperChecked, lowerChecked) {
    let charCodes = [];
    if (symbolsChecked) charCodes = charCodes.concat(symbolsCharCodes);
    if (lowerChecked) charCodes = charCodes.concat(lowerCaseCharCodes);
    if (upperChecked) charCodes = charCodes.concat(upperCaseCharCodes);
    if (numbersChecked) charCodes = charCodes.concat(numbersCharCodes);

    const passwordElements = [];
    for (let i = 0; i < characters; i++) {
        const element = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordElements.push(String.fromCharCode(element));
    }
    return passwordElements.join('');
}
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const difficult = document.getElementById("difficult");


function presetEasyGenerate() {
    let charCodesForPreset = [];
        charCodesForPreset = charCodesForPreset.concat(lowerCaseCharCodes);
        charCodesForPreset = charCodesForPreset.concat(numbersCharCodes);
        const passwordElements = [];
        for (let i = 0; i < 6; i++) {
            const element = charCodesForPreset[Math.floor(Math.random() * charCodesForPreset.length)]
            passwordElements.push(String.fromCharCode(element));
        }
        return passwordElements.join('');
}

function presetNormalGenerate() {
    let charCodesForPreset = [];
        charCodesForPreset = charCodesForPreset.concat(lowerCaseCharCodes);
        charCodesForPreset = charCodesForPreset.concat(numbersCharCodes);
        charCodesForPreset = charCodesForPreset.concat(upperCaseCharCodes)
        const passwordElements = [];
        for (let i = 0; i < 9; i++) {
            const element = charCodesForPreset[Math.floor(Math.random() * charCodesForPreset.length)]
            passwordElements.push(String.fromCharCode(element));
        }
        return passwordElements.join('');
}
function presetDifficultGenerate() {
    let charCodesForPreset = [];
        charCodesForPreset = charCodesForPreset.concat(lowerCaseCharCodes);
        charCodesForPreset = charCodesForPreset.concat(numbersCharCodes);
        charCodesForPreset = charCodesForPreset.concat(upperCaseCharCodes);
        charCodesForPreset = charCodesForPreset.concat(symbolsCharCodes);
        const passwordElements = [];
        for (let i = 0; i < 13; i++) {
            const element = charCodesForPreset[Math.floor(Math.random() * charCodesForPreset.length)]
            passwordElements.push(String.fromCharCode(element));
        }
        return passwordElements.join('');
}




easy.addEventListener("click", ()=> {
    const password = presetEasyGenerate();
    passwordDisplay.innerText = password;
    passwordDisplay.execCommand("copy");
});
normal.addEventListener("click", ()=> {
    const password = presetNormalGenerate();
    passwordDisplay.innerText = password;
});
difficult.addEventListener("click", ()=> {
    const password = presetDifficultGenerate();
    passwordDisplay.innerText = password;
});

