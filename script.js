let themeBtn = document.querySelector('.theme-button');
let body = document.body;
let text = document.getElementById('target');
let running = false;

themeBtn.addEventListener('click', () => {
    if (running) return;
    running = true;
    text.classList.remove('qouteTransition');
    setTimeout(() => {
        body.classList.toggle('dark');
    }, 200);
    text.classList.add('qouteTransition');
    setTimeout(() => {
        text.classList.remove('qouteTransition');
        running = false;
    }, 600);
});

const input = document.querySelector('.input-text');
const selected = document.querySelector('.selected');
const buttons = document.querySelectorAll('.numkey');

let firstNumber = null;
let currentOperator = null;
let resetInput = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '=') {
            if (firstNumber !== null && currentOperator !== null && input.value) {
                const secondNumber = parseFloat(input.value);
                let result;

                switch (currentOperator) {
                    case '+': result = firstNumber + secondNumber; break;
                    case '-': result = firstNumber - secondNumber; break;
                    case '×': result = firstNumber * secondNumber; break;
                    case '÷': result = firstNumber / secondNumber; break;
                }

                selected.textContent = `${firstNumber} ${currentOperator} ${secondNumber} = ${result}`;
                input.value = '';
                firstNumber = result;
            }
        } 
        else if (['+', '-', '×', '÷'].includes(value)) {
            if (input.value) {
                firstNumber = parseFloat(input.value);
                currentOperator = value;
                selected.textContent = `${firstNumber} ${currentOperator}`;
                input.value = '';
            }
        } 
        else if (value === '.') {
            if (!input.value.includes('.')) {
                input.value += input.value === '' ? '0.' : '.';
            }
        }
        else {
            if (resetInput) {
                input.value = '';
                resetInput = false;
            }
            input.value += value;
        }
    });
});

input.addEventListener('click', () => {
    input.value = '';
});