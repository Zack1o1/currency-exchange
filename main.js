			
const api_url = "https://api.exchangerate-api.com/v4/latest/"
const form = document.querySelector('form')
const updated_date = document.getElementById('updated_date')
const result = document.getElementById('result')

function conversion(event){
	event.preventDefault()

	let from_currency = document.getElementById('from_currency').value
	let to_currency = document.getElementById('to_currency').value
	let amount = parseFloat(document.getElementById('amount').value)

	if (isNaN(amount)){
		// alert('input valid number')
		document.querySelector('#amount').focus()
		document.querySelector('#container').classList.remove('container_height')
		document.querySelector('#alert').classList.remove('d-none')

	}

	else{
		document.querySelector('#container').classList.add('container_height')
		document.querySelector('#alert').classList.add('d-none')

		axios.get(api_url + from_currency)
		.then(response => {
			const exchange_rates = response.data.rates
			const from_rate = exchange_rates[from_currency]
			const to_rate = exchange_rates[to_currency]
			const converted_amount = amount * (to_rate / from_rate)
			const date = response.data.date

			updated_date.value =`Updated date: ${date}`

			result.value = `${converted_amount.toFixed(2)}`

		})
		.catch(error => {
			result.value = "error.."
		})
	}
}

form.addEventListener('submit', conversion)
