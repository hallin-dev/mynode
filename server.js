const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: '작동 돼누' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
