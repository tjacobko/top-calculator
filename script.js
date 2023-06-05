// ------------------------------------- Variables -------------------------------------

let stack = []
const ops = ["+", "-", "*", "/"]
let reset = false

// ------------------------------------- Helper Functions -------------------------------------

function round (num) {
    if ((num%1) != 0) {
        return Math.round((num + Number.EPSILON) * 10000) / 10000
    }
    return num
}

function add (a, b) {
    return round(a + b)
}

function subtract (a, b) {
    return round(a - b)
}

function multiply (a, b) {
    return round(a * b)
}

function divide (a, b) {
    if (b === 0) {
        return "Error: cannot divide by 0"
    }

    return round(a / b)
}

function operate (a, b, operator) {
    a = Number(a)
    b = Number(b)
    if (operator === "+") {
        return add(a, b)
    }
    else if (operator === "-") {
        return subtract(a, b)
    }
    else if (operator === "*") {
        return multiply(a, b)
    }
    else if (operator === "/") {
        return divide(a, b)
    }
}

// ------------------------------------- Display Functions -------------------------------------

// Appends a number 1-9 to the display
// or replaces with a number if display is 0
// or replaces with a number operation selected
function updateDisplay (e) {
    const display = document.querySelector(".display")
    const num = display.textContent
    const appendNum = e.target.textContent
    if (num === "0" || reset === true) {
        replaceDisplay(appendNum)
        reset = false
    }
    else {
        display.textContent = num + appendNum
    }
}

// Replaces the display with num
function replaceDisplay (num) {
    const display = document.querySelector(".display")
    display.textContent = num
}

// Clears display and resets stack
function clearDisplay () {
    const display = document.querySelector(".display")
    display.textContent = 0
    stack = []
}

// ------------------------------------- Operation Functions -------------------------------------

// Operator onclick runs operation or prepares operation
function operatorClick (e) {
    if (stack.length > 0) {
        equals()
    }
    const num1 = document.querySelector(".display").textContent
    const operation = e.target.textContent

    if (num1.includes("Error")) {
        clearDisplay()
        return
    }

    stack.push(num1)
    stack.push(operation)
    reset = true
}

// Gets num1 and operator from stack, gets num2 from display, runs operation
// Clears stack
function equals () {
    const num1 = stack[0]
    const operator = stack[1]
    if (ops.includes(operator)) {
        const num2 = document.querySelector(".display").textContent
        const answer = operate(num1, num2, operator)
        replaceDisplay(answer)
        stack = []
    }
}

// ------------------------------------- Add Events -------------------------------------

// Get all numbers and add updateDisplay event
const nums = document.querySelectorAll(".num")
nums.forEach(num => num.addEventListener("click", updateDisplay))

// Get all operators and add operatorClick event
const operators = document.querySelectorAll(".operator")
operators.forEach(operator => operator.addEventListener("click", operatorClick))

// Gets equals sign and adds equals event
const equalSign = document.querySelector(".equals")
equalSign.addEventListener("click", equals)

// Gets clear sign and adds clearDisplay event
const clearSign = document.querySelector(".clear")
clearSign.addEventListener("click", clearDisplay)