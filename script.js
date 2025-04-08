let themeBtn = document.querySelector('.theme-button');
let body = document.body;
let text = document.getElementById('target');
let running = false;
let theme = 0;

themeBtn.addEventListener('click', () => {
    if (running) return;
    running = true;

    if (theme === 0) {
        themeBtn.classList.remove('themeBtnReverse-transition');
        void themeBtn.offsetWidth;
        themeBtn.classList.add('themeBtn-transition');
        theme = 1;
    } else {
        themeBtn.classList.remove('themeBtn-transition');
        void themeBtn.offsetWidth;
        themeBtn.classList.add('themeBtnReverse-transition');
        theme = 0;
    }

    text.classList.remove('qouteTransition');
    void text.offsetWidth;
    text.classList.add('qouteTransition');

    setTimeout(() => {
        themeBtn.classList.toggle('dark');
        body.classList.toggle('dark');
    }, 200);

    setTimeout(() => {
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
