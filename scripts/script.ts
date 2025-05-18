// Constants
const DEFAULT_INTERVAL = 1000;
const SECONDS_IN_HOUR = 3600;
const WATTS_IN_KILOWATTS = 1000;

// DOM elements
const startButton: HTMLButtonElement | null = document.getElementById('startButton') as HTMLButtonElement | null;
const pauseButton: HTMLButtonElement | null = document.getElementById('pauseButton') as HTMLButtonElement | null;
const resetButton: HTMLButtonElement | null = document.getElementById('resetButton') as HTMLButtonElement | null;
const stopButton: HTMLButtonElement | null = document.getElementById('stopButton') as HTMLButtonElement | null;
const powerInput: HTMLInputElement | null = document.getElementById('powerUsage') as HTMLInputElement | null;
const priceInput: HTMLInputElement | null = document.getElementById('costPerKWh') as HTMLInputElement | null;
const costDisplay: HTMLSpanElement | null = document.getElementById('costDisplay') as HTMLSpanElement | null;
const timeDisplay: HTMLSpanElement | null = document.getElementById('timeDisplay') as HTMLSpanElement | null;
const costPerHourDisplay: HTMLSpanElement | null = document.getElementById('costPerHourDisplay') as HTMLSpanElement | null;
const powerUsedDisplay = document.getElementById('powerUsedDisplay') as HTMLSpanElement | null;
let timer: number | null = null;

// Wait for DOM before adding listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
});

/**
 * Initializes the user interface by setting up event listeners for the main control buttons
 * (start, stop, pause, reset) and validating the presence of required DOM elements.
 * 
 * - Throws an error if any required UI element is not found.
 * - Handles the logic for starting and stopping a timer that calculates and displays:
 *   - Elapsed time
 *   - Power used
 *   - Cost incurred
 *   - Cost per hour
 * - Validates user input for power and electricity price before starting the timer.
 * - Updates the UI with real-time calculations at a defined interval.
 * 
 * @throws {Error} If any required DOM element is missing.
 */
function initializeUI()
{
    if (!startButton) { throw new Error('Start button not found'); }
    if (!stopButton) { throw new Error('Stop button not found'); }
    if (!pauseButton) { throw new Error('Pause button not found'); }
    if (!resetButton) { throw new Error('Reset button not found'); }
    if (!powerInput) { throw new Error('Power input not found'); }
    if (!priceInput) { throw new Error('Price input not found'); }
    if (!costDisplay) { throw new Error('Cost display not found'); }
    if (!costPerHourDisplay) { throw new Error('Cost per hour display not found'); }
    if (!timeDisplay) { throw new Error('Time display not found'); }
    if (!powerUsedDisplay) { throw new Error('Power used display not found'); }

    startButton.addEventListener('click', () => {
        if (timer) {
            alert('Error: Timer is already running.');
            return;
        }

        const startTime = Date.now();

        // Toggle button states
        toggleButtons();

        // Get form values
        const powerValue = parseFloat(powerInput.value);
        const pricePerKWh = parseFloat(priceInput.value);

        // Validate input values
        if (isNaN(powerValue) || powerValue <= 0) {
            alert('Please enter a valid power value.');
            return;
        }

        if (isNaN(pricePerKWh) || pricePerKWh <= 0) {
            alert('Please enter a valid electricity price.');
            return;
        }
        
        // TODO: Allow for conversion
        const powerInWatts = powerValue;

        // Start the timer
        timer = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / WATTS_IN_KILOWATTS;
            const costPerSecond = (powerInWatts / WATTS_IN_KILOWATTS) * (pricePerKWh / SECONDS_IN_HOUR);
            const costPerHour = costPerSecond * SECONDS_IN_HOUR;

            updateCostDisplay();
            updateTimeDisplay();
            updateCostPerHourDisplay();
            updatePowerUsedDisplay();

            function updateCostDisplay() {
                if (!costDisplay) { throw new Error('Cost display not found'); }
                costDisplay.textContent = `$${(costPerSecond * elapsedTime).toFixed(4)}`;
            }

            function updateTimeDisplay() {
                if (!timeDisplay) { throw new Error('Time display not found'); }
                timeDisplay.textContent = `${Math.floor(elapsedTime / 3600)}h ${Math.floor((elapsedTime % 3600) / 60)}m ${Math.floor(elapsedTime % 60)}s`;
            }

            function updateCostPerHourDisplay() {
                if (!costPerHourDisplay) { throw new Error('Cost per hour display not found'); }
                costPerHourDisplay.textContent = `${costPerHour}`;
            }

            function updatePowerUsedDisplay() {
                if (!powerUsedDisplay) { throw new Error('Power used display not found'); }
                powerUsedDisplay.textContent = `${(powerInWatts * elapsedTime / SECONDS_IN_HOUR).toFixed(4)}`;
            }
        }, DEFAULT_INTERVAL); 
    });

    stopButton.addEventListener('click', () => {
        if (timer){
            clearInterval(timer);
            timer = null;
        }
        else{
            alert('Error: Timer is not running.');
        }
        toggleButtons();
});
}

function toggleButtons()
{
    if (startButton && stopButton) {
        startButton.disabled = !startButton.disabled;
        stopButton.disabled = !stopButton.disabled;
    }
}