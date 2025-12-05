const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

const loginAttempts = new Map();

const login = async (req, res) => {
  const { username, password, captchaId, captchaText } = req.body;
  
  const attemptKey = username;
  const attempts = loginAttempts.get(attemptKey) || { count: 0, lastAttempt: 0 };
  
  if (attempts.count >= 3) {
    if (!captchaId || !captchaText) {
      return res.status(400).json({ error: 'Se requiere captcha después de 3 intentos fallidos' });
    }
    
    const { captchaStore } = require('./captchaController');
    const stored = captchaStore.get(captchaId);
    if (!stored || stored.text !== captchaText.toLowerCase()) {
      return res.status(400).json({ error: 'CAPTCHA inválido' });
    }
  }
  
  const delay = attempts.count > 0 ? Math.min(Math.pow(2, attempts.count - 1) * 1000, 8000) : 0;
  
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  const query = `SELECT * FROM users WHERE username = ?`;
  
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    
    if (results.length === 0) {
      attempts.count++;
      attempts.lastAttempt = Date.now();
      loginAttempts.set(attemptKey, attempts);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      attempts.count++;
      attempts.lastAttempt = Date.now();
      loginAttempts.set(attemptKey, attempts);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    loginAttempts.delete(attemptKey);
    
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET || 'supersecret123'
    );
    
    res.json({ token, username: user.username });
  });
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.json({ message: 'Usuario registrado con éxito' });
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
    req.session.userId = decoded.id;
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const checkUsername = (req, res) => {
  const { username } = req.body;
  
  const query = 'SELECT COUNT(*) as count FROM users WHERE username = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar usuario' });
    }
    
    const exists = results[0].count > 0;
    
    setTimeout(() => {
      res.json({ exists });
    }, 100);
  });
};

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername
};
