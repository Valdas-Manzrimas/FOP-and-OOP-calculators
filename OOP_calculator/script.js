class Calculator {
  constructor(button, frontScreen, backScreen) {
    this.button = button;
    this.frontScreen = frontScreen || 0;
    this.backScreen = backScreen || '';
    this.previousOperator;

    this.frontScreen.length <= 14;
  }

  pickTheNumber() {
    this.button.forEach((btn) => {
      btn.addEventListener('click', () => {

        if (this.frontScreen.innerHTML === '') {
          this.backScreen.innerHTML += btn.innerHTML;
        } else {
          this.backScreen.innerHTML = '';
          this.frontScreen.innerHTML = '';
          this.backScreen.innerHTML += btn.innerHTML;
        }
      });
    });
  }

  pickTheOperation() {
    this.button.forEach((btn) => {
      btn.addEventListener('click', () => {
        let lastStringElm = this.backScreen.innerHTML.slice(-1);

        this.previousOperator = event.target.innerHTML;
        this.frontScreen.innerHTML = '';
        if (
          lastStringElm === '÷' ||
          lastStringElm === '*' ||
          lastStringElm === '-' ||
          lastStringElm === '+'
        ) {
          return this.backScreen.innerHTML.replace(/.$/, this.previousOperator);
        } else {
          this.backScreen.innerHTML += this.previousOperator;
        }
      });
    });
  }

  getResult() {
    this.button.addEventListener('click', () => {
      this.previousOperator = event.target.innerHTML;

      this.frontScreen.innerHTML = eval(
        this.backScreen.innerHTML.replace('÷', '/')
      );
      // max length
      this.frontScreen.innerHTML = this.frontScreen.innerHTML.substring(0, 14);
    });
  }

  dataAllClear() {
    this.button.addEventListener('click', () => {
      this.frontScreen.innerHTML = null;
      this.backScreen.innerHTML = null;
      this.previousOperator;
    });
  }

  deleteLastRecord() {
    this.button.addEventListener('click', () => {
      if (this.frontScreen.innerHTML != 0) {
        this.frontScreen.innerHTML = Math.floor(
          this.frontScreen.innerHTML / 10
        );
      } else {
        this.backScreen.innerHTML = this.backScreen.innerHTML.substring(
          0,
          this.backScreen.innerHTML.length - 1
        );
      }
    });
  }
}

let numberBtns = new Calculator(
  document.querySelectorAll('[data-number]'),
  document.querySelector('[data-current-operand]'),
  document.querySelector('[data-previous-operand]')
);
let operationBtns = new Calculator(
  document.querySelectorAll('[data-operation]'),
  document.querySelector('[data-current-operand]'),
  document.querySelector('[data-previous-operand]')
);
let dataAllClearBtn = new Calculator(
  document.querySelector('[data-all-clear]'),
  document.querySelector('[data-current-operand]'),
  document.querySelector('[data-previous-operand]')
);
let lastDataDeleteBtn = new Calculator(
  document.querySelector('[data-delete]'),
  document.querySelector('[data-current-operand]'),
  document.querySelector('[data-previous-operand]')
);
let equalsBtn = new Calculator(
  document.querySelector('[data-equals]'),
  document.querySelector('[data-current-operand]'),
  document.querySelector('[data-previous-operand]')
);

numberBtns.pickTheNumber();
operationBtns.pickTheOperation();
dataAllClearBtn.dataAllClear();
lastDataDeleteBtn.deleteLastRecord();
equalsBtn.getResult();