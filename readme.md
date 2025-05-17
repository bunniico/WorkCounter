# Work Meter Application

## Description
This HTML file is a **"Work Meter"** application.  
The application estimates the cost of electricity based on the user's computer power usage, time, and electricity price.

## Features

1. **User Inputs:**
    - Power consumption (in various units such as Watts, Kilowatts, BTU/hour, Horsepower, and Ton). *(Not tested)*
    - Assumed capacity percentage (to account for partial usage).
    - Electricity price per kWh.

2. **Buttons:**
    - **Start** button to begin tracking electricity cost.
    - **Stop** button to halt the tracking process.

3. **Output:**
    - Displays the total cost of electricity usage in real-time.
    - Displays the cost per hour based on the provided inputs.

4. **Dynamic Elements:**
    - Dropdown for selecting power units.
    - Input fields for power value, capacity percentage, and electricity price.

5. **Timer Functionality:**
    - Tracks elapsed time and calculates electricity cost dynamically.
    - Uses `setInterval` to update the cost every 100 milliseconds.

6. **Conversion Functionality:**
    - Converts power values to Watts based on the selected unit.

7. **Footer:**
    - Displays a footer with attribution:  
        `CC0 2025 - Work Meter by Ellie R`

## Notes

- Default values are provided for power (600 Watts), capacity (100%), and electricity price ($0.15 per kWh).
- The application assumes 100% capacity usage unless specified otherwise.
- The cost calculation accounts for the selected power unit and capacity percentage.
- Conversions have not been tested for all units, but the code is structured to handle them.

## Usage

1. Enter the power consumption value and select the appropriate unit.
2. Specify the assumed capacity percentage (optional).
3. Enter the electricity price per kWh.
4. Click **Start** to begin tracking the cost.
5. Click **Stop** to halt the tracking process.

## Dependencies

- No external libraries or frameworks are used.  
    The functionality is implemented using plain HTML, CSS, and JavaScript.
