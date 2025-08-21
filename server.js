const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "요청이 너무 많습니다. 1분 후 다시 시도해주세요."
  }
});

app.use('/api/', limiter);

app.get('/api/hello', (req, res) => {
  res.json({ message: '안녕하세요 from Node.js!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
