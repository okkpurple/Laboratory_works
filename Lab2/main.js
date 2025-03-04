//Шаг 1. Создание массива транзакций
const transactions = [
    {
        transaction_id: 1,
        transaction_date: "2025-02-17",
        transaction_amount: 120.50,
        transaction_type: "приход",
        transaction_description: "Зарплата",
        merchant_name: "Компания XYZ",
        card_type: "кредитная"
    },
    {
        transaction_id: 2,
        transaction_date: "2025-02-16",
        transaction_amount: 45.75,
        transaction_type: "расход",
        transaction_description: "Покупка продуктов",
        merchant_name: "Магазин ABC",
        card_type: "дебетовая"
    },
    {
        transaction_id: 3,
        transaction_date: "2025-02-15",
        transaction_amount: 89.99,
        transaction_type: "расход",
        transaction_description: "Оплата за интернет",
        merchant_name: "Интернет-провайдер QWE",
        card_type: "кредитная"
    }
];

console.log(transactions);

//Шаг 2. Реализация функций для анализа транзакций

/**
 * Получает массив уникальных типов транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {Array} Массив уникальных типов транзакций.
 */

// Функция 1: Получить уникальные типы транзакций
function getUniqueTransactionTypes(transactions) {
    const types = transactions.map(transaction => transaction.transaction_type);
    return [...new Set(types)];
}


/**
 * Вычисляет общую сумму всех транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} Общая сумма всех транзакций.
 */
// Функция 2: Вычислить общую сумму всех транзакций
function calculateTotalAmount(transactions) {
    const sum = transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
    console.log("curr sum " + sum)
    return sum
}

/**
 * Вычисляет общую сумму транзакций по заданной дате (год, месяц, день).
 * @param {Array} transactions - Массив транзакций.
 * @param {number} [year] - Год для фильтрации.
 * @param {number} [month] - Месяц для фильтрации.
 * @param {number} [day] - День для фильтрации.
 * @returns {number} Общая сумма транзакций за указанную дату.
 */
// Функция 3: Вычислить общую сумму транзакций по дате (год, месяц, день)
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(transaction => {
        const date = new Date(transaction.transaction_date);
        return (!year || date.getFullYear() === year) &&
               (!month || date.getMonth() + 1 === month) &&
               (!day || date.getDate() === day);
    }).reduce((total, transaction) => total + transaction.transaction_amount, 0);
}

/**
 * Получает транзакции указанного типа.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} type - Тип транзакции ("приход" или "расход").
 * @returns {Array} Массив транзакций указанного типа.
 */
// Функция 4: Получить транзакции указанного типа
function getTransactionByType(transactions, type) {
    return transactions.filter(transaction => transaction.transaction_type === type);
}

/**
 * Получает транзакции в указанном диапазоне дат.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} startDate - Начальная дата ("YYYY-MM-DD").
 * @param {string} endDate - Конечная дата ("YYYY-MM-DD").
 * @returns {Array} Массив транзакций в заданном диапазоне дат.
 */
// Функция 5: Получить транзакции в указанном диапазоне дат
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(transaction => {
        const date = new Date(transaction.transaction_date);
        return date >= start && date <= end;
    });
}

/**
 * Находит месяц с наибольшим количеством транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} Номер месяца (1-12), в котором было больше всего транзакций.
 */
// Функция 6: Получить транзакции по имени торговца
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
}

/**
 * Вычисляет среднюю сумму транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} Средняя сумма транзакций. Возвращает 0, если массив пуст.
 */
// Функция 7: Вычислить среднюю сумму транзакций
function calculateAverageTransactionAmount(transactions) {
    const totalAmount = calculateTotalAmount(transactions);
    return totalAmount / transactions.length;
}

/**
 * Возвращает массив транзакций с суммой в заданном диапазоне.
 * @param {Array} transactions - Массив транзакций.
 * @param {number} minAmount - Минимальная сумма транзакции.
 * @param {number} maxAmount - Максимальная сумма транзакции.
 * @returns {Array} Массив транзакций, сумма которых находится в указанном диапазоне.
 */
// Функция 8: Получить транзакции по диапазону суммы
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
}

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} Общая сумма всех дебетовых транзакций. Если транзакций нет, возвращает 0.
 */
// Функция 9: Вычислить общую сумму дебетовых транзакций
function calculateTotalDebitAmount(transactions) {
    return transactions.filter(transaction => transaction.card_type === 'дебетовая')
                       .reduce((total, transaction) => total + transaction.transaction_amount, 0);
}

/**
 * Находит месяц с наибольшим количеством транзакций.
 * @param {Array} transactions - Массив объектов транзакций, каждая из которых должна содержать:
 * @param {string} transactions[].transaction_date - Дата транзакции в строковом формате ISO (например, "2025-02-18T12:34:56Z").
 * 
 * @returns {number} - Месяц с наибольшим количеством транзакций, представленный числом от 1 до 12.
 * const mostTransactionsMonth = findMostTransactionsMonth(transactions);
 * console.log(mostTransactionsMonth); // Вывод: 2 (февраль)
 */
// Функция 10: Найти месяц с наибольшим количеством транзакций
function findMostTransactionsMonth(transactions) {
    const months = transactions.map(transaction => new Date(transaction.transaction_date).getMonth());
    const monthCounts = months.reduce((counts, month) => {
        counts[month] = (counts[month] || 0) + 1;
        return counts;
    }, {});
    const mostTransactionsMonth = Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
    return parseInt(mostTransactionsMonth) + 1; // возвращаем месяц (с 1, а не с 0)
}   

/**
 * Находит месяц с наибольшим количеством дебетовых транзакций.
 * @param {Array} transactions - Массив объектов транзакций. Каждая транзакция должна содержать:
 * @param {string} transactions[].card_type - Тип карты, например, "дебетовая" или "кредитная".
 * @param {string} transactions[].transaction_date - Дата транзакции в строковом формате ISO (например, "2025-02-18T12:34:56Z").
 * @returns {number} - Месяц с наибольшим количеством дебетовых транзакций, представленный числом от 1 до 12.
 */
// Функция 11: Найти месяц с наибольшим количеством дебетовых транзакций
function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = transactions.filter(transaction => transaction.card_type === 'дебетовая');
    return findMostTransactionsMonth(debitTransactions);
}

/**
 * Определяет тип транзакций, которых больше всего.
 * @param {Array} transactions - Массив объектов транзакций. Каждая транзакция должна содержать:
 * @param {string} transactions[].transaction_type - Тип транзакции, например, "debit", "credit" и т.д.
 */
// Функция 12: Определить тип транзакций, которых больше всего
function mostTransactionTypes(transactions) {
    const typeCounts = {};

    for (const transaction of transactions) {
        const type = transaction.transaction_type;
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    }

    let maxType = null;
    let maxCount = 0;
    let isEqual = false;

    for (const [type, count] of Object.entries(typeCounts)) {
        if (count > maxCount) {
            maxType = type;
            maxCount = count;
            isEqual = false;
        } else if (count === maxCount) {
            isEqual = true;
        }
    }

    return isEqual ? 'equal' : maxType;
}

/**
 * Получает транзакции, совершенные до указанной даты.
 * 
 * Эта функция фильтрует транзакции, оставляя только те, которые произошли до заданной даты.
 * 
 * @param {Array} transactions - Массив объектов транзакций. Каждая транзакция должна содержать:
 * @param {string} transactions[].transaction_date - Дата транзакции в строковом формате ISO (например, "2025-02-18T12:34:56Z").
 * 
 * @param {string} date - Строка, представляющая дату, до которой должны быть получены транзакции.
 * Дата должна быть в формате ISO (например, "2025-02-18T12:34:56Z").
 * 
 * @returns {Array} - Массив транзакций, произошедших до указанной даты.
 */

/**
 * Получает транзакции, совершенные до указанной даты.
 * 
 * Эта функция фильтрует транзакции, оставляя только те, которые произошли до заданной даты.
 * 
 * @param {Array} transactions - Массив объектов транзакций. Каждая транзакция должна содержать:
 * @param {string} transactions[].transaction_date - Дата транзакции в строковом формате ISO (например, "2025-02-18T12:34:56Z").
 * 
 * @param {string} date - Строка, представляющая дату, до которой должны быть получены транзакции.
 * Дата должна быть в формате ISO (например, "2025-02-18T12:34:56Z").
 * 
 * @returns {Array} - Массив транзакций, произошедших до указанной даты.
 */

/**
 * Получает транзакции, совершенные до указанной даты.
 * 
 * Эта функция фильтрует транзакции, оставляя только те, которые произошли до заданной даты.
 * 
 * @param {Array} transactions - Массив объектов транзакций. Каждая транзакция должна содержать:
 * @param {string} transactions[].transaction_date - Дата транзакции в строковом формате ISO (например, "2025-02-18T12:34:56Z").
 * 
 * @param {string} date - Строка, представляющая дату, до которой должны быть получены транзакции.
 * Дата должна быть в формате ISO (например, "2025-02-18T12:34:56Z").
 * 
 * @returns {Array} - Массив транзакций, произошедших до указанной даты.
 */
// Функция 13: Получить транзакции до указанной даты
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(transaction => new Date(transaction.transaction_date) < targetDate);
}

/**
 * Находит транзакцию по уникальному идентификатору.
 * 
 * Эта функция ищет транзакцию в массиве транзакций по заданному уникальному идентификатору.
 * Возвращает первую найденную транзакцию с указанным `transaction_id`, или `undefined`, если такая транзакция не найдена.
 * 
 * @param {Array} transactions - Массив объектов транзакций. Каждая транзакция должна содержать:
 * @param {string|number} transactions[].transaction_id - Уникальный идентификатор транзакции.
 * 
 * @param {string|number} id - Уникальный идентификатор транзакции, которую нужно найти.
 * 
 * @returns {Object|undefined} - Возвращает транзакцию с указанным идентификатором, или `undefined`, если такая транзакция не найдена.
 */
// Функция 14: Найти транзакцию по уникальному идентификатору
function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id);
}

/**
 * Получает массив описаний транзакций.
 * 
 * Эта функция извлекает описание для каждой транзакции из массива транзакций и возвращает массив этих описаний.
 * 
 * @param {Array} transactions - Массив объектов транзакций. Каждая транзакция должна содержать:
 * @param {string} transactions[].transaction_description - Описание транзакции.
 * 
 * @returns {Array} - Массив строк, представляющих описания транзакций.
 */
// Функция 15: Получить массив описаний транзакций
function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
}

//Шаг 3. Тестирование функций


// Пустой массив
const emptyTransactions = [0];

// Массив с одной транзакцией
const singleTransaction = [
    {
        transaction_id: 1,
        transaction_date: "2025-02-17",
        transaction_amount: 100.00,
        transaction_type: "приход",
        transaction_description: "Зарплата",
        merchant_name: "Компания XYZ",
        card_type: "кредитная"
    }
];

// Тестирование всех функций

console.log("1. Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("2. Общая сумма всех транзакций:", calculateTotalAmount(transactions));
console.log("3. Сумма транзакций по дате (2025, 2):", calculateTotalAmountByDate(transactions, 2025, 2));
console.log("4. Транзакции типа 'приход':", getTransactionByType(transactions, "приход"));
console.log("5. Транзакции в диапазоне дат (2025-02-15 to 2025-02-17):", getTransactionsInDateRange(transactions, "2025-02-15", "2025-02-17"));
console.log("6. Транзакции с торговцем 'Компания XYZ':", getTransactionsByMerchant(transactions, "Компания XYZ"));
console.log("7. Средняя сумма транзакций:", calculateAverageTransactionAmount(transactions));
console.log("8. Транзакции по диапазону суммы (50 to 150):", getTransactionsByAmountRange(transactions, 50, 150));
console.log("9. Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("10. Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(transactions));
console.log("11. Месяц с наибольшим количеством дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log("12. Тип транзакций, которых больше всего:", mostTransactionTypes(transactions));
console.log("13. Транзакции до 2025-02-16:", getTransactionsBeforeDate(transactions, "2025-02-16"));
console.log("14. Транзакция по ID 2:", findTransactionById(transactions, 2));
console.log("15. Описания транзакций:", mapTransactionDescriptions(transactions));

// Тестирование на пустом массиве
console.log("\nТестирование на пустом массиве:");

console.log("1. Уникальные типы транзакций:", getUniqueTransactionTypes(emptyTransactions));
console.log("2. Общая сумма всех транзакций:", calculateTotalAmount(emptyTransactions));
console.log("3. Сумма транзакций по дате (2025, 2):", calculateTotalAmountByDate(emptyTransactions, 2025, 2));
console.log("4. Транзакции типа 'приход':", getTransactionByType(emptyTransactions, "приход"));
console.log("5. Транзакции в диапазоне дат (2025-02-15 to 2025-02-17):", getTransactionsInDateRange(emptyTransactions, "2025-02-15", "2025-02-17"));
console.log("6. Транзакции с торговцем 'Компания XYZ':", getTransactionsByMerchant(emptyTransactions, "Компания XYZ"));
console.log("7. Средняя сумма транзакций:", calculateAverageTransactionAmount(emptyTransactions));
console.log("8. Транзакции по диапазону суммы (50 to 150):", getTransactionsByAmountRange(emptyTransactions, 50, 150));
console.log("9. Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(emptyTransactions));
console.log("10. Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(emptyTransactions));
console.log("11. Месяц с наибольшим количеством дебетовых транзакций:", findMostDebitTransactionMonth(emptyTransactions));
console.log("12. Тип транзакций, которых больше всего:", mostTransactionTypes(emptyTransactions));
console.log("13. Транзакции до 2025-02-16:", getTransactionsBeforeDate(emptyTransactions, "2025-02-16"));
console.log("14. Транзакция по ID 2:", findTransactionById(emptyTransactions, 2));
console.log("15. Описания транзакций:", mapTransactionDescriptions(emptyTransactions));

// Тестирование на массиве с одной транзакцией
console.log("\nТестирование на массиве с одной транзакцией:");

console.log("1. Уникальные типы транзакций:", getUniqueTransactionTypes(singleTransaction));
console.log("2. Общая сумма всех транзакций:", calculateTotalAmount(singleTransaction));
console.log("3. Сумма транзакций по дате (2025, 2):", calculateTotalAmountByDate(singleTransaction, 2025, 2));
console.log("4. Транзакции типа 'приход':", getTransactionByType(singleTransaction, "приход"));
console.log("5. Транзакции в диапазоне дат (2025-02-15 to 2025-02-17):", getTransactionsInDateRange(singleTransaction, "2025-02-15", "2025-02-17"));
console.log("6. Транзакции с торговцем 'Компания XYZ':", getTransactionsByMerchant(singleTransaction, "Компания XYZ"));
console.log("7. Средняя сумма транзакций:", calculateAverageTransactionAmount(singleTransaction));
console.log("8. Транзакции по диапазону суммы (50 to 150):", getTransactionsByAmountRange(singleTransaction, 50, 150));
console.log("9. Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(singleTransaction));
console.log("10. Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(singleTransaction));
console.log("11. Месяц с наибольшим количеством дебетовых транзакций:", findMostDebitTransactionMonth(singleTransaction));
console.log("12. Тип транзакций, которых больше всего:", mostTransactionTypes(singleTransaction));
console.log("13. Транзакции до 2025-02-16:", getTransactionsBeforeDate(singleTransaction, "2025-02-16"));
console.log("14. Транзакция по ID 2:", findTransactionById(singleTransaction, 2));
console.log("15. Описания транзакций:", mapTransactionDescriptions(singleTransaction));


