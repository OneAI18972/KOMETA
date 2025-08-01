const TelegramBot = require('node-telegram-bot-api');

// Токен вашего бота
const token = '8210673104:AAH1ACvZkYEl3pw7IYm7vn2du-B4Bqb8NqM';

// Создаем бота
const bot = new TelegramBot(token, {polling: true});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const keyboard = {
        inline_keyboard: [
            [{text: '💌 У вас новое письмо', callback_data: 'letter'}],
            [{text: '💖 Показать анимацию', callback_data: 'animation'}]
        ]
    };
    
    const welcomeText = '🎀 Привет, дорогая! 🎀\n\nУ меня есть для тебя что-то особенное! 💕';
    
    bot.sendMessage(chatId, welcomeText, {
        reply_markup: keyboard
    });
});

// Обработчик нажатий на кнопки
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    
    if (query.data === 'letter') {
        const letterText = `
💌 *Дорогая nikswiq* 💌

Мы недавно узнали, что у вас все украли в Murder Mystery 2, и нам стало вас очень жалко 💔

Так как, по всей видимости, о сей данной и неприятной ситуации нам рассказал ваш супруг, обсудив все, мы пришли к общему выводу, что будем все возвращать вам по частям 💎

Потому что мы знали, как вам дорог был тот инвентарь, и то, насколько вы долго добивались его... ⭐

И еще, хочу вас попросить, не держать обиду на вашего мужа, так как он и так очень сильно старается ради вас, даже пошел на такие жертвы, чтобы у вас снова была улыбка на личике, когда вы играете в Murder! 😊💕

*С любовью и заботой* 💖
        `;
        
        bot.editMessageText(letterText, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown'
        });
    } else if (query.data === 'animation') {
        await showAnimation(chatId, messageId);
    }
});

// Функция показа анимации
async function showAnimation(chatId, messageId) {
    const animationFrames = [
        `
💖💕💗💓💝💘💞💟

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

💟💞💘💝💓💗💕💖
        `,
        `
💕💗💓💝💘💞💟💖

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

💖💟💞💘💝💓💗💕
        `,
        `
💗💓💝💘💞💟💖💕

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

💕💖💟💞💘💝💓💗
        `,
        `
💓💝💘💞💟💖💕💗

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

💗💕💖💟💞💘💝💓
        `,
        `
💝💘💞💟💖💕💗💓

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

💓💗💕💖💟💞💘💝
        `
    ];
    
    // Показываем каждый кадр анимации
    for (let i = 0; i < animationFrames.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        bot.editMessageText(animationFrames[i], {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown'
        });
    }
    
    // Финальный кадр
    const finalText = `
💖💕💗💓💝💘💞💟

💖 *ТВОЙ МУЖ, РОМОЧКА* 💖

💟💞💘💝💓💗💕💖
    `;
    
    bot.editMessageText(finalText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'Markdown'
    });
}

console.log('🤖 Бот запущен! Нажмите Ctrl+C для остановки.');