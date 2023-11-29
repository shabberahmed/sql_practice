// Corrected imports
const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json())
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'ahmed',
  insecureAuth: true,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/', async (req, res) => {
  try {
    db.query('SELECT * FROM one', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send({ err: `Error from / controller: ${err}` });
      } else {
        console.log('Data retrieved:', data);
        res.status(200).send({ m: data });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: `Error from / controller: ${err}` });
  }
});
app.post('/post', async (req, res) => {
    const { fname, age } = req.body;
    try {
      await db.query('INSERT INTO one (fname, age) VALUES (?, ?)', [fname, age]);
      res.send("Data posted successfully");
    } catch (err) {
      console.error("Error while inserting data:", err);
      res.status(500).send("An error occurred while processing the request");
    }
  });
  app.put('/update/:age', async (req, res) => {
    const { fname } = req.body;
    const { age } = req.params;
    try {
        await db.query('UPDATE one SET fname = ? WHERE age = ?', [fname, age]);
        res.send('done update');
    } catch (err) {
        res.send(err);
    }
});



app.listen(1010, () => console.log('Server started on port 1010'));
