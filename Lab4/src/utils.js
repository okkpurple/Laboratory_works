/**
 * Генерирует уникальный идентификатор транзакции.
 * @returns {string} Уникальный ID.
 */
export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Форматирует объект Date в строку с датой и временем.
 * @param {Date} date - Объект даты.
 * @returns {string} Отформатированная строка даты.
 */
export function formatDate(date) {
    return date.toLocaleString();
}
