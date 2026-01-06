// Быстрый просмотр истории платежей (всплывающее окно)
function viewInvoiceDetails(invoiceId) {
    fetch(`ajax/get_invoice_summary.php?id=${invoiceId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const invoice = data.invoice;
                const payments = data.payments;
                
                // Создаем всплывающее окно
                const popup = document.createElement('div');
                popup.className = 'popup-overlay';
                popup.innerHTML = `
                    <div class="popup-content">
                        <div class="popup-header">
                            <h4>Счет №${escapeHtml(invoice.invoice_number)}</h4>
                            <span class="popup-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                        </div>
                        <div class="popup-body">
                            <p><strong>Клиент:</strong> ${escapeHtml(invoice.client_name)}</p>
                            <p><strong>Сумма:</strong> ${formatCurrency(invoice.amount)}</p>
                            <p><strong>Оплачено:</strong> ${formatCurrency(invoice.paid_amount)}</p>
                            <p><strong>Остаток:</strong> ${formatCurrency(invoice.amount - invoice.paid_amount)}</p>
                            
                            <h5>Последние платежи:</h5>
                            ${payments.length > 0 ? `
                                <div class="quick-payments">
                                    ${payments.slice(0, 3).map(payment => `
                                        <div class="quick-payment">
                                            <span>${payment.formatted_date}</span>
                                            <strong>${formatCurrency(payment.amount)}</strong>
                                            <small>${getPaymentMethodText(payment.payment_method)}</small>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<p class="text-muted">Нет платежей</p>'}
                            
                            <div class="popup-actions">
                                <button class="btn btn-sm btn-success" onclick="addPayment(${invoiceId})">
                                    <i class="fas fa-plus"></i> Внести оплату
                                </button>
                                <button class="btn btn-sm btn-primary" onclick="viewInvoice(${invoiceId})">
                                    <i class="fas fa-external-link-alt"></i> Подробнее
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(popup);
            }
        });
}

// Создайте файл ajax/get_invoice_summary.php: