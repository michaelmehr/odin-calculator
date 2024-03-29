const display = document.getElementById('display');
const calcButtons = document.querySelectorAll('button');
const calcButtonsArray = [...calcButtons];

calcButtonsArray.forEach(e => e.addEventListener('click', handleClick));

let displayText = display.textContent;
const MAX_DISPLAY_LENGTH = 10;

let heldNum = null;
let heldOperator = null;

let displayFlag = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator === '/' && num2 === 0) {
        alert(`Hey! Stop that! Don't divide by zero!`);
        clear();
        return;
    }
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

function updateDisplay(str) {
    if (!str) {
        displayText = '0';
    } else if (String(str).length > MAX_DISPLAY_LENGTH) {
        displayText = String(str).slice(0, MAX_DISPLAY_LENGTH);
    } else {
        displayText = String(str);
    }
    display.textContent = displayText;
}

function clear() {
    heldNum = null;
    heldOperator = null;
    updateDisplay('0');
}

function handleClick(e) {
    const target = e.target;
    if (target.textContent === "clear") {
        clear();
    } else if (target.classList.contains('num')) {
        handleNumber(Number(target.textContent));
    } else if (target.classList.contains('operand')) {
        handleOperator(target.textContent);
    } else if (target.textContent === "=") {
        handleEquals();
    }
}

function handleNumber(num) {
    if (displayText === '0' || displayFlag) {
        updateDisplay(String(num));
    } else {
        updateDisplay(displayText + String(num));
    }
    displayFlag = false;
}

function handleOperator(operator) {
    if (heldOperator === null) {
        heldOperator = operator;
    }
    if (heldNum === null) {
        heldNum = Number(displayText);
    } else {
        heldNum = operate(heldOperator, heldNum, Number(displayText))
        updateDisplay(heldNum);
    }
    heldOperator = operator
    displayFlag = true;
}

function handleEquals() {
    const equals = operate(heldOperator, heldNum, Number(displayText));
    updateDisplay(equals);
    displayFlag = true;
    heldNum = null;
    return equals;
}