const puppeteer = require('puppeteer');
const { faker } = require('@faker-js/faker');
const fs = require('fs');

class RobloxAutoRegister {
    constructor() {
        this.browser = null;
        this.page = null;
        this.registeredAccounts = [];
        this.outputFile = 'registered_roblox_accounts.txt';
        this.stats = {
            totalAttempted: 0,
            totalSuccess: 0,
            totalFailed: 0,
            errors: []
        };
    }

    // Генерация случайных данных для регистрации
    generateRegistrationData() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const username = this.generateUsername();
        const password = this.generatePassword();
        const email = faker.internet.email({ firstName, lastName });
        const birthMonth = faker.number.int({ min: 1, max: 12 });
        const birthDay = faker.number.int({ min: 1, max: 28 });
        const birthYear = faker.number.int({ min: 1990, max: 2005 });

        return {
            username,
            password,
            email,
            firstName,
            lastName,
            birthMonth,
            birthDay,
            birthYear
        };
    }

    // Генерация логина
    generateUsername() {
        const patterns = [
            () => `${faker.word.adjective()}${faker.word.noun()}${faker.number.int({ min: 100, max: 999 })}`,
            () => `${faker.person.firstName()}${faker.person.lastName()}${faker.number.int({ min: 10, max: 99 })}`,
            () => `${faker.word.adverb()}${faker.word.noun()}${faker.number.int({ min: 1, max: 999 })}`,
            () => `${faker.person.firstName()}${faker.number.int({ min: 1000, max: 9999 })}`
        ];
        
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        let username = randomPattern();
        username = username.replace(/[^a-zA-Z0-9]/g, '');
        username = username.substring(0, 20);
        
        return username;
    }

    // Генерация пароля
    generatePassword() {
        const patterns = [
            () => `${faker.word.adjective()}${faker.word.noun()}${faker.number.int({ min: 100, max: 999 })}!`,
            () => `${faker.person.firstName()}${faker.number.int({ min: 1000, max: 9999 })}@`,
            () => `${faker.word.adverb()}${faker.word.noun()}${faker.number.int({ min: 10, max: 99 })}#`,
            () => `${faker.person.lastName()}${faker.number.int({ min: 100, max: 999 })}$$`
        ];
        
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        let password = randomPattern();
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        return password;
    }

    // Инициализация браузера
    async initBrowser(headless = false) {
        try {
            console.log('🌐 Запуск браузера...');
            this.browser = await puppeteer.launch({
                headless: headless,
                defaultViewport: { width: 1280, height: 720 },
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ]
            });

            this.page = await this.browser.newPage();
            
            // Устанавливаем User-Agent
            await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
            
            // Устанавливаем дополнительные заголовки
            await this.page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            });

            console.log('✅ Браузер запущен успешно');
            return true;
        } catch (error) {
            console.error('❌ Ошибка при запуске браузера:', error.message);
            return false;
        }
    }

    // Регистрация одного аккаунта
    async registerAccount(data) {
        try {
            console.log(`\n🔄 Регистрация аккаунта: ${data.username}`);
            
            // Переходим на страницу регистрации
            await this.page.goto('https://www.roblox.com/signup', {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            // Ждем загрузки формы
            await this.page.waitForSelector('#signup-username', { timeout: 10000 });
            
            // Заполняем форму регистрации
            await this.fillRegistrationForm(data);
            
            // Проверяем успешность регистрации
            const success = await this.checkRegistrationSuccess();
            
            if (success) {
                console.log(`✅ Аккаунт ${data.username} успешно зарегистрирован!`);
                this.registeredAccounts.push({
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    fullAccount: `${data.username}:${data.password}`,
                    registrationDate: new Date().toISOString()
                });
                this.stats.totalSuccess++;
                return true;
            } else {
                console.log(`❌ Ошибка при регистрации аккаунта ${data.username}`);
                this.stats.totalFailed++;
                return false;
            }

        } catch (error) {
            console.error(`❌ Ошибка при регистрации ${data.username}:`, error.message);
            this.stats.errors.push({
                username: data.username,
                error: error.message,
                timestamp: new Date().toISOString()
            });
            this.stats.totalFailed++;
            return false;
        }
    }

    // Заполнение формы регистрации
    async fillRegistrationForm(data) {
        try {
            // Заполняем логин
            await this.page.type('#signup-username', data.username, { delay: 100 });
            
            // Заполняем пароль
            await this.page.type('#signup-password', data.password, { delay: 100 });
            
            // Заполняем дату рождения
            await this.page.select('#MonthDropdown', data.birthMonth.toString());
            await this.page.select('#DayDropdown', data.birthDay.toString());
            await this.page.select('#YearDropdown', data.birthYear.toString());
            
            // Заполняем пол (случайно выбираем)
            const gender = Math.random() > 0.5 ? 'Male' : 'Female';
            await this.page.click(`input[name="gender"][value="${gender}"]`);
            
            // Нажимаем кнопку регистрации
            await this.page.click('#signup-button');
            
            // Ждем обработки формы
            await this.page.waitForTimeout(3000);
            
        } catch (error) {
            throw new Error(`Ошибка при заполнении формы: ${error.message}`);
        }
    }

    // Проверка успешности регистрации
    async checkRegistrationSuccess() {
        try {
            // Проверяем, есть ли ошибки на странице
            const errorElements = await this.page.$$('.error-message, .alert-error, .field-validation-error');
            if (errorElements.length > 0) {
                return false;
            }

            // Проверяем, перешли ли мы на главную страницу или страницу подтверждения
            const currentUrl = this.page.url();
            if (currentUrl.includes('home') || currentUrl.includes('dashboard') || 
                currentUrl.includes('welcome') || currentUrl.includes('verify')) {
                return true;
            }

            // Дополнительная проверка - ищем элементы успешной регистрации
            const successElements = await this.page.$$('.success-message, .welcome-message, .verification-message');
            return successElements.length > 0;

        } catch (error) {
            console.log('Предупреждение при проверке успешности:', error.message);
            return false;
        }
    }

    // Регистрация множества аккаунтов
    async registerMultipleAccounts(count = 5, delay = 5000) {
        console.log(`🎮 Начинаю автоматическую регистрацию ${count} аккаунтов на Roblox.com`);
        console.log('='.repeat(60));

        this.stats.totalAttempted = count;

        for (let i = 0; i < count; i++) {
            const data = this.generateRegistrationData();
            
            console.log(`\n📝 Попытка ${i + 1}/${count}`);
            console.log(`👤 Логин: ${data.username}`);
            console.log(`📧 Email: ${data.email}`);
            
            const success = await this.registerAccount(data);
            
            if (success) {
                console.log(`✅ Успешно зарегистрирован аккаунт ${i + 1}`);
            } else {
                console.log(`❌ Не удалось зарегистрировать аккаунт ${i + 1}`);
            }

            // Пауза между регистрациями
            if (i < count - 1) {
                console.log(`⏳ Ожидание ${delay/1000} секунд перед следующей регистрацией...`);
                await this.page.waitForTimeout(delay);
            }
        }

        console.log('\n🎉 Регистрация завершена!');
        this.displayStats();
        this.saveResults();
    }

    // Отображение статистики
    displayStats() {
        console.log('\n📊 Статистика регистрации:');
        console.log('='.repeat(40));
        console.log(`📈 Всего попыток: ${this.stats.totalAttempted}`);
        console.log(`✅ Успешно: ${this.stats.totalSuccess}`);
        console.log(`❌ Неудачно: ${this.stats.totalFailed}`);
        console.log(`📊 Процент успеха: ${((this.stats.totalSuccess / this.stats.totalAttempted) * 100).toFixed(1)}%`);
        
        if (this.stats.errors.length > 0) {
            console.log('\n⚠️ Ошибки:');
            this.stats.errors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error.username}: ${error.error}`);
            });
        }
    }

    // Сохранение результатов
    saveResults() {
        try {
            // Сохраняем аккаунты в текстовый файл
            const accountsContent = this.registeredAccounts.map(acc => acc.fullAccount).join('\n');
            fs.writeFileSync(this.outputFile, accountsContent, 'utf8');
            
            // Сохраняем детальную информацию в JSON
            const detailedFile = 'detailed_registered_accounts.json';
            const detailedContent = {
                accounts: this.registeredAccounts,
                stats: this.stats,
                generatedAt: new Date().toISOString()
            };
            fs.writeFileSync(detailedFile, JSON.stringify(detailedContent, null, 2), 'utf8');
            
            console.log(`\n💾 Результаты сохранены:`);
            console.log(`  📄 ${this.outputFile} - аккаунты в формате логин:пароль`);
            console.log(`  📄 ${detailedFile} - детальная информация в JSON`);
            
        } catch (error) {
            console.error('❌ Ошибка при сохранении результатов:', error.message);
        }
    }

    // Закрытие браузера
    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔒 Браузер закрыт');
        }
    }

    // Основной метод запуска
    async run(count = 5, headless = false, delay = 5000) {
        try {
            const browserStarted = await this.initBrowser(headless);
            if (!browserStarted) {
                return false;
            }

            await this.registerMultipleAccounts(count, delay);
            return true;

        } catch (error) {
            console.error('❌ Критическая ошибка:', error.message);
            return false;
        } finally {
            await this.closeBrowser();
        }
    }
}

// CLI интерфейс
function parseArguments() {
    const args = process.argv.slice(2);
    const options = {
        count: 5,
        headless: false,
        delay: 5000
    };

    args.forEach(arg => {
        if (arg.startsWith('--count=') || arg.startsWith('-c=')) {
            options.count = parseInt(arg.split('=')[1]) || 5;
        } else if (arg === '--headless' || arg === '-h') {
            options.headless = true;
        } else if (arg.startsWith('--delay=') || arg.startsWith('-d=')) {
            options.delay = parseInt(arg.split('=')[1]) || 5000;
        }
    });

    return options;
}

// Запуск автоматической регистрации
if (require.main === module) {
    const options = parseArguments();
    const register = new RobloxAutoRegister();
    
    console.log('🎮 Автоматическая регистрация аккаунтов на Roblox.com');
    console.log('='.repeat(60));
    console.log(`📊 Количество аккаунтов: ${options.count}`);
    console.log(`👻 Режим headless: ${options.headless ? 'Да' : 'Нет'}`);
    console.log(`⏱️ Задержка между регистрациями: ${options.delay/1000} сек`);
    console.log('='.repeat(60));
    
    register.run(options.count, options.headless, options.delay)
        .then(success => {
            if (success) {
                console.log('\n🎉 Автоматическая регистрация завершена успешно!');
            } else {
                console.log('\n❌ Автоматическая регистрация завершена с ошибками');
            }
        })
        .catch(error => {
            console.error('\n💥 Критическая ошибка:', error.message);
        });
}

module.exports = RobloxAutoRegister;