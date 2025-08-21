const express = require('express');
const cors = require('cors');
const app = express();

const ipCounts = {};
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 35;

app.use(cors());

app.use((req, res, next) => {
  const ip = req.ip;

  if (!ipCounts[ip]) {
    ipCounts[ip] = { count: 1, startTime: Date.now() };
  } else {
    if (Date.now() - ipCounts[ip].startTime > WINDOW_MS) {
      ipCounts[ip] = { count: 1, startTime: Date.now() };
    } else {
      ipCounts[ip].count++;
    }
  }

  if (ipCounts[ip].count > MAX_REQUESTS) {
    return res.status(429).send('Too many requests - try again later');
  }

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Server 연결됌' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
