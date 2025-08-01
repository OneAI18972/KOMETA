import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, CallbackContext
import random

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(s)s',
    level=logging.INFO
)

# Токен вашего бота
TOKEN = "8210673104:AAH1ACvZkYEl3pw7IYm7vn2du-B4Bqb8NqM"

def start(update: Update, context: CallbackContext) -> None:
    """Обработчик команды /start"""
    keyboard = [
        [InlineKeyboardButton("💌 У вас новое письмо", callback_data='letter')],
        [InlineKeyboardButton("💖 Показать анимацию", callback_data='animation')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = "🎀 Привет, дорогая! 🎀\n\nУ меня есть для тебя что-то особенное! 💕"
    
    update.message.reply_text(welcome_text, reply_markup=reply_markup)

def button_handler(update: Update, context: CallbackContext) -> None:
    """Обработчик нажатий на кнопки"""
    query = update.callback_query
    query.answer()
    
    if query.data == 'letter':
        show_letter(query)
    elif query.data == 'animation':
        show_animation(query)

def show_letter(query) -> None:
    """Показать письмо"""
    letter_text = """
💌 *Дорогая nikswiq* 💌

Мы недавно узнали, что у вас все украли в Murder Mystery 2, и нам стало вас очень жалко 💔

Так как, по всей видимости, о сей данной и неприятной ситуации нам рассказал ваш супруг, обсудив все, мы пришли к общему выводу, что будем все возвращать вам по частям 💎

Потому что мы знали, как вам дорог был тот инвентарь, и то, насколько вы долго добивались его... ⭐

И еще, хочу вас попросить, не держать обиду на вашего мужа, так как он и так очень сильно старается ради вас, даже пошел на такие жертвы, чтобы у вас снова была улыбка на личике, когда вы играете в Murder! 😊💕

*С любовью и заботой* 💖
"""
    
    query.edit_message_text(
        text=letter_text,
        parse_mode='Markdown'
    )

def show_animation(query) -> None:
    """Показать анимацию с информацией о создателе"""
    hearts = ["💖", "💕", "💗", "💓", "💝", "💘", "💞", "💟"]
    
    # Создаем анимацию с сердечками
    for i in range(5):
        # Случайно выбираем сердечки для анимации
        heart_line1 = " ".join(random.choices(hearts, k=8))
        heart_line2 = " ".join(random.choices(hearts, k=8))
        
        animation_text = f"""
{heart_line1}
{heart_line2}

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

{heart_line2}
{heart_line1}
"""
        
        query.edit_message_text(
            text=animation_text,
            parse_mode='Markdown'
        )
        
        # Пауза между кадрами анимации
        import time
        time.sleep(0.8)
    
    # Финальный кадр
    final_text = """
💖💕💗💓💝💘💞💟

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

💟💞💘💝💓💗💕💖
"""
    
    query.edit_message_text(
        text=final_text,
        parse_mode='Markdown'
    )

def main() -> None:
    """Запуск бота"""
    # Создаем updater
    updater = Updater(TOKEN)
    
    # Получаем dispatcher для регистрации обработчиков
    dispatcher = updater.dispatcher
    
    # Добавляем обработчики
    dispatcher.add_handler(CommandHandler("start", start))
    dispatcher.add_handler(CallbackQueryHandler(button_handler))
    
    # Запускаем бота
    print("🤖 Бот запущен! Нажмите Ctrl+C для остановки.")
    updater.start_polling()
    
    # Держим бота запущенным
    updater.idle()

if __name__ == '__main__':
    main()