import telebot
import requests
import json
from datetime import datetime

# Замените на ваш токен бота
BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"
bot = telebot.TeleBot(BOT_TOKEN)

def get_ip_info(ip=None):
    """Получает информацию об IP адресе"""
    if not ip:
        # Получаем IP отправителя (это будет IP сервера, где запущен бот)
        try:
            response = requests.get('https://api.ipify.org?format=json')
            ip = response.json()['ip']
        except:
            return "Не удалось получить IP адрес"
    
    try:
        # Получаем информацию о местоположении
        response = requests.get(f'http://ip-api.com/json/{ip}', timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data['status'] == 'success':
                return f"""
🌐 **Информация об IP: {ip}**

📍 **Местоположение:**
• Страна: {data.get('country', 'Неизвестно')}
• Город: {data.get('city', 'Неизвестно')}
• Регион: {data.get('regionName', 'Неизвестно')}
• Провайдер: {data.get('isp', 'Неизвестно')}

🌍 **Координаты:**
• Широта: {data.get('lat', 'Неизвестно')}
• Долгота: {data.get('lon', 'Неизвестно')}

⏰ **Время запроса:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
            else:
                return f"❌ Не удалось получить информацию для IP: {ip}"
        else:
            return f"❌ Ошибка при получении информации для IP: {ip}"
    except Exception as e:
        return f"❌ Ошибка: {str(e)}"

@bot.message_handler(commands=['start'])
def send_welcome(message):
    """Обработчик команды /start"""
    welcome_text = """
🤖 **IP Info Bot**

Привет! Я бот для получения информации об IP адресах.

**Доступные команды:**
/start - Показать это сообщение
/ip - Получить информацию о вашем IP
/help - Показать справку

**Использование:**
Просто отправьте мне IP адрес, и я покажу информацию о нем!
"""
    bot.reply_to(message, welcome_text, parse_mode='Markdown')

@bot.message_handler(commands=['help'])
def send_help(message):
    """Обработчик команды /help"""
    help_text = """
📖 **Справка по использованию**

**Команды:**
/start - Начать работу с ботом
/ip - Получить информацию о вашем IP
/help - Показать эту справку

**Как использовать:**
1. Отправьте команду /ip для получения информации о вашем IP
2. Или просто отправьте любой IP адрес для получения информации о нем

**Примеры:**
• Отправьте: `8.8.8.8` - получите информацию о Google DNS
• Отправьте: `/ip` - получите информацию о вашем IP
"""
    bot.reply_to(message, help_text, parse_mode='Markdown')

@bot.message_handler(commands=['ip'])
def send_ip_info(message):
    """Обработчик команды /ip"""
    bot.reply_to(message, "🔍 Получаю информацию о вашем IP...")
    info = get_ip_info()
    bot.reply_to(message, info, parse_mode='Markdown')

@bot.message_handler(func=lambda message: True)
def handle_ip_address(message):
    """Обработчик IP адресов"""
    text = message.text.strip()
    
    # Простая проверка на IP адрес
    if text.count('.') == 3 and all(part.isdigit() and 0 <= int(part) <= 255 for part in text.split('.')):
        bot.reply_to(message, f"🔍 Получаю информацию об IP: {text}")
        info = get_ip_info(text)
        bot.reply_to(message, info, parse_mode='Markdown')
    else:
        bot.reply_to(message, """
❓ **Неизвестная команда или неверный IP адрес**

**Доступные команды:**
/start - Начать работу
/ip - Получить информацию о вашем IP
/help - Показать справку

**Для получения информации об IP:**
Отправьте IP адрес в формате: `192.168.1.1`
""", parse_mode='Markdown')

if __name__ == "__main__":
    print("🤖 Запуск Telegram бота...")
    print("📡 Бот готов к работе!")
    print("⚠️  Не забудьте установить токен бота в переменной BOT_TOKEN")
    print("")
    
    if BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("❌ Ошибка: Установите токен бота в переменной BOT_TOKEN")
        print("📝 Как получить токен:")
        print("1. Найдите @BotFather в Telegram")
        print("2. Отправьте команду /newbot")
        print("3. Следуйте инструкциям")
        print("4. Скопируйте полученный токен в переменную BOT_TOKEN")
    else:
        try:
            bot.polling(none_stop=True)
        except Exception as e:
            print(f"❌ Ошибка при запуске бота: {e}")