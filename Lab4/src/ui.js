import { transactions } from './transactions.js';

/**
 * Отображает все транзакции в таблице на странице.
 */
export function renderTransactions() {
    const tableBody = document.querySelector('#transactions-table tbody');
    tableBody.innerHTML = '';

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.dataset.id = transaction.id;
        row.classList.add(transaction.amount >= 0 ? 'green' : 'red');

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.description.split(' ').slice(0, 4).join(' ')}...</td>
            <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
        `;

        tableBody.appendChild(row);
    });
}

/**
 * Пересчитывает и обновляет общую сумму транзакций.
 */
export function updateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total').textContent = total;
}

/**
 * Отображает полное описание транзакции ниже таблицы.
 * @param {string} id - Уникальный идентификатор транзакции.
 */
export function showDetails(id) {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        document.getElementById('full-description').textContent = transaction.description;
    }
}
