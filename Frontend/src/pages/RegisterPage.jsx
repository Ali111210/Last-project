import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import workerImage from '../assets/worker-human2.png'; 


export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !city) {
      setError('Барлық өрістерді толтырыңыз');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/register', {
        username, email, password, city
      });
      alert('Тіркелу сәтті өтті!');
    } catch (err) {
      setError('Қате тіркелу кезінде');
    }
  };

  return (
     <div className='register-root'>
      <div className='register-left'>
        <img src={workerImage} alt="Worker" className="worker-img" />
        <div className="worker-shadow"></div>
      </div>
      <div className='register-right'>
        <div className="register-container">
          <h2>Тіркелу</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Атыңыз"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Қалаңыз (мыс: Алматы)"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="password"
              placeholder="Құпия сөз"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Тіркелу</button>
          </form>
          <p>Аккаунтыңыз бар ма? <Link to="/">Кіру</Link></p>
        </div>
      </div>
    </div>
  );
}
