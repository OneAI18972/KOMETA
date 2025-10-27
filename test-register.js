const RobloxRegister = require('./roblox-register');

console.log('🧪 Тестирование автоматической регистрации Roblox аккаунтов');
console.log('='.repeat(60));

async function testRegistration() {
    const register = new RobloxRegister();
    
    try {
        console.log('📋 Тестовые параметры:');
        console.log('  - Количество аккаунтов: 1');
        console.log('  - Режим: headless (фоновый)');
        console.log('  - Задержка: 5 секунд');
        console.log('='.repeat(60));
        
        // Запускаем тестовую регистрацию
        const success = await register.run(1, true, 5000);
        
        if (success) {
            console.log('\n✅ Тест завершен успешно!');
            console.log('📁 Проверьте созданные файлы:');
            console.log('  - roblox_registered_accounts.txt');
            console.log('  - detailed_roblox_accounts.json');
        } else {
            console.log('\n❌ Тест завершен с ошибками');
            console.log('💡 Возможные причины:');
            console.log('  - Проблемы с интернет-соединением');
            console.log('  - Изменения на сайте Roblox');
            console.log('  - Блокировка автоматизации');
        }
        
    } catch (error) {
        console.error('\n💥 Критическая ошибка при тестировании:', error.message);
    }
}

// Запускаем тест только если файл вызван напрямую
if (require.main === module) {
    console.log('⚠️  ВНИМАНИЕ: Это тестовый запуск автоматической регистрации');
    console.log('📝 Для реального использования используйте:');
    console.log('   node roblox-register.js --count=1');
    console.log('='.repeat(60));
    
    // Спрашиваем подтверждение
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Продолжить тестирование? (y/N): ', (answer) => {
        rl.close();
        
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            testRegistration();
        } else {
            console.log('❌ Тестирование отменено');
            console.log('💡 Для генерации аккаунтов без регистрации используйте:');
            console.log('   node generator.js --count=10');
        }
    });
}

module.exports = { testRegistration };