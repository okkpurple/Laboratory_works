import { generateId, formatDate } from './utils.js';

export let transactions = [];

/**
 * Добавляет новую транзакцию в массив.
 * @param {number} amount - Сумма транзакции.
 * @param {string} category - Категория транзакции ("Доход" или "Расход").
 * @param {string} description - Полное описание транзакции.
 */
export function addTransaction(amount, category, description) {
    const newTransaction = {
        id: generateId(),
        date: formatDate(new Date()),
        amount,
        category,
        description
    };
    transactions.push(newTransaction);
}

/**
 * Удаляет транзакцию по её ID.
 * @param {string} id - Уникальный идентификатор транзакции.
 */
export function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
}
