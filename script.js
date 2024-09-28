/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

let currentValue = ''
let previousValue = ''
let operator = ''

/*------------------------ Cached Element References ------------------------*/

const buttons = document.querySelectorAll('.button')
const display = document.querySelector('.display')

/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach((button) => {
	button.addEventListener('click', (event) => {
		const buttonText = event.target.innerText

		if (event.target.classList.contains('number')) {
			if (buttonText === '.' && currentValue.includes('.')) return //

			updateDisplay(buttonText)
			currentValue += buttonText
		} else if (buttonText === 'C') {
			clearDisplay()
		} else if (
			event.target.classList.contains('operator') &&
			buttonText !== 'C'
		) {
			if (operator) return

			operator = buttonText
			previousValue = currentValue
			currentValue = ''
			updateDisplay(operator)
		} else if (event.target.classList.contains('equals')) {
			calculate()
		}
	})
})

/*-------------------------------- Functions --------------------------------*/

const updateDisplay = (value) => {
	display.innerText += value
}

const calculate = () => {
	const previous = parseFloat(previousValue)
	const current = parseFloat(currentValue)

	if (isNaN(previous) || isNaN(current)) return

	let result = 0
	switch (operator) {
		case '+':
			result = previous + current
			break
		case '-':
			result = previous - current
			break
		case '*':
			result = previous * current
			break
		case '/':
			if (current === 0) {
				display.innerText = 'Error'
				return
			}
			result = previous / current
			break
	}

	console.log('Calculated Result:', result)

	display.innerText = result
	currentValue = result.toString()
	previousValue = ''
	operator = ''
}

const clearDisplay = () => {
	display.innerText = ''
	currentValue = ''
	previousValue = ''
	operator = ''
}
