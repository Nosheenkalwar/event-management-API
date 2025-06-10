document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadRegistrations() {
    try {
      const res = await fetch(apiBaseURL + '/registrations');
      const registrations = await res.json();
      const tbody = document.querySelector('#registrationTable tbody');
      tbody.innerHTML = '';

      registrations.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${r.registration_id}</td>
          <td>${r.attendee_id}</td>
          <td>${r.ticket_id}</td>
          <td>${r.registration_date}</td>
          <td>${r.payment_status}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading registrations:', err);
    }
  }

  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addRegistrationModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('registrationForm').reset();
    addModal.show();
  });

  document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const attendee_id = document.getElementById('attendee_id').value.trim();
    const ticket_id = document.getElementById('ticket_id').value.trim();
    const registration_date = document.getElementById('registration_date').value;
    const payment_status = document.getElementById('payment_status').value;
    const statusDiv = document.getElementById('statusMessage');

    try {
      const res = await fetch(apiBaseURL + '/add_registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendee_id, ticket_id, registration_date, payment_status }),
      });

      if (res.ok) {
        const newReg = await res.json();
        statusDiv.innerHTML = `<span class="text-success">✅ Registration ${newReg.registration_id} added!</span>`;
        loadRegistrations();
        this.reset();
        setTimeout(() => addModal.hide(), 1500);
      } else {
        const error = await res.json();
        statusDiv.innerHTML = `<span class="text-danger">❌ Failed: ${error.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding registration:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Something went wrong.</span>`;
    }
  });

  loadRegistrations();
});
