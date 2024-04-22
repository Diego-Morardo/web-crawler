const fs = require('fs');

const writeToJsonFile = (data, url) => {
    try {
        const { hostname } = new URL(url);
        const jsonData = JSON.stringify(data, null, 2);
        const timestamp = Date.now();
        const path = `./results/${hostname}_${timestamp}.json`;
        fs.writeFileSync(path, jsonData);
        console.log(`Data successfully written to ${path}`);
    } catch (error) {
        console.error('Error writting data to file: ', error);
    }
};

module.exports = { writeToJsonFile };