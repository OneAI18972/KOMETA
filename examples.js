const RobloxAccountGenerator = require('./generator');
const AdvancedRobloxGenerator = require('./advanced-generator');

console.log('🎮 Примеры использования генераторов Roblox аккаунтов');
console.log('='.repeat(60));

// Пример 1: Базовый генератор
console.log('\n📋 Пример 1: Базовый генератор');
console.log('-'.repeat(40));
const basicGenerator = new RobloxAccountGenerator();
const basicAccounts = basicGenerator.run(3, true, false);
console.log('Сгенерировано базовых аккаунтов:', basicAccounts.length);

// Пример 2: Продвинутый генератор с игровыми логинами
console.log('\n📋 Пример 2: Игровые логины с сильными паролями');
console.log('-'.repeat(40));
const gamerGenerator = new AdvancedRobloxGenerator();
gamerGenerator.outputFile = 'gamer_accounts.txt';
const gamerAccounts = gamerGenerator.run(3, {
    usernameStyle: 'gamer',
    passwordComplexity: 'strong'
}, 'simple', 3);

// Пример 3: Генератор с именами и email
console.log('\n📋 Пример 3: Имена с email');
console.log('-'.repeat(40));
const nameGenerator = new AdvancedRobloxGenerator();
nameGenerator.outputFile = 'name_accounts.txt';
const nameAccounts = nameGenerator.run(2, {
    usernameStyle: 'name',
    passwordComplexity: 'medium',
    includeEmail: true
}, 'numbered', 2);

// Пример 4: Генератор с прилагательными
console.log('\n📋 Пример 4: Прилагательные + существительные');
console.log('-'.repeat(40));
const adjGenerator = new AdvancedRobloxGenerator();
adjGenerator.outputFile = 'adjective_accounts.txt';
const adjAccounts = adjGenerator.run(3, {
    usernameStyle: 'adjective',
    passwordComplexity: 'simple'
}, 'simple', 3);

// Пример 5: Сохранение в JSON формате
console.log('\n📋 Пример 5: Сохранение в JSON');
console.log('-'.repeat(40));
const jsonGenerator = new AdvancedRobloxGenerator();
jsonGenerator.outputFile = 'json_accounts.json';
const jsonAccounts = jsonGenerator.run(2, {
    usernameStyle: 'random',
    passwordComplexity: 'medium'
}, 'json', 2);

// Пример 6: Сохранение в CSV формате
console.log('\n📋 Пример 6: Сохранение в CSV с email');
console.log('-'.repeat(40));
const csvGenerator = new AdvancedRobloxGenerator();
csvGenerator.outputFile = 'csv_accounts.csv';
const csvAccounts = csvGenerator.run(2, {
    usernameStyle: 'gamer',
    passwordComplexity: 'strong',
    includeEmail: true
}, 'csv', 2);

console.log('\n🎉 Все примеры выполнены успешно!');
console.log('📁 Созданные файлы:');
console.log('  - roblox_accounts.txt (базовый)');
console.log('  - gamer_accounts.txt (игровые логины)');
console.log('  - name_accounts.txt (имена с email)');
console.log('  - adjective_accounts.txt (прилагательные)');
console.log('  - json_accounts.json (JSON формат)');
console.log('  - csv_accounts.csv (CSV формат)');

console.log('\n💡 Дополнительные команды для тестирования:');
console.log('  node generator.js --count=10');
console.log('  node advanced-generator.js --count=20 --style=gamer --complexity=strong');
console.log('  node advanced-generator.js -c=50 -s=name -p=simple --email');
console.log('  node advanced-generator.js --count=100 --format=json --display=5');