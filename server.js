const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Настройка базы данных
const db = new sqlite3.Database('database.db');

// Создание таблиц
db.serialize(() => {
  // Таблица пользователей
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Таблица заказов
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    style TEXT NOT NULL,
    type TEXT NOT NULL,
    height TEXT NOT NULL,
    description TEXT,
    reference_images TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Таблица портфолио
  db.run(`CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_path TEXT NOT NULL,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Настройка middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'sakura-art-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Middleware для проверки авторизации
function requireAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Маршруты
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

app.get('/order', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order.html'));
});

app.get('/profile', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// API для получения портфолио
app.get('/api/portfolio', (req, res) => {
  db.all('SELECT * FROM portfolio ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API для регистрации
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
      [username, email, hashedPassword], function(err) {
      if (err) {
        res.status(400).json({ error: 'Пользователь с таким именем или email уже существует' });
        return;
      }
      res.json({ success: true, message: 'Регистрация успешна' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// API для входа
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка сервера' });
      return;
    }
    
    if (!user) {
      res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
      return;
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
      return;
    }
    
    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ success: true, message: 'Вход выполнен успешно' });
  });
});

// API для выхода
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка при выходе' });
      return;
    }
    res.json({ success: true });
  });
});

// API для создания заказа
app.post('/api/order', requireAuth, (req, res) => {
  const { style, type, height, description } = req.body;
  const userId = req.session.userId;
  
  db.run('INSERT INTO orders (user_id, style, type, height, description) VALUES (?, ?, ?, ?, ?)', 
    [userId, style, type, height, description], function(err) {
    if (err) {
      res.status(500).json({ error: 'Ошибка при создании заказа' });
      return;
    }
    res.json({ success: true, orderId: this.lastID });
  });
});

// API для получения заказов пользователя
app.get('/api/my-orders', requireAuth, (req, res) => {
  const userId = req.session.userId;
  
  db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API для проверки авторизации
app.get('/api/auth-status', (req, res) => {
  if (req.session.userId) {
    res.json({ 
      authenticated: true, 
      username: req.session.username 
    });
  } else {
    res.json({ authenticated: false });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});