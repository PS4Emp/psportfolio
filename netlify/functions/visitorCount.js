// netlify/functions/visitorCount.js
exports.handler = async function(event, context) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join('/tmp', 'count.txt');

    try {
        let count = 1;
        if (fs.existsSync(filePath)) {
            count = parseInt(fs.readFileSync(filePath, 'utf8')) + 1;
        }
        fs.writeFileSync(filePath, count.toString());
        return {
            statusCode: 200,
            body: JSON.stringify({ visitorCount: count })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to read or write count' })
        };
    }
};
