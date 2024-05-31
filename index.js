const core = require('@actions/core');
const axios = require('axios');

async function getCurrentDateTime(functionUrl) {
    try {
        const response = await axios.get(functionUrl);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to retrieve date and time from Azure Function: ${error.message}`);
    }
}

async function run() {
    try {
        // Get the URL of the Azure Function endpoint from inputs
        const functionUrl = core.getInput('function-url');

        // Call the Azure Function to get the current date and time
        const currentDateTime = await getCurrentDateTime(functionUrl);

        // Set the output with the current date and time
        core.setOutput('current-date-time', currentDateTime);
    } catch (error) {
        // Set failure message if an error occurs
        core.setFailed(error.message);
    }
}

// Execute the action
run();
