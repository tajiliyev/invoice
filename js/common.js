// js/common.js

// Функция для показа сообщений
function showMessage(type, text) {
    const message = document.createElement('div');
    message.className = `flash-message flash-${type}`;
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${escapeHtml(text)}
        </div>
        <button class="message-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(message, mainContent.firstChild);
    } else {
        document.body.insertBefore(message, document.body.firstChild);
    }
    
    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 5000);
}

// Вспомогательные функции
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'TMT'
    }).format(amount);
}

// Модальные окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Глобальный обработчик клика вне модального окна
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
