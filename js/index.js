//Variable para traer todo el div calculator con sus elementos
const calculator = document.querySelector('.calculator');
//Variable para traer todo el div calculator__keys con sus elementos
const keys = document.querySelector('.calculator__keys');

keys.addEventListener('click', (event) => {
    if(event.target.matches('button')) {
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
             .forEach(k => k.classList.remove('is-depressed'))

            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }

        //Si al button no se le puso un data-action action=false
        if (!action) {
            console.log('Presionó un número');
            
        }
        if (action === 'add' || 
            action === 'substract' || 
            action === 'multiply' || 
            action === 'divide') 
        {
            console.log('Presionó un operador');
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        //Si presiona la tecla punto (.)
        if (action === 'decimal') {
            console.log('Presionó la tecla punto');
            display.textContent = displayedNum + '.'
        }
        
        //Si presiona la tecla AC
        if (action === 'clear') {
            console.log('Presionó la tecla AC');
        }
        
        //Si presiona la tecla igual (=)
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            display.textContent = calculate(firstValue, operator, secondValue)

        }

    }
})

const calculate = (firstValue, operator, secondValue) => {
    // Perform calculation and return calculated value
    let result = ''
  
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }
  
  return result
}