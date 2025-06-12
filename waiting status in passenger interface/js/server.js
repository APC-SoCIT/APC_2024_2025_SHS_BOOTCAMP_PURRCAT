const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let waitingCountAPC = 1; // Initial count

app.post('/updateCount', (req, res) => {
    waitingCountAPC++; // Increment count
    res.send({ success: true, count: waitingCountAPC });
});

app.get('/getCount', (req, res) => {
    res.send({ count: waitingCountAPC });
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));

