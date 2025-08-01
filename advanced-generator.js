const fs = require('fs');
const { faker } = require('@faker-js/faker');

class AdvancedRobloxGenerator {
    constructor() {
        this.accounts = [];
        this.outputFile = 'advanced_roblox_accounts.txt';
        this.stats = {
            totalGenerated: 0,
            uniqueUsernames: 0,
            uniquePasswords: 0
        };
    }

    // Генерация логина с различными стилями
    generateUsername(style = 'random') {
        const styles = {
            'gamer': () => {
                const prefixes = ['Cool', 'Pro', 'Epic', 'Ultra', 'Mega', 'Super', 'Dark', 'Light'];
                const suffixes = ['Gamer', 'Player', 'Warrior', 'Hunter', 'Knight', 'Mage', 'Ninja', 'Hero'];
                const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
                const number = faker.number.int({ min: 100, max: 999 });
                return `${prefix}${suffix}${number}`;
            },
            'name': () => {
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                const number = faker.number.int({ min: 10, max: 999 });
                return `${firstName}${lastName}${number}`;
            },
            'adjective': () => {
                const adj = faker.word.adjective();
                const noun = faker.word.noun();
                const number = faker.number.int({ min: 100, max: 999 });
                return `${adj}${noun}${number}`;
            },
            'random': () => {
                const patterns = [
                    () => faker.internet.userName(),
                    () => `${faker.word.adjective()}${faker.word.noun()}${faker.number.int({ min: 100, max: 999 })}`,
                    () => `${faker.person.firstName()}${faker.person.lastName()}${faker.number.int({ min: 10, max: 99 })}`,
                    () => `${faker.word.adverb()}${faker.word.noun()}${faker.number.int({ min: 1, max: 999 })}`,
                    () => `${faker.person.firstName()}${faker.number.int({ min: 1000, max: 9999 })}`
                ];
                return patterns[Math.floor(Math.random() * patterns.length)]();
            }
        };

        let username = styles[style] ? styles[style]() : styles['random']();
        username = username.replace(/[^a-zA-Z0-9]/g, '');
        username = username.substring(0, 20);
        
        return username;
    }

    // Генерация пароля с различными уровнями сложности
    generatePassword(complexity = 'medium') {
        const complexities = {
            'simple': () => {
                const word = faker.word.adjective();
                const number = faker.number.int({ min: 100, max: 999 });
                return `${word}${number}`;
            },
            'medium': () => {
                const patterns = [
                    () => `${faker.word.adjective()}${faker.word.noun()}${faker.number.int({ min: 100, max: 999 })}!`,
                    () => `${faker.person.firstName()}${faker.number.int({ min: 1000, max: 9999 })}@`,
                    () => `${faker.word.adverb()}${faker.word.noun()}${faker.number.int({ min: 10, max: 99 })}#`,
                    () => `${faker.person.lastName()}${faker.number.int({ min: 100, max: 999 })}$$`,
                    () => `${faker.word.adjective()}${faker.number.int({ min: 1000, max: 9999 })}%`
                ];
                const pattern = patterns[Math.floor(Math.random() * patterns.length)];
                let password = pattern();
                const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
                password += symbols[Math.floor(Math.random() * symbols.length)];
                return password;
            },
            'strong': () => {
                const uppercase = faker.string.alpha({ length: 2, casing: 'upper' });
                const lowercase = faker.string.alpha({ length: 4, casing: 'lower' });
                const numbers = faker.string.numeric(3);
                const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '='];
                const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                return `${uppercase}${lowercase}${numbers}${symbol}`;
            }
        };

        return complexities[complexity] ? complexities[complexity]() : complexities['medium']();
    }

    // Генерация одного аккаунта с настройками
    generateAccount(options = {}) {
        const {
            usernameStyle = 'random',
            passwordComplexity = 'medium',
            includeEmail = false
        } = options;

        const username = this.generateUsername(usernameStyle);
        const password = this.generatePassword(passwordComplexity);
        
        const account = {
            username: username,
            password: password,
            fullAccount: `${username}:${password}`
        };

        if (includeEmail) {
            account.email = faker.internet.email({ firstName: username });
            account.fullAccount = `${username}:${password}:${account.email}`;
        }

        return account;
    }

    // Генерация множества аккаунтов с настройками
    generateAccounts(count = 10, options = {}) {
        console.log(`🎮 Генерирую ${count} Roblox аккаунтов с настройками...`);
        console.log(`📊 Стиль логинов: ${options.usernameStyle || 'random'}`);
        console.log(`🔒 Сложность паролей: ${options.passwordComplexity || 'medium'}`);
        console.log(`📧 Включить email: ${options.includeEmail ? 'Да' : 'Нет'}`);
        
        const startTime = Date.now();
        
        for (let i = 0; i < count; i++) {
            const account = this.generateAccount(options);
            this.accounts.push(account);
            this.stats.totalGenerated++;
            
            // Выводим прогресс
            if ((i + 1) % 10 === 0 || i === count - 1) {
                const progress = ((i + 1) / count * 100).toFixed(1);
                console.log(`📈 Прогресс: ${progress}% (${i + 1}/${count})`);
            }
        }
        
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        console.log(`\n✅ Генерация завершена за ${duration} секунд!`);
        console.log(`📊 Создано аккаунтов: ${count}`);
        
        this.calculateStats();
    }

    // Расчет статистики
    calculateStats() {
        const usernames = new Set(this.accounts.map(acc => acc.username));
        const passwords = new Set(this.accounts.map(acc => acc.password));
        
        this.stats.uniqueUsernames = usernames.size;
        this.stats.uniquePasswords = passwords.size;
        
        console.log(`📈 Статистика:`);
        console.log(`   - Уникальных логинов: ${this.stats.uniqueUsernames}/${this.stats.totalGenerated}`);
        console.log(`   - Уникальных паролей: ${this.stats.uniquePasswords}/${this.stats.totalGenerated}`);
    }

    // Сохранение в файл с различными форматами
    saveToFile(format = 'simple') {
        let content = '';
        
        switch (format) {
            case 'numbered':
                content = this.accounts.map((account, index) => 
                    `${index + 1}. ${account.fullAccount}`
                ).join('\n');
                break;
            case 'json':
                content = JSON.stringify(this.accounts, null, 2);
                break;
            case 'csv':
                content = 'Username,Password,Email\n';
                content += this.accounts.map(account => 
                    `${account.username},${account.password},${account.email || ''}`
                ).join('\n');
                break;
            default: // simple
                content = this.accounts.map(account => account.fullAccount).join('\n');
        }
        
        try {
            fs.writeFileSync(this.outputFile, content, 'utf8');
            console.log(`\n💾 Аккаунты сохранены в файл: ${this.outputFile} (формат: ${format})`);
        } catch (error) {
            console.error('❌ Ошибка при сохранении файла:', error.message);
        }
    }

    // Вывод аккаунтов в консоль
    displayAccounts(limit = 10) {
        const displayCount = Math.min(limit, this.accounts.length);
        
        console.log(`\n📋 Первые ${displayCount} сгенерированных аккаунтов:`);
        console.log('='.repeat(60));
        
        this.accounts.slice(0, displayCount).forEach((account, index) => {
            console.log(`${index + 1}. ${account.fullAccount}`);
        });
        
        if (this.accounts.length > displayCount) {
            console.log(`... и еще ${this.accounts.length - displayCount} аккаунтов`);
        }
        
        console.log('='.repeat(60));
    }

    // Основной метод запуска
    run(count = 10, options = {}, saveFormat = 'simple', displayLimit = 10) {
        this.generateAccounts(count, options);
        this.saveToFile(saveFormat);
        this.displayAccounts(displayLimit);
        
        return this.accounts;
    }
}

// CLI интерфейс
function parseArguments() {
    const args = process.argv.slice(2);
    const options = {
        count: 10,
        usernameStyle: 'random',
        passwordComplexity: 'medium',
        includeEmail: false,
        saveFormat: 'simple',
        displayLimit: 10
    };

    args.forEach(arg => {
        if (arg.startsWith('--count=') || arg.startsWith('-c=')) {
            options.count = parseInt(arg.split('=')[1]) || 10;
        } else if (arg.startsWith('--style=') || arg.startsWith('-s=')) {
            options.usernameStyle = arg.split('=')[1] || 'random';
        } else if (arg.startsWith('--complexity=') || arg.startsWith('-p=')) {
            options.passwordComplexity = arg.split('=')[1] || 'medium';
        } else if (arg === '--email' || arg === '-e') {
            options.includeEmail = true;
        } else if (arg.startsWith('--format=') || arg.startsWith('-f=')) {
            options.saveFormat = arg.split('=')[1] || 'simple';
        } else if (arg.startsWith('--display=') || arg.startsWith('-d=')) {
            options.displayLimit = parseInt(arg.split('=')[1]) || 10;
        }
    });

    return options;
}

// Запуск продвинутого генератора
if (require.main === module) {
    const options = parseArguments();
    const generator = new AdvancedRobloxGenerator();
    
    console.log('🎮 Продвинутый генератор Roblox аккаунтов');
    console.log('='.repeat(50));
    
    generator.run(
        options.count,
        {
            usernameStyle: options.usernameStyle,
            passwordComplexity: options.passwordComplexity,
            includeEmail: options.includeEmail
        },
        options.saveFormat,
        options.displayLimit
    );
    
    console.log('\n🎉 Генерация завершена успешно!');
    console.log(`📁 Файл с аккаунтами: ${generator.outputFile}`);
    console.log('\n💡 Примеры использования:');
    console.log('  node advanced-generator.js --count=20 --style=gamer --complexity=strong');
    console.log('  node advanced-generator.js -c=50 -s=name -p=simple --email');
    console.log('  node advanced-generator.js --count=100 --format=json --display=5');
}

module.exports = AdvancedRobloxGenerator;