const numbersBtn = document.querySelectorAll('[data-number]');
const operationsBtn = document.querySelectorAll('[data-operation]');
const dataAllClearBtn = document.querySelector('[data-all-clear]');
const deleteLastNumber = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const previousOperandScreen = document.querySelector('[data-previous-operand]');
const currentOperandScreen = document.querySelector('[data-current-operand]');

let previousOperator;
let lastStringElm = previousOperandScreen.innerHTML.slice(-1);

let pickNumber = () => {
    previousOperandScreen.innerHTML += event.target.innerHTML;
}

let chooseOperation = () => {

    if (
        lastStringElm === '÷' ||
        lastStringElm === '*' ||
        lastStringElm === '-' ||
        lastStringElm === '+'
    ) {
        return previousOperandScreen.innerHTML.replace(/.$/, event.target.innerHTML);
    } else {
        previousOperandScreen.innerHTML += event.target.innerHTML;
    }
}

let clearAllData = () => {
    currentOperandScreen.innerHTML = '';
    previousOperandScreen.innerHTML = '';
}

let getResult = () => {
    currentOperandScreen.innerHTML = eval(
        previousOperandScreen.innerHTML.replace('÷', '/')
    );

    currentOperandScreen.innerHTML = currentOperandScreen.innerHTML.substring(0, 14);
}

let deleteLastRecord = () => {
    if (currentOperandScreen.innerHTML != 0) {
        currentOperandScreen.innerHTML = Math.floor(
            currentOperandScreen.innerHTML / 10
        );
    } else {
        previousOperandScreen.innerHTML = previousOperandScreen.innerHTML.substring(
            0,
            previousOperandScreen.innerHTML.length - 1
        );
    }
}

numbersBtn.forEach(elm => {
    elm.addEventListener('click', pickNumber)
});

operationsBtn.forEach(elm => {
    elm.addEventListener('click', chooseOperation);
});
dataAllClearBtn.addEventListener('click', clearAllData);
equalsBtn.addEventListener('click', getResult);
deleteLastNumber.addEventListener('click', deleteLastRecord);