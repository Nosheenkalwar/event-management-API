document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadPayments() {
    try {
      const res = await fetch(apiBaseURL + '/payments');
      const payments = await res.json();
      const tbody = document.querySelector('#paymentTable tbody');
      tbody.innerHTML = '';

      payments.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.payment_id}</td>
          <td>${p.registration_id}</td>
          <td>${p.amount}</td>
          <td>${new Date(p.payment_date).toLocaleString()}</td>
          <td>${p.payment_method}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading payments:', err);
    }
  }

  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addPaymentModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('paymentForm').reset();
    addModal.show();
  });

  document.getElementById('paymentForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const registration_id = document.getElementById('registration_id').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const payment_date = document.getElementById('payment_date').value.trim();
    const payment_method = document.getElementById('payment_method').value.trim();
    const statusDiv = document.getElementById('statusMessage');

    try {
      const res = await fetch(apiBaseURL + '/add_payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registration_id, amount, payment_date, payment_method }),
      });

      if (res.ok) {
        const newPayment = await res.json();
        statusDiv.innerHTML = `<span class="text-success">✅ Payment ${newPayment.payment_id} added successfully!</span>`;
        loadPayments();
        this.reset();
        setTimeout(() => {
          addModal.hide();
        }, 1500);
      } else {
        const error = await res.json();
        statusDiv.innerHTML = `<span class="text-danger">❌ Failed to add payment: ${error.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding payment:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Something went wrong. Try again.</span>`;
    }
  });

  loadPayments();
});
