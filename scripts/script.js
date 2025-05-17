
const DEFAULT_PRICE_PER_KWH = '0.15'; // Default price per kWh
let startTime = null;
let timer = null;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const costDisplay = document.getElementById('cost');
const costPerHourDisplay = document.getElementById('costPerHour');
const powerInput = document.createElement('input');

powerInput.type = 'number';
powerInput.placeholder = 'Enter power';
powerInput.id = 'powerInput';
powerInput.style.marginBottom = '10px';
powerInput.defaultValue = '600';

const unitSelect = document.createElement('select');
unitSelect.id = 'unitSelect';
unitSelect.style.marginLeft = '10px';

const units = [
    { value: 'watts', label: 'Watts', default: '600'},
    { value: 'kilowatts', label: 'Kilowatts' },
    { value: 'btu', label: 'BTU/hour' },
    { value: 'horsepower', label: 'Horsepower' },
    { value: 'ton', label: 'Ton' }
];

units.forEach(unit => {
    const option = document.createElement('option');
    option.value = unit.value;
    option.textContent = unit.label;
    unitSelect.appendChild(option);
});

const capacityInput = document.createElement('input');
capacityInput.type = 'number';
capacityInput.placeholder = 'Assumed capacity (%)';
capacityInput.id = 'capacityInput';
capacityInput.style.marginBottom = '10px';
capacityInput.defaultValue = '100';
capacityInput.style.marginLeft = '10px';
capacityInput.style.width = '50px';
capacityInput.style.textAlign = 'center';
capacityInput.style.marginRight = '1%';
capacityInput.max = '100';
capacityInput.min = '0';

const capacityLabel = document.createElement('label');
capacityLabel.textContent = 'Assumed capacity (%): ';
capacityLabel.setAttribute('for', 'capacityInput');
capacityLabel.style.marginRight = '10px';
capacityLabel.style.fontSize = '16px';
capacityLabel.style.fontWeight = 'bold';
capacityLabel.style.marginLeft = '10px';
capacityLabel.style.marginBottom = '10px';
capacityLabel.style.display = 'inline-block';
capacityLabel.style.width = '200px';

const costPerHourLabel = document.createElement('label');
costPerHourLabel.textContent = 'Cost per hour: ';
costPerHourLabel.setAttribute('for', 'costPerHour');
costPerHourLabel.style.marginRight = '10px';

const container = document.querySelector('.container');
container.insertBefore(powerInput, startButton);
container.insertBefore(capacityInput, powerInput);
container.insertBefore(unitSelect, startButton);
container.insertBefore(capacityLabel, capacityInput);

const priceInput = document.createElement('input');
priceInput.type = 'number';
priceInput.placeholder = 'Price per kWh ($)';
priceInput.id = 'priceInput';
priceInput.style.marginBottom = '10px';
priceInput.style.marginLeft = '10px';
priceInput.style.width = '100px';
priceInput.style.textAlign = 'center';
priceInput.defaultValue = DEFAULT_PRICE_PER_KWH; // Default price per kWh
priceInput.step = '0.01';
priceInput.min = '0';

const priceLabel = document.createElement('label');
priceLabel.textContent = 'Electricity price ($/kWh): ';
priceLabel.setAttribute('for', 'priceInput');
priceLabel.style.marginRight = '10px';
priceLabel.style.fontSize = '16px';
priceLabel.style.fontWeight = 'bold';
priceLabel.style.marginLeft = '10px';
priceLabel.style.marginBottom = '10px';
priceLabel.style.display = 'inline-block';
priceLabel.style.width = '250px';

container.insertBefore(priceInput, capacityLabel);
container.insertBefore(priceLabel, priceInput);
/**
 * Converts the given power value to watts based on the specified unit.
 * If no valid unit is provided, it assumes the value is already in watts.
 * @param {number} value - The power value to convert.
 * @param {string} unit - The unit of the power value (e.g., 'kilowatts', 'btu', etc.).
 * @returns {number} - The power value converted to watts.
 */
function convertPowerToWatts(value, unit) {
    switch (unit) {
    case 'kilowatts':
        return value * 1000;
    case 'btu':
        return value * 0.29307107;
    case 'horsepower':
        return value * 745.7;
    case 'ton':
        return value * 3516.85284;
    default:
        return value; // Assume watts
    }
}

startButton.addEventListener('click', () => {
    startTime = Date.now();
    startButton.disabled = true;
    stopButton.disabled = false;

    const powerValue = parseFloat(powerInput.value);
    const selectedUnit = unitSelect.value;
    const pricePerKWh = parseFloat(priceInput.value);

    if (Number.isNaN(powerValue) || powerValue <= 0) {
        alert('Please enter a valid power value.');
        return;
    }

    if (Number.isNaN(pricePerKWh) || pricePerKWh <= 0) {
        alert('Please enter a valid electricity price.');
        return;
    }
    
        const powerInWatts = convertPowerToWatts(powerValue, selectedUnit);
        const costPerSecond = (powerInWatts / 1000) * (pricePerKWh / 3600);

        timer = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
            const elapsedCost = elapsedTime * costPerSecond;
            const adjustedCost = elapsedCost * parseFloat(capacityInput.value) / 100;
            const capacityFactor = parseFloat(capacityInput.value) / 100;
            const hourlyCost = costPerSecond * 3600;
            const adjustedHourlyCost = hourlyCost * capacityFactor;
            costDisplay.textContent = `$${adjustedCost.toFixed(4)}`;

            costPerHour = parseFloat(adjustedHourlyCost.toFixed(4));
            costPerHourDisplay.textContent = `$${costPerHour}`;
        }, 100); 
});

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    startButton.disabled = false;
    stopButton.disabled = true;
});

const footer = document.createElement('footer');
footer.style.marginTop = '50px';
footer.style.padding = '10px';
footer.style.backgroundColor = '#ddd';
footer.style.fontSize = '14px';
footer.textContent = 'CC0 2025 - Work Meter by Ellie R';
document.body.appendChild(footer);