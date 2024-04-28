// WYSZKUKIWARKA PO NAZWIĘ

const search = document.querySelector('.search-input');
const cars_name = document.querySelectorAll('.auto-card');

const searchEngine = (e) => {
	const text = e.target.value.toLowerCase();

	cars_name.forEach((el) => {
		if (el.textContent.toLowerCase().indexOf(text) !== -1) {
			el.style.display = 'block';
		} else {
			el.style.display = 'none';
		}
	});
};

search.addEventListener('keyup', searchEngine);



// PRZEWIJANIE DO FORMULARZA PO WYBRANIU AUTA

const cars_btns = document.querySelectorAll('.auto-card-info-btn');
const sale_form = document.querySelector('.sale-form');

const scrollDown = () => {
	sale_form.scrollIntoView({ behavior: 'smooth' });
};

cars_btns.forEach((el) => {
	el.addEventListener('click', scrollDown);
});



// KLONOWANIE WYBRANEJ KARTY DO FORMULARZA

const chosenCarDiv = document.querySelector('.chosen-car');
const chosenCarSummary = document.querySelector('.chosen-car-summary');

function cloneCardEngine(e) {
	const autoCard = e.target.closest('.auto-card');
	const existingClonedCard = chosenCarDiv.querySelector('.auto-card');
	const existingClonedCardSummary =
		chosenCarSummary.querySelector('.auto-card');

	if (existingClonedCard) {
		existingClonedCard.remove();
	}

	if (existingClonedCardSummary) {
		existingClonedCardSummary.remove();
	}

	const clonedAutoCard = autoCard.cloneNode(true);
	const clonedCardSummary = autoCard.cloneNode(true);
	const clonedBtn = clonedAutoCard.querySelector('.auto-card-info-btn');
	const clonedBtnSummary = clonedCardSummary.querySelector(
		'.auto-card-info-btn'
	);

	chosenCarDiv.appendChild(clonedAutoCard);
	chosenCarSummary.appendChild(clonedCardSummary);
	clonedBtn.remove();
	clonedBtnSummary.remove();

	const carPrice = clonedAutoCard.querySelector('.car-price').textContent;

	const carPriceValue = document.querySelector('.value-car-price');
	const carPriceValueSummary = document.querySelector(
		'.value-car-price-summary'
	);

	carPriceValue.textContent = carPrice;
	carPriceValueSummary.textContent = carPrice;

	localStorage.setItem('chosenCar', clonedAutoCard.outerHTML);
	localStorage.setItem('clonedAutoCard', clonedCardSummary.outerHTML);
	localStorage.setItem('totalPrice', carPrice);
	localStorage.setItem(
		'carPriceValueSummary',
		carPriceValueSummary.textContent
	);

	updateTotalPrice();
}

cars_btns.forEach((el) => {
	el.addEventListener('click', cloneCardEngine);
});

const savedCard = localStorage.getItem('chosenCar');

if (savedCard) {
	chosenCarDiv.innerHTML = savedCard;
}

function saveChosenCarToLocalStorage() {
	const clonedAutoCard = chosenCarDiv.querySelector('.auto-card');
	if (clonedAutoCard) {
		const serializedCard = clonedAutoCard.outerHTML;
		localStorage.setItem('chosenCar', serializedCard);
	}
}

function loadChosenCarFromLocalStorage() {
	const serializedCard = localStorage.getItem('chosenCar');
	if (serializedCard) {
		chosenCarDiv.innerHTML = serializedCard;
		const carPrice = chosenCarDiv.querySelector('.car-price').textContent;
		const totalPriceCell = document.querySelector('.value-car-price');
		totalPriceCell.textContent = carPrice;
	}
}

loadChosenCarFromLocalStorage();



// KALENDARZ

const deliveryDateSummary = document.querySelector('.value-delivery-summary');
const deliveryDate = document.querySelector('.delivery-date');
const today = new Date();
const minDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

const formattedMinDate = minDate.toISOString().split('T')[0];

deliveryDate.min = formattedMinDate;

deliveryDateSummary.textContent = formattedMinDate;



// DODAWANIE I USUWANIE AKCESORIÓW + LOCAL STORAGE

const accessories = document.querySelector('.accessories');
const chosenAccessories = document.querySelector('.chosen-accessories');
const addAccessories = document.querySelector('.add-accessories');
const deleteAccessories = document.querySelector('.delete-accessories');
const accessoriesPriceCell = document.querySelector('.value-accessories');
const accessoriesPriceSummary = document.querySelector(
	'.value-accessories-summary'
);
const totalPriceSummary = document.querySelector('.value-total-price-summary');
const carPriceCell = document.querySelector('.value-car-price');
const totalPriceCell = document.querySelector('.value-total-price');

const addItems = () => {
	const selectedOption = accessories.options[accessories.selectedIndex];
	if (!isDuplicate(selectedOption)) {
		chosenAccessories.appendChild(selectedOption.cloneNode(true));
		updateAccessoriesPrice();
		updateTotalPrice();
		saveAccessoriesToLocalStorage();
	}
};

const isDuplicate = (selectedOption) => {
	const alreadySelected = Array.from(chosenAccessories.options).some(
		(option) => option.value === selectedOption.value
	);
	if (alreadySelected) return true;
	const savedAccessories =
		JSON.parse(localStorage.getItem('selectedAccessories')) || [];
	return savedAccessories.some((option) => option === selectedOption.outerHTML);
};

const deleteItems = () => {
	const selectedOption =
		chosenAccessories.options[chosenAccessories.selectedIndex];
	chosenAccessories.removeChild(selectedOption);
	updateAccessoriesPrice();
	updateTotalPrice();
	saveAccessoriesToLocalStorage();
};

function calculateAccessoriesPrice() {
	const selectedOptions = chosenAccessories.options;
	let totalPrice = 0;

	for (const option of selectedOptions) {
		const priceString = option.textContent.split(' - ')[1];
		const price = parseFloat(priceString.replace('PLN', '').trim());
		totalPrice += price;
	}

	return totalPrice.toFixed(0);
}

function updateAccessoriesPrice() {
	accessoriesPriceCell.textContent = calculateAccessoriesPrice() + ' PLN';
	accessoriesPriceSummary.textContent = calculateAccessoriesPrice() + ' PLN';
}

function updateTotalPrice() {
	const accessoriesPrice = parseInt(
		accessoriesPriceCell.textContent.replace(' PLN', '').replace(/\s+/g, '')
	);
	const carPrice = parseInt(
		carPriceCell.textContent.replace(' PLN', '').replace(/\s+/g, '')
	);
	const totalPrice = accessoriesPrice + carPrice;
	totalPriceCell.textContent =
		totalPrice.toLocaleString('pl-PL', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}) + ' PLN';

	totalPriceSummary.textContent =
		totalPrice.toLocaleString('pl-PL', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}) + ' PLN';
}

function saveAccessoriesToLocalStorage() {
	const selectedAccessories = Array.from(chosenAccessories.options).map(
		(option) => option.outerHTML
	);
	localStorage.setItem(
		'selectedAccessories',
		JSON.stringify(selectedAccessories)
	);
}

function loadAccessoriesFromLocalStorage() {
	const savedAccessories = localStorage.getItem('selectedAccessories');
	if (savedAccessories) {
		const parsedAccessories = JSON.parse(savedAccessories);
		parsedAccessories.forEach((option) => {
			const tempOption = document.createElement('option');
			tempOption.innerHTML = option;
			chosenAccessories.appendChild(tempOption);
		});
		updateAccessoriesPrice();
		updateTotalPrice();
	}
}

loadAccessoriesFromLocalStorage();

addAccessories.addEventListener('click', addItems);
deleteAccessories.addEventListener('click', deleteItems);



// KLONOWANIE DANYCH Z FORMULARZA DO PODSUMOWANIA (FINANSOWANIE, IMIĘ, DATA DOSTAWY) + LOCAL STORGAE

const financingLeasingInput = document.querySelector('.leasing');
const financingCashInput = document.querySelector('.cash');
const finansowanieInputs = document.querySelectorAll(
	'input[name="finansowanie"]'
);
const nameInput = document.querySelector('.name');
const deliveryDateInput = document.querySelector('.delivery-date');

function getFinancingOption() {
	if (financingLeasingInput.checked) {
		return 'Leasing';
	} else if (financingCashInput.checked) {
		return 'Gotówka';
	} else {
		return '';
	}
}

function saveOrderDataToLocalStorage() {
	const orderData = {
		financingOption: getFinancingOption(),
		name: nameInput.value,
		deliveryDate: deliveryDateInput.value,
	};
	localStorage.setItem('orderData', JSON.stringify(orderData));
}

function loadOrderDataFromLocalStorage() {
	const savedOrderData = localStorage.getItem('orderData');
	if (savedOrderData) {
		const parsedOrderData = JSON.parse(savedOrderData);
		financingLeasingInput.checked =
			parsedOrderData.financingOption === 'Leasing';
		financingCashInput.checked = parsedOrderData.financingOption === 'Gotówka';
		nameInput.value = parsedOrderData.name;
		deliveryDateInput.value = parsedOrderData.deliveryDate;
	}
}

loadOrderDataFromLocalStorage();

nameInput.addEventListener('input', saveOrderDataToLocalStorage);
deliveryDateInput.addEventListener('input', saveOrderDataToLocalStorage);
financingLeasingInput.addEventListener('change', saveOrderDataToLocalStorage);
financingCashInput.addEventListener('change', saveOrderDataToLocalStorage);

// POWRÓT DO WYBORU - BTN

const backBtn = document.querySelector('.back-btn');
const carsOffer = document.querySelector('.cars-offer');

const scrollUp = () => {
	localStorage.clear();
	window.location.reload();
	window.scrollTo({ top: 1000, behavior: 'instant' });
};

backBtn.addEventListener('click', scrollUp);



// ZAKUP - BTN

const buyBtn = document.querySelector('.buy-btn');
const summaryPopUp = document.querySelector('.summary-info');
const closePopUp = document.querySelector('.fa-x');

const transactionFinalization = () => {
	const errorMessages = document.querySelectorAll('.error-message');
	errorMessages.forEach((errorMessage) => {
		errorMessage.textContent = '';
	});

	let hasError = false;

	const leasingChecked = document.querySelector('.leasing').checked;
	const cashChecked = document.querySelector('.cash').checked;
	const finansowanieError = document.querySelector('.finansowanie-error');
	if (!leasingChecked && !cashChecked) {
		finansowanieError.textContent = 'Proszę wybrać sposób finansowania';
		hasError = true;
	} else {
		finansowanieError.textContent = '';
	}

	const nameInput = document.querySelector('.name');
	const name = nameInput.value.trim();
	const nameError = document.querySelector('.name-error');
	if (name === '' || !name.includes(' ')) {
		nameError.textContent = 'Proszę podać imię i nazwisko oddzielone spacją';
		hasError = true;
	} else {
		nameError.textContent = '';
	}

	const deliveryDateInput = document.querySelector('.delivery-date');
	const deliveryDate = deliveryDateInput.value;
	const deliveryDateError = document.querySelector('.delivery-date-error');
	if (deliveryDate === '') {
		deliveryDateError.textContent = 'Proszę wybrać datę dostawy';
		hasError = true;
	} else {
		deliveryDateError.textContent = '';
	}

	if (!hasError) {
		localStorage.clear();
		window.scrollTo({ top: 0, behavior: 'smooth' });
		if (summaryPopUp) {
			summaryPopUp.style.top = '30px';
		}
	}

	const heroTitle = document.querySelector('.hero-title');
	const heroText = document.querySelector('.hero-text');
	heroTitle.style.zIndex = '-1';
	heroText.style.zIndex = '-1';
};

const closingPopUp = () => {
	summaryPopUp.style.top = '5000px';
	window.location.reload();
};

buyBtn.addEventListener('click', transactionFinalization);
closePopUp.addEventListener('click', closingPopUp);

function validateName() {
	const name = nameInput.value.trim();
	const nameError = document.querySelector('.name-error');
	if (name === '' || !name.includes(' ')) {
		nameError.textContent = 'Proszę podać imię i nazwisko oddzielone spacją';
	} else {
		nameError.textContent = '';
	}
}

function validateFinansowanie() {
	const finansowanieError = document.querySelector('.finansowanie-error');
	if (
		!document.querySelector('.leasing').checked &&
		!document.querySelector('.cash').checked
	) {
		finansowanieError.textContent = 'Proszę wybrać sposób finansowania';
	} else {
		finansowanieError.textContent = '';
	}
}

function validateDeliveryDate() {
	const deliveryDateError = document.querySelector('.delivery-date-error');
	if (deliveryDateInput.value === '') {
		deliveryDateError.textContent = 'Proszę wybrać datę dostawy';
	} else {
		deliveryDateError.textContent = '';
	}
}

nameInput.addEventListener('input', validateName);
finansowanieInputs.forEach((input) =>
	input.addEventListener('input', validateFinansowanie)
);
deliveryDateInput.addEventListener('input', validateDeliveryDate);



// KOPIOWANIE IMIENIA I FINANSOWANIA DO TABELKI PODSUMOWUJĄCEJ

const clientName = document.querySelector('.name');
const nameSummary = document.querySelector('.value-name-summary');

const updateNameSummary = () => {
	localStorage.setItem('clientName', clientName.value);
	nameSummary.textContent = clientName.value;
};

const radioLeasing = document.querySelector('.leasing');
const radioCash = document.querySelector('.cash');
const financeSummary = document.querySelector('.value-finance-summary');

const updateFinanceSummary = () => {
	if (radioLeasing.checked) {
		localStorage.setItem('financeOption', 'Leasing');
		financeSummary.textContent = 'Leasing';
	} else if (radioCash.checked) {
		localStorage.setItem('financeOption', 'Gotówka');
		financeSummary.textContent = 'Gotówka';
	}
};

const loadFromLocalStorage = () => {
	const savedName = localStorage.getItem('clientName');
	const savedFinanceOption = localStorage.getItem('financeOption');
	const savedTotalPrice = localStorage.getItem('totalPrice');
	const savedcarPriceValueSummary = localStorage.getItem(
		'carPriceValueSummary'
	);
	const savedClonedCardSummary = localStorage.getItem('clonedAutoCard');

	if (savedName) {
		clientName.value = savedName;
		nameSummary.textContent = savedName;
	}

	if (savedFinanceOption) {
		if (savedFinanceOption === 'Leasing') {
			radioLeasing.checked = true;
		} else if (savedFinanceOption === 'Gotówka') {
			radioCash.checked = true;
		}
		financeSummary.textContent = savedFinanceOption;
	}

	if (savedTotalPrice) {
		const totalPriceCell = document.querySelector('.value-car-price');
		totalPriceCell.textContent = savedTotalPrice;
	}

	if (savedcarPriceValueSummary) {
		const carPriceValueSummary = document.querySelector(
			'.value-car-price-summary'
		);
		carPriceValueSummary.textContent = savedcarPriceValueSummary;
	}

	if (savedClonedCardSummary) {
		chosenCarSummary.innerHTML = savedClonedCardSummary;
	}
};

clientName.addEventListener('input', updateNameSummary);
radioLeasing.addEventListener('change', updateFinanceSummary);
radioCash.addEventListener('change', updateFinanceSummary);
window.addEventListener('load', loadFromLocalStorage);
