let themeBtn = document.querySelector('.theme-button');
let body = document.body;
let text = document.getElementById('target');
let running = false;
let theme = localStorage.getItem('theme') || '0';
if (theme === '1') {
    themeBtn.classList.add('dark');
    body.classList.add('dark');
}

themeBtn.addEventListener('click', () => {
    if (running) return;
    running = true;

    if (theme === '0') {
        themeBtn.classList.remove('themeBtnReverse-transition');
        void themeBtn.offsetWidth;
        themeBtn.classList.add('themeBtn-transition');
        theme = '1';
    } else {
        themeBtn.classList.remove('themeBtn-transition');
        void themeBtn.offsetWidth;
        themeBtn.classList.add('themeBtnReverse-transition');
        theme = '0';
    }

    localStorage.setItem('theme', theme);

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
let lastClearTime = 0;
let clearTimeout = null;

let clearTimeoutId = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            if (clearTimeoutId) {
                clearTimeout(clearTimeoutId);
                clearTimeoutId = null;
            }
            const now = Date.now();
            
            if (now - lastClearTime < 200) {
                input.value = '';
                selected.textContent = '';
                firstNumber = null;
                currentOperator = null;
            } else {
                if (input.value.length > 0) {
                    input.value = input.value.slice(0, -1);
                }
            }
            lastClearTime = now;
        }
        else if (value === '=') {
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
// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    let key = e.key;
    
    // Handle numbers
    if (/^[0-9]$/.test(key)) {
        pressButton(key);
    }
    // Handle operators
    else if (key === '+' || key === '-') {
        pressButton(key);
    }
    else if (key === '*') {
        pressButton('×');
    }
    else if (key === '/') {
        pressButton('÷');
    }
    else if (key === '=' || key === 'Enter') {
        pressButton('=');
    }
    else if (key === '.') {
        pressButton('.');
    }
    else if (key === 'Backspace' || key === 'Delete') {
        pressButton('C');
    }
    else if (key === 'Escape') {
        pressButton('C');
        setTimeout(() => pressButton('C'), 50);
    }
});

function pressButton(value) {
    const btn = Array.from(buttons).find(b => b.textContent === value);
    if (btn) {
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 100);
        btn.click();
    }
}
