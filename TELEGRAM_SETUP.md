# 📱 Настройка Telegram интеграции

## 🎯 Что нужно сделать

Для полноценной работы сайта замените placeholder-ы на ваши реальные данные Telegram.

## 🔍 Файлы для редактирования

### 1. `public/index.html`
Найдите и замените:
```html
<a href="https://t.me/yourusername" class="btn telegram-btn" target="_blank">
```
На:
```html
<a href="https://t.me/ВАШ_USERNAME" class="btn telegram-btn" target="_blank">
```

### 2. `public/login.html`
```html
<a href="https://t.me/yourusername" class="btn telegram-btn" target="_blank">
```

### 3. `public/portfolio.html`
```html
<a href="https://t.me/yourusername" class="btn telegram-btn" target="_blank">
```

### 4. `public/profile.html`
```html
<a href="https://t.me/yourusername" class="btn telegram-btn" target="_blank">
```

### 5. `public/js/main.js`
Найдите функцию `showTelegramContact` и замените:
```javascript
<a href="https://t.me/yourusername" class="btn telegram-btn" target="_blank">
```

## ⚡ Быстрая замена через командную строку

Используйте эти команды для быстрой замены всех ссылок:

```bash
# Замените YOUR_TELEGRAM_USERNAME на ваш реальный username
sed -i 's/yourusername/YOUR_TELEGRAM_USERNAME/g' public/index.html
sed -i 's/yourusername/YOUR_TELEGRAM_USERNAME/g' public/login.html
sed -i 's/yourusername/YOUR_TELEGRAM_USERNAME/g' public/portfolio.html
sed -i 's/yourusername/YOUR_TELEGRAM_USERNAME/g' public/profile.html
sed -i 's/yourusername/YOUR_TELEGRAM_USERNAME/g' public/js/main.js
```

Например:
```bash
sed -i 's/yourusername/sakura_artist/g' public/index.html
sed -i 's/yourusername/sakura_artist/g' public/login.html
sed -i 's/yourusername/sakura_artist/g' public/portfolio.html
sed -i 's/yourusername/sakura_artist/g' public/profile.html
sed -i 's/yourusername/sakura_artist/g' public/js/main.js
```

## 🤖 Дополнительные возможности

### Telegram Bot (опционально)
Для автоматизации уведомлений о новых заказах можете создать Telegram бота:

1. Найдите @BotFather в Telegram
2. Создайте нового бота командой `/newbot`
3. Получите токен бота
4. Добавьте в `server.js` отправку уведомлений

Пример кода для бота:
```javascript
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('YOUR_BOT_TOKEN');

// Отправка уведомления о новом заказе
function notifyNewOrder(orderData) {
    const message = `
🌸 Новый заказ!
👤 Пользователь: ${orderData.username}
🎨 Стиль: ${orderData.style}
📝 Описание: ${orderData.description}
    `;
    
    bot.sendMessage('YOUR_CHAT_ID', message);
}
```

## ✅ Проверка настройки

После замены ссылок:
1. Перезапустите сервер
2. Проверьте все страницы
3. Убедитесь, что ссылки ведут на ваш профиль

## 📞 Контактная информация

Помните: пользователи будут переходить по этим ссылкам для обсуждения заказов, поэтому важно указать правильный username!