#!/bin/bash

echo "🤖 Запуск Telegram IP Info Bot..."
echo ""
echo "⚠️  ВАЖНО: Перед запуском установите токен бота в файле bot.py"
echo "📝 Как получить токен:"
echo "1. Найдите @BotFather в Telegram"
echo "2. Отправьте команду /newbot"
echo "3. Следуйте инструкциям"
echo "4. Скопируйте полученный токен в переменную BOT_TOKEN в файле bot.py"
echo ""
echo "📦 Установка зависимостей для бота..."

pip install --break-system-packages pyTelegramBotAPI

echo ""
echo "🚀 Запуск бота..."
echo "Для остановки нажмите Ctrl+C"
echo ""

python bot.py