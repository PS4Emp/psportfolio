const express = require('express');
const app = express();
let visitorCount = 0;

app.get('/visit', (req, res) => {
    visitorCount++;
    res.json({ visitorCount });
});

app.listen(3000, () => console.log('Server is running on port 3000'));

