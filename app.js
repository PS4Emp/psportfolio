const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static('.'));

const countFile = 'count.txt';  // Count stored in the same directory

const getCount = () => {
    try {
        const data = fs.readFileSync(countFile, 'utf8');
        return parseInt(data, 10);
    } catch (err) {
        return 0; // Default to zero if not found
    }
};

const saveCount = (count) => {
    fs.writeFileSync(countFile, count.toString(), 'utf8');
};

app.get('/visit', (req, res) => {
    let visitorCount = getCount();
    visitorCount++;  // Increment the count
    saveCount(visitorCount);  // Save the new count
    res.json({ visitorCount });  // Send the count to the client
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
