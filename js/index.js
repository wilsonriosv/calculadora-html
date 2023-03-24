//Variable para traer todo el div calculator con sus elementos
const calculator = document.querySelector('.calculator');
//Variable para traer todo el div calculator__keys con sus elementos
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', (event) => {
    if(event.target.matches('button')) {
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType

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
            if (
                displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        //Si al button no se le puso un data-action 'add' o 'substract' o 'multiply' o 'divide'
        //Es decir, si la tecla presionada es un operador
        if (action === 'add' || 
            action === 'substract' || 
            action === 'multiply' || 
            action === 'divide') 
        {
            console.log('Presionó un operador');
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
            
                // Update calculated value as firstValue
                calculator.dataset.firstValue = calcValue
            } else {
                // If there are no calculations, set displayedNum as the firstValue
                calculator.dataset.firstValue = displayedNum
            }

            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

        //Si presiona la tecla punto (.)
        if (action === 'decimal') {
            console.log('Presionó la tecla punto');
            if (!displayedNum.includes('.')) {
                console.log('Ya tiene un punto')
                display.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                ) {
                    console.log('Ya tiene un pÌ∟unto')
                    display.textContent = '0.'
            }
              
            calculator.dataset.previousKeyType = 'decimal'
        }
        
        //Si presiona la tecla AC
        if (action === 'clear') {
            console.log('Presionó la tecla AC');
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }
              
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }
        
        //Si presiona la tecla igual (=)
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
  
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            // Establecer el atributo de modValue
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }

    }
})

/**
 * Function calculate(firstValue, operator, secondValue): Permite calcular la operación solicitada por el usuario
 * @param {*} firstValue 
 * @param {*} operator 
 * @param {*} secondValue 
 * @returns result of the calculation
 */
const calculate = (n1, operator, n2) => {
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