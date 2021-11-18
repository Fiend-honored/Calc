"use strict"

let calculator = document.querySelector("#calculator");
let display = document.querySelector("#display");
let log = document.querySelector("#log");

let counterKey = 1;

getValueLocalStorage();

document.querySelector("#calculator").addEventListener("click", handler);

let firstOperand = "";
let secondOperand = "";
let value = "";
let operation = "";

function handler(e) {
    if (e.target.className === "btn number") {
        setValue(e);
    }
    else if (e.target.className === "btn operation") {
        operation = e.target.innerText;
        value = "";
    }
    else if (e.target.id === "point") {
        setPoint();
    }
    else if (e.target.id === "equals") {
        getCalculating();
    }
    else if (e.target.id === "clean") {
        clean();
    }
    else if (e.target.id === "sqrt") {
        getSqrt();
    }
    else if (e.target.id === "percent" && secondOperand !== "") {
        getPercent();
    }
}

function setValue(e) {
    if (display.innerHTML === "0") {
        value = e.target.innerText;
    } else {
        value += e.target.innerText;
    }
    display.innerHTML = value;
    if (operation === "") {
        firstOperand = Number(value);
    } else {
        secondOperand = Number(value);
    }
}

function setPoint() {
    if (value.indexOf('.') == -1)
        value += '.';
}

function getCalculating() {
    let result;

    switch (operation) {
        case "+":
            result = firstOperand + secondOperand;
            break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        case "*":
            result = firstOperand * secondOperand;
            break;
        case "/":
            result = firstOperand / secondOperand;
            break;
        case "x^n":
            result = pow(firstOperand, secondOperand);
            break;
    }
    value = result.toString();
    display.innerHTML = value;

    setValueLocalStorage("simpleOperation");

    operation = "";
    firstOperand = result;
    secondOperand = "";
}

function pow(x, n) {
    return (n == 1) ? x : (x * pow(x, n - 1));
}

function clean() {
    setValueLocalStorage("CE");
    firstOperand = "";
    secondOperand = "";
    value = "0";
    operation = "";
    display.innerHTML = value;
}

function getSqrt() {
    value = Number(display.innerHTML);
    firstOperand = Math.sqrt(value);
    display.innerHTML = firstOperand;

    setValueLocalStorage("sqrt");
}

function getPercent() {
    let result = 0;
    switch (operation) {
        case "+":
            result = ((firstOperand * 100) + (secondOperand * firstOperand)) / 100;
            break;
        case "-":
            result = ((firstOperand * 100) - (secondOperand * firstOperand)) / 100;
            break;
        case "/":
            result = (firstOperand * 100) / secondOperand;
            break;
        case "*":
            result = (secondOperand / 100) * firstOperand;
            break;
    }
    value = result.toString();
    display.innerHTML = value;

    setValueLocalStorage("%");

    operation = "";
    firstOperand = result;
    secondOperand = "";
}

function setValueLocalStorage(command) {
    if (counterKey > 100) {
        counterKey = 1;
    }
    switch (command) {
        case "simpleOperation":
            if (operation === "+" || operation === "-" || operation === "*" || operation === "/") {
                localStorage.setItem(counterKey.toString(), `${firstOperand} ${operation} ${secondOperand} = ${value}`);
            }
            else if (operation === "x^n") {
                localStorage.setItem(counterKey.toString(), `${firstOperand}^${secondOperand} = ${value}`);
            }
            break;
        case "sqrt":
            localStorage.setItem(counterKey.toString(), `sqrt(${value}) = ${firstOperand}`);
            break;
        case "CE":
            localStorage.setItem(counterKey.toString(), 'CE');
            break;
        case "%":
            localStorage.setItem(counterKey.toString(), `${firstOperand} ${operation} ${secondOperand}% = ${value}`);
            break;
    }
    getNewValueLocalStorage();
    counterKey++;
}

function getValueLocalStorage() {
    let value;
    let lastKey = Number(localStorage.length);

    if (counterKey < lastKey) {
        counterKey = lastKey;
    }

    for (let i = 1; i <= lastKey; i++) {
        value = localStorage.getItem(i);
        let p = document.createElement("p");
        p.innerHTML = value;
        log.append(p);
    }
}

function getNewValueLocalStorage() {
    let value = localStorage.getItem(counterKey);
    let p = document.createElement("p");
    p.innerHTML = value;
    log.append(p);
}