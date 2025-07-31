#!/bin/bash

echo "🌐 Запуск IP Info Tracker..."
echo "📡 Приложение будет доступно по адресу: http://localhost:5000"
echo "🔗 API endpoints:"
echo "   - http://localhost:5000/api/info (полная информация)"
echo "   - http://localhost:5000/api/ip (только IP)"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo ""

python app.py