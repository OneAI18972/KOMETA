const fs = require('fs');
const { faker } = require('@faker-js/faker');

class RobloxAccountGenerator {
    constructor() {
        this.accounts = [];
        this.outputFile = 'roblox_accounts.txt';
    }

    // Генерация случайного логина
    generateUsername() {
        const patterns = [
            () => faker.internet.userName(),
            () => `${faker.word.adjective()}${faker.word.noun()}${faker.number.int({ min: 100, max: 999 })}`,
            () => `${faker.person.firstName()}${faker.person.lastName()}${faker.number.int({ min: 10, max: 99 })}`,
            () => `${faker.word.adverb()}${faker.word.noun()}${faker.number.int({ min: 1, max: 999 })}`,
            () => `${faker.person.firstName()}${faker.number.int({ min: 1000, max: 9999 })}`
        ];
        
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        let username = randomPattern();
        
        // Убираем специальные символы и ограничиваем длину
        username = username.replace(/[^a-zA-Z0-9]/g, '');
        username = username.substring(0, 20);
        
        return username;
    }

    // Генерация случайного пароля
    generatePassword() {
        const patterns = [
            () => `${faker.word.adjective()}${faker.word.noun()}${faker.number.int({ min: 100, max: 999 })}!`,
            () => `${faker.person.firstName()}${faker.number.int({ min: 1000, max: 9999 })}@`,
            () => `${faker.word.adverb()}${faker.word.noun()}${faker.number.int({ min: 10, max: 99 })}#`,
            () => `${faker.person.lastName()}${faker.number.int({ min: 100, max: 999 })}$$`,
            () => `${faker.word.adjective()}${faker.number.int({ min: 1000, max: 9999 })}%`
        ];
        
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        let password = randomPattern();
        
        // Добавляем случайные символы для сложности
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        return password;
    }

    // Генерация одного аккаунта
    generateAccount() {
        const username = this.generateUsername();
        const password = this.generatePassword();
        
        return {
            username: username,
            password: password,
            fullAccount: `${username}:${password}`
        };
    }

    // Генерация множества аккаунтов
    generateAccounts(count = 10) {
        console.log(`Генерирую ${count} Roblox аккаунтов...`);
        
        for (let i = 0; i < count; i++) {
            const account = this.generateAccount();
            this.accounts.push(account);
            
            // Выводим прогресс
            if ((i + 1) % 10 === 0 || i === count - 1) {
                console.log(`Сгенерировано: ${i + 1}/${count}`);
            }
        }
        
        console.log(`\n✅ Генерация завершена! Создано ${count} аккаунтов.`);
    }

    // Сохранение аккаунтов в файл
    saveToFile() {
        const content = this.accounts.map(account => account.fullAccount).join('\n');
        
        try {
            fs.writeFileSync(this.outputFile, content, 'utf8');
            console.log(`\n💾 Аккаунты сохранены в файл: ${this.outputFile}`);
        } catch (error) {
            console.error('❌ Ошибка при сохранении файла:', error.message);
        }
    }

    // Вывод аккаунтов в консоль
    displayAccounts() {
        console.log('\n📋 Сгенерированные аккаунты:');
        console.log('='.repeat(50));
        
        this.accounts.forEach((account, index) => {
            console.log(`${index + 1}. ${account.fullAccount}`);
        });
        
        console.log('='.repeat(50));
    }

    // Основной метод запуска
    run(count = 10, saveToFile = true, display = true) {
        this.generateAccounts(count);
        
        if (display) {
            this.displayAccounts();
        }
        
        if (saveToFile) {
            this.saveToFile();
        }
        
        return this.accounts;
    }
}

// Функция для получения количества аккаунтов из аргументов командной строки
function getAccountCount() {
    const args = process.argv.slice(2);
    const countArg = args.find(arg => arg.startsWith('--count=') || arg.startsWith('-c='));
    
    if (countArg) {
        const count = parseInt(countArg.split('=')[1]);
        return isNaN(count) ? 10 : Math.max(1, Math.min(count, 1000)); // Ограничиваем от 1 до 1000
    }
    
    return 10; // По умолчанию 10 аккаунтов
}

// Запуск генератора
if (require.main === module) {
    const generator = new RobloxAccountGenerator();
    const count = getAccountCount();
    
    console.log('🎮 Генератор Roblox аккаунтов');
    console.log('='.repeat(40));
    
    generator.run(count, true, true);
    
    console.log('\n🎉 Генерация завершена успешно!');
    console.log(`📁 Файл с аккаунтами: ${generator.outputFile}`);
}

module.exports = RobloxAccountGenerator;