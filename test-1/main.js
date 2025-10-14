import './style.css';

// 電卓のクラス
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  delete() {
    if (this.currentOperand === '0') return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = '0';
      this.shouldResetScreen = false;
    }

    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.shouldResetScreen = true;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert('0で割ることはできません');
          this.clear();
          this.updateDisplay();
          return;
        }
        computation = prev / current;
        break;
      case '%':
        computation = prev % current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.shouldResetScreen = true;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('ja-JP', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      const operatorSymbol = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷',
        '%': '%',
      }[this.operation];
      this.previousOperandElement.textContent = `${this.getDisplayNumber(
        this.previousOperand
      )} ${operatorSymbol}`;
    } else {
      this.previousOperandElement.textContent = '';
    }
  }
}

// 要素の取得
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

// 電卓インスタンスの作成
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

// 数字ボタンのイベントリスナー
document.querySelectorAll('[data-number]').forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.dataset.number);
    calculator.updateDisplay();
  });
});

// 演算子ボタンのイベントリスナー
document.querySelectorAll('[data-operator]').forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.dataset.operator);
    calculator.updateDisplay();
  });
});

// イコールボタンのイベントリスナー
document
  .querySelector('[data-action="equals"]')
  .addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });

// クリアボタンのイベントリスナー
document
  .querySelector('[data-action="clear"]')
  .addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });

// デリートボタンのイベントリスナー
document
  .querySelector('[data-action="delete"]')
  .addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });

// キーボードサポート
document.addEventListener('keydown', (e) => {
  if (e.key >= 0 && e.key <= 9) calculator.appendNumber(e.key);
  if (e.key === '.') calculator.appendNumber(e.key);
  if (e.key === '=' || e.key === 'Enter') calculator.compute();
  if (e.key === 'Backspace') calculator.delete();
  if (e.key === 'Escape') calculator.clear();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    calculator.chooseOperation(e.key);
  }
  calculator.updateDisplay();
});

console.log('Calculator initialized');
