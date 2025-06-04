document.addEventListener('DOMContentLoaded', () => {
  const invoiceTableBody = document.getElementById('invoice-table-body');
  const addInvoiceBtn = document.getElementById('add-invoice-btn');
  const invoiceFormSection = document.getElementById('invoice-form-section');
  const invoiceListSection = document.getElementById('invoice-list-section');
  const invoiceForm = document.getElementById('invoice-form');
  const formTitle = document.getElementById('form-title');
  const cancelBtn = document.getElementById('cancel-btn');

  const invoiceIdInput = document.getElementById('invoice-id');
  const invoiceNumberInput = document.getElementById('invoice-number');
  const issuerIdSelect = document.getElementById('issuer-id');
  const buyerIdSelect = document.getElementById('buyer-id');
  const invoiceDateInput = document.getElementById('invoice-date');
  const completionDateInput = document.getElementById('completion-date');
  const paymentDeadlineInput = document.getElementById('payment-deadline');
  const totalAmountInput = document.getElementById('total-amount');
  const vatAmountInput = document.getElementById('vat-amount');

  let buyers = [];

  function fetchBuyers() {
    fetch('/buyers')
      .then(res => res.json())
      .then(data => {
        buyers = data;
        buyerIdSelect.innerHTML = '';
        buyers.forEach(buyer => {
          const option = document.createElement('option');
          option.value = buyer.id;
          option.textContent = buyer.name;
          buyerIdSelect.appendChild(option);
        });
      });
  }

  function fetchInvoices() {
    fetch('/invoices')
      .then(res => res.json())
      .then(data => {
        invoiceTableBody.innerHTML = '';
        data.forEach(inv => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${inv.buyer_id}</td>
            <td>${inv.invoice_number}</td>
            <td>${inv.issuer_name}</td>
            <td>${inv.buyer_name}</td>
            <td>${inv.invoice_date}</td>
            <td>${inv.completion_date}</td>
            <td>${inv.payment_deadline}</td>
            <td>${inv.total_amount.toFixed(2)}</td>
            <td>${inv.vat_amount.toFixed(2)}</td>
            <td>${inv.canceled ? 'Canceled' : 'Active'}</td>
            <td>
              <button class="cancel-btn" data-id="${inv.id}" ${inv.canceled ? 'disabled' : ''}>Cancel</button>
            </td>
          `;
          invoiceTableBody.appendChild(tr);
        });
        addTableEventListeners();
      });
  }

  function addTableEventListeners() {
    document.querySelectorAll('.cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        cancelInvoice(id);
      });
    });
  }

  function showForm() {
    invoiceListSection.classList.add('hidden');
    invoiceFormSection.classList.remove('hidden');
  }

  function hideForm() {
    invoiceListSection.classList.remove('hidden');
    invoiceFormSection.classList.add('hidden');
    invoiceForm.reset();
    invoiceIdInput.value = '';
  }

  function editInvoice(id) {
    fetch(`/invoices/${id}`)
      .then(res => res.json())
      .then(inv => {
        formTitle.textContent = 'Edit Invoice';
        invoiceIdInput.value = inv.id;
        invoiceNumberInput.value = inv.invoice_number;
        issuerIdSelect.value = inv.issuer_id;
        buyerIdSelect.value = inv.buyer_id;
        invoiceDateInput.value = inv.invoice_date;
        completionDateInput.value = inv.completion_date;
        paymentDeadlineInput.value = inv.payment_deadline;
        totalAmountInput.value = inv.total_amount;
        vatAmountInput.value = inv.vat_amount;
        showForm();
      });
  }

  function deleteInvoice(id) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      fetch(`/invoices/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            fetchInvoices();
          } else {
            alert('Failed to delete invoice');
          }
        });
    }
  }

  invoiceForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = invoiceIdInput.value;

    // Generate invoice number for new invoice
    if (!id) {
      const buyerId = parseInt(buyerIdSelect.value);
      // Find existing invoices for this buyer
      const buyerInvoices = [];
      const rows = document.querySelectorAll('#invoice-table-body tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1) {
          const rowBuyerId = parseInt(cells[0].textContent);
          if (rowBuyerId === buyerId) {
            buyerInvoices.push(cells[1].textContent);
          }
        }
      });
      // Extract the last number i from invoice_number format "INV-${buyerId}-00${i}"
      let maxI = 0;
      buyerInvoices.forEach(invNum => {
        const match = invNum.match(new RegExp(`INV-${buyerId}-00(\\d+)`));
        if (match) {
          const num = parseInt(match[1]);
          if (num > maxI) maxI = num;
        }
      });
      const newI = maxI + 1;
      const newInvoiceNumber = `INV-${buyerId}-00${newI}`;
      invoiceNumberInput.value = newInvoiceNumber;
    }

    const invoiceData = {
      issuer_id: parseInt(issuerIdSelect.value),
      buyer_id: parseInt(buyerIdSelect.value),
      invoice_number: invoiceNumberInput.value,
      invoice_date: invoiceDateInput.value,
      completion_date: completionDateInput.value,
      payment_deadline: paymentDeadlineInput.value,
      total_amount: parseFloat(totalAmountInput.value),
      vat_amount: parseFloat(vatAmountInput.value)
    };
    if (id) {
      // Update
      fetch(`/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
      }).then(res => {
        if (res.ok) {
          hideForm();
          fetchInvoices();
        } else {
          alert('Failed to update invoice');
        }
      });
    } else {
      // Create
      fetch('/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
      }).then(res => {
        if (res.ok) {
          hideForm();
          fetchInvoices();
        } else {
          alert('Failed to create invoice');
        }
      });
    }
  });

  cancelBtn.addEventListener('click', () => {
    hideForm();
  });

  function cancelInvoice(id) {
    if (confirm('Are you sure you want to cancel this invoice?')) {
      fetch(`/invoices/${id}/cancel`, { method: 'POST' })
        .then(res => {
          if (res.ok) {
            fetchInvoices();
          } else {
            alert('Failed to cancel invoice');
          }
        });
    }
  }

  addInvoiceBtn.addEventListener('click', () => {
    formTitle.textContent = 'Add Invoice';
    invoiceForm.reset();
    invoiceIdInput.value = '';
    showForm();
  });

  // Initial load
  fetchBuyers();
  fetchInvoices();
});
