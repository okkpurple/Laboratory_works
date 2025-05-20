import { addTransaction, deleteTransaction } from './transactions.js';
import { renderTransactions, updateTotal, showDetails } from './ui.js';

/**
 * Инициализация приложения.
 * Назначает обработчики событий и отображает начальное состояние.
 */
document.addEventListener('DOMContentLoaded', () => {
    renderTransactions();
    updateTotal();

    // Обработчик отправки формы
    document.getElementById('transaction-form').addEventListener('submit', handleFormSubmit);

    // Делегирование событий на таблице (удаление и отображение описания)
    document.getElementById('transactions-table').addEventListener('click', handleTableClick);
});

/**
 * Обрабатывает отправку формы для добавления транзакции.
 * @param {Event} event - Событие отправки формы.
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();

    if (isNaN(amount) || description === '') {
        alert('Пожалуйста, заполните все поля корректно.');
        return;
    }

    addTransaction(amount, category, description);
    renderTransactions();
    updateTotal();

    // Очистка формы
    event.target.reset();
}

/**
 * Обрабатывает клики внутри таблицы:
 * - Удаление транзакции по кнопке.
 * - Отображение полного описания при клике на строку.
 * @param {MouseEvent} event - Событие клика.
 */
function handleTableClick(event) {
    const target = event.target;

    // Если клик на кнопке "Удалить"
    if (target.classList.contains('delete-btn')) {
        const id = target.dataset.id;
        deleteTransaction(id);
        renderTransactions();
        updateTotal();
        document.getElementById('full-description').textContent = '';
    }

    // Если клик на строке таблицы (не на кнопке)
    const row = target.closest('tr');
    if (row && row.dataset.id && !target.classList.contains('delete-btn')) {
        showDetails(row.dataset.id);
    }
}
