#!/bin/bash

# Цвета для красивого вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Функция для очистки экрана
clear_screen() {
    clear
}

# Функция для показа приветствия
show_welcome() {
    clear_screen
    echo -e "${PURPLE}"
    echo "🎀 Привет, дорогая! 🎀"
    echo ""
    echo "У меня есть для тебя что-то особенное! 💕"
    echo -e "${NC}"
    echo ""
    echo "Выберите опцию:"
    echo "1. 💌 У вас новое письмо"
    echo "2. 💖 Показать анимацию"
    echo "3. ❌ Выход"
    echo ""
    read -p "Введите номер (1-3): " choice
}

# Функция для показа письма
show_letter() {
    clear_screen
    echo -e "${RED}"
    echo "💌 Дорогая nikswiq 💌"
    echo -e "${NC}"
    echo ""
    echo "Мы недавно узнали, что у вас все украли в Murder Mystery 2, и нам стало вас очень жалко 💔"
    echo ""
    echo "Так как, по всей видимости, о сей данной и неприятной ситуации нам рассказал ваш супруг, обсудив все, мы пришли к общему выводу, что будем все возвращать вам по частям 💎"
    echo ""
    echo "Потому что мы знали, как вам дорог был тот инвентарь, и то, насколько вы долго добивались его... ⭐"
    echo ""
    echo "И еще, хочу вас попросить, не держать обиду на вашего мужа, так как он и так очень сильно старается ради вас, даже пошел на такие жертвы, чтобы у вас снова была улыбка на личике, когда вы играете в Murder! 😊💕"
    echo ""
    echo -e "${RED}С любовью и заботой 💖${NC}"
    echo ""
    read -p "Нажмите Enter для возврата в меню..."
}

# Функция для показа анимации
show_animation() {
    clear_screen
    
    # Массив кадров анимации
    frames=(
        "💖💕💗💓💝💘💞💟"
        "💕💗💓💝💘💞💟💖"
        "💗💓💝💘💞💟💖💕"
        "💓💝💘💞💟💖💕💗"
        "💝💘💞💟💖💕💗💓"
    )
    
    # Показываем анимацию
    for frame in "${frames[@]}"; do
        clear_screen
        echo -e "${PURPLE}"
        echo "$frame"
        echo ""
        echo "💖 ТВОЙ МУЖ, РОМОЧКА 💖"
        echo ""
        echo "$(echo $frame | rev)"
        echo -e "${NC}"
        sleep 1
    done
    
    # Финальный кадр
    clear_screen
    echo -e "${PURPLE}"
    echo "💖💕💗💓💝💘💞💟"
    echo ""
    echo "💖 ТВОЙ МУЖ, РОМОЧКА 💖"
    echo ""
    echo "💟💞💘💝💓💗💕💖"
    echo -e "${NC}"
    echo ""
    read -p "Нажмите Enter для возврата в меню..."
}

# Главный цикл программы
main() {
    while true; do
        show_welcome
        
        case $choice in
            1)
                show_letter
                ;;
            2)
                show_animation
                ;;
            3)
                clear_screen
                echo -e "${GREEN}До свидания! 💕${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Неверный выбор. Попробуйте снова.${NC}"
                sleep 2
                ;;
        esac
    done
}

# Запуск программы
echo -e "${CYAN}🤖 Запуск бота для nikswiq...${NC}"
sleep 1
main