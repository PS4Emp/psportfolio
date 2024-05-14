const headers = {
    'Access-Control-Allow-Origin': 'https://ps4emp.github.io', // Adjust this to allow your GitHub Pages domain
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

exports.handler = async function(event, context) {
    if (event.httpMethod === 'OPTIONS') {
        // CORS preflight request
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Main function logic here
    // Assuming we are incrementing a visitor count
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join('/tmp', 'count.txt');

    try {
        let count = 1;
        if (fs.existsSync(filePath)) {
            count = parseInt(fs.readFileSync(filePath, 'utf8')) + 1;
        }
        fs.writeFileSync(filePath, count.toString());

        // Return the updated count with CORS headers
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ visitorCount: count })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to read or write count' })
        };
    }
};
