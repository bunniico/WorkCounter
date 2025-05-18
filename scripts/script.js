var DEFAULT_INTERVAL = 1000;
var SECONDS_IN_HOUR = 3600;
var WATTS_IN_KILOWATTS = 1000;
var startButton = document.getElementById('startButton');
var pauseButton = document.getElementById('pauseButton');
var resetButton = document.getElementById('resetButton');
var stopButton = document.getElementById('stopButton');
var powerInput = document.getElementById('powerUsage');
var priceInput = document.getElementById('costPerKWh');
var costDisplay = document.getElementById('costDisplay');
var timeDisplay = document.getElementById('timeDisplay');
var costPerHourDisplay = document.getElementById('costPerHourDisplay');
var powerUsedDisplay = document.getElementById('powerUsedDisplay');
var timer = null;
// Wait for DOM before adding listeners
document.addEventListener('DOMContentLoaded', function () {
    initializeUI();
});
function initializeUI() {
    if (!startButton) {
        throw new Error('Start button not found');
    }
    if (!stopButton) {
        throw new Error('Stop button not found');
    }
    if (!pauseButton) {
        throw new Error('Pause button not found');
    }
    if (!resetButton) {
        throw new Error('Reset button not found');
    }
    if (!powerInput) {
        throw new Error('Power input not found');
    }
    if (!priceInput) {
        throw new Error('Price input not found');
    }
    if (!costDisplay) {
        throw new Error('Cost display not found');
    }
    if (!costPerHourDisplay) {
        throw new Error('Cost per hour display not found');
    }
    if (!timeDisplay) {
        throw new Error('Time display not found');
    }
    if (!powerUsedDisplay) {
        throw new Error('Power used display not found');
    }
    startButton.addEventListener('click', function () {
        var startTime = Date.now();
        startButton.disabled = true;
        stopButton.disabled = false;
        var powerValue = parseFloat(powerInput.value);
        var pricePerKWh = parseFloat(priceInput.value);
        if (isNaN(powerValue) || powerValue <= 0) {
            alert('Please enter a valid power value.');
            return;
        }
        if (isNaN(pricePerKWh) || pricePerKWh <= 0) {
            alert('Please enter a valid electricity price.');
            return;
        }
        // TODO: Allow for conversion
        var powerInWatts = powerValue;
        timer = setInterval(function () {
            var elapsedTime = (Date.now() - startTime) / WATTS_IN_KILOWATTS;
            var costPerSecond = (powerInWatts / WATTS_IN_KILOWATTS) * (pricePerKWh / SECONDS_IN_HOUR);
            var costPerHour = costPerSecond * SECONDS_IN_HOUR;
            costDisplay.textContent = "$" + (costPerSecond * elapsedTime).toFixed(4);
            costDisplay.textContent = "$".concat((costPerSecond * elapsedTime).toFixed(4));
            timeDisplay.textContent = "".concat(Math.floor(elapsedTime / 3600), "h ").concat(Math.floor((elapsedTime % 3600) / 60), "m ").concat(Math.floor(elapsedTime % 60), "s");
            costPerHourDisplay.textContent = "".concat(costPerHour);
            powerUsedDisplay.textContent = "".concat((powerInWatts * elapsedTime / SECONDS_IN_HOUR).toFixed(4));
        }, DEFAULT_INTERVAL);
    });
    stopButton.addEventListener('click', function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        else {
            alert('Error: Timer is not running.');
        }
        startButton.disabled = false;
        stopButton.disabled = true;
    });
}
