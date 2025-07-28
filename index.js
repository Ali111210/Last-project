const express = require('express');
const cors = require('cors');
const pool = require('./pool');  1
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post('/api/register', async (req, res) => {
  const { username, email, city, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Бұл email бұрын тіркелген' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO users (username, email, city, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, city, hashedPassword]
    );

    res.status(201).json({ message: 'Тіркелу сәтті өтті!' });
  } catch (err) {
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Email табылмады' });
    }

    const validPass = await bcrypt.compare(password, user.rows[0].password);
    if (!validPass) {
      return res.status(400).json({ message: 'Құпия сөз қате' });
    }

    
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Кіру сәтті өтті!', token });
  } catch (err) {
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
  }
});

app.get('/api/workers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Қателік пайда болды', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер ${PORT} портында жұмыс істеп тұр`);
});
