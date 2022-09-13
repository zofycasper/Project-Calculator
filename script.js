const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");
// const displayHis = document.querySelector(".display-his");
const currentProc = document.querySelector("#current");
const history = document.querySelector(".history");
const body = document.querySelector("body");

let a;
let b;
let oldValue = "";
let operatorValue = "";
let displayValue = "";
let result;
// let displayHistory = "";
let currentProcess = "";
let calRecord = "";
let keyInput = "";

window.addEventListener("keydown", (e) => {
    console.log("e.keyCode: " + e.keyCode);

    if ((95 < e.keyCode && e.keyCode < 106) || e.keyCode === 110) {
        keyInput = document.querySelector(`#n${e.keyCode}`);
        input = keyInput.innerText;
        if (displayValue.includes(".") && input === ".") {
            input = "";
        }

        console.log("input: " + input);
        numberTo();
    } else if (
        e.keyCode === 107 ||
        e.keyCode === 106 ||
        e.keyCode === 109 ||
        e.keyCode === 111
    ) {
        keyInput = document.querySelector(`#n${e.keyCode}`);
        input = keyInput.innerText;
        console.log("input: " + input);

        operatorTo();
    } else if (e.keyCode === 13) {
        keyInput = document.querySelector(`#n${e.keyCode}`);
        input = keyInput.innerText;
        console.log("input: " + input);

        equalTo();
    }
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        input = operator.innerText;
        operatorTo();
        operator.blur();
    });
});

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        input = number.innerText;
        if (displayValue.includes(".") && input == ".") {
            input = "";
        }
        console.log("input: " + input);
        numberTo();
        number.blur();
    });
});

equal.addEventListener("click", equalTo);

function equalTo() {
    if (currentProc.textContent == "-" && display.textContent == 0) {
        return;
    }
    if (operatorValue == "") {
        return;
    }
    if (displayValue == "") {
        operatorValue = input;
        currentProcess = a + operatorValue;
        currentProc.textContent = currentProcess;
        return;
    }
    oldValue = displayValue;
    b = oldValue;
    // displayValue = "";

    console.log("operatorValue: " + operatorValue);
    console.log("oldValue: " + oldValue);
    console.log("b: " + b);

    // displayHistory = displayHistory + b + "=";
    // displayHis.textContent = displayHistory;
    currentProcess = currentProcess + b + "=";
    currentProc.textContent = currentProcess;
    currentProcess = "";

    operate();

    displayValue = result;
    displayText = result;
    display.textContent = displayText;

    if (operatorValue != "") {
        calRecord = `${a} ${operatorValue} ${b} = ${result}`;
    } else return;
    const record = document.createElement("div");
    record.classList.add("record");
    record.textContent = calRecord;
    console.log("calRecord: " + calRecord);
    history.appendChild(record);

    console.log(`displayValue: ${displayValue}`);
    console.log("result: " + result);
    operatorValue = "";
    console.log("operatorValue: " + operatorValue);
    console.log("oldValue: " + oldValue);
}

function numberTo() {
    if (result != undefined && operatorValue == "") {
        a = "";
        displayValue = "";
        result = undefined;
    }
    console.log("a: " + a);
    displayValue = displayValue + input;
    displayText = displayValue;
    display.textContent = displayText;
    console.log(`displayValue: ${displayValue}`);
}

function operatorTo() {
    if (currentProc.textContent == "-" && display.textContent == 0) {
        return;
    }
    if (displayValue == "") {
        operatorValue = input;
        currentProcess = a + operatorValue;
        currentProc.textContent = currentProcess;
        return;
    }

    if (operatorValue != "") {
        equalTo();
    }

    oldValue = displayValue;
    if (oldValue != result) {
        a = oldValue;
    } else if (oldValue == result) {
        a = result;
    }

    operatorValue = input;
    displayText = displayValue;
    if (result != undefined) {
        display.textContent = result;
    } else display.textContent = displayText;
    displayValue = "";
    console.log("operatorValue: " + operatorValue);
    console.log("oldValue: " + oldValue);
    console.log("a: " + a);

    currentProcess = currentProcess + a + operatorValue;
    currentProc.textContent = currentProcess;
}

function operate() {
    if (operatorValue == "+") {
        add();
    } else if (operatorValue == "-") {
        subtract();
    } else if (operatorValue == "*") {
        multiply();
    } else if (operatorValue == "/") {
        divide();
    }
}

function reset() {
    displayValue = "";
    a = "";
    b = "";
    operatorValue = "";
    displayText = "0";
    oldValue = "";
    currentProcess = "";
    history.textContent = "";
    display.textContent = displayText;
    currentProc.textContent = "-";
    input = "";

    console.log("reset");

    return;
}

function printKeyVariables() {
    console.log("operatorValue: " + operatorValue);
    console.log("oldValue: " + oldValue);
    console.log("a: " + a);
    console.log(`displayValue: ${displayValue}`);
}

function add() {
    let na = 0;
    let nb = 0;

    if (a.includes(".")) {
        na = a.split(".")[1].length;
    }
    if (b.includes(".")) {
        nb = b.split(".")[1].length;
    }

    a = parseFloat(a);
    b = parseFloat(b);

    if (na >= nb) {
        result = (a + b).toFixed(na);
    } else result = (a + b).toFixed(nb);
    console.log(`${a} + ${b} = ${result}`);
}

function subtract() {
    let na = 0;
    let nb = 0;

    if (a.includes(".")) {
        na = a.split(".")[1].length;
    }
    if (b.includes(".")) {
        nb = b.split(".")[1].length;
    }

    a = parseFloat(a);
    b = parseFloat(b);

    if (na >= nb) {
        result = (a - b).toFixed(na);
    } else result = (a - b).toFixed(nb);
    console.log(`${a} - ${b} = ${result}`);
}

function multiply() {
    let na = 0;
    let nb = 0;

    if (a.includes(".")) {
        na = a.split(".")[1].length;
    }
    if (b.includes(".")) {
        nb = b.split(".")[1].length;
    }

    a = parseFloat(a);
    b = parseFloat(b);

    if (na >= nb) {
        result = (a * b).toFixed(na);
    } else result = (a * b).toFixed(nb);
    console.log(`${a} * ${b} = ${result}`);
}

function divide() {
    let na = 0;
    let nb = 0;

    if (a.includes(".")) {
        na = a.split(".")[1].length;
    }
    if (b.includes(".")) {
        nb = b.split(".")[1].length;
    }

    a = parseFloat(a);
    b = parseFloat(b);

    if (na >= nb) {
        result = parseFloat(a / b).toFixed(na);
    } else result = parseFloat(a / b).toFixed(nb);

    console.log(`na = ${na}`);
    console.log(`nb = ${nb}`);
    console.log(`${a} / ${b} = ${result}`);
}

clear.addEventListener("click", () => {
    reset();
    printKeyVariables();
    clear.blur();
});
