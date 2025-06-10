document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadStaff() {
    try {
      const res = await fetch(`${apiBaseURL}/staff`);
      const staff = await res.json();

      const tbody = document.querySelector('#staffTable tbody');
      tbody.innerHTML = '';

      staff.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${s.staff_id}</td>
          <td>${s.name}</td>
          <td>${s.role}</td>
          <td>${s.event_id}</td>
          <td>${s.contact_number}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading staff:', err);
    }
  }

  const staffForm = document.getElementById('staffForm');
  const modal = new bootstrap.Modal(document.getElementById('addStaffModal'));
  const statusMessage = document.getElementById('statusMessage');

  document.getElementById('btnAddStaff').addEventListener('click', () => {
    staffForm.reset();
    statusMessage.innerHTML = '';
    modal.show();
  });

  staffForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const event_id = parseInt(document.getElementById('event_id').value);
    const contact_number = document.getElementById('contact_number').value;

    try {
      const res = await fetch(`${apiBaseURL}/add_staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, event_id, contact_number })
      });

      const result = await res.json();

      if (res.ok) {
        statusMessage.innerHTML = '<span class="text-success">✅ Staff added!</span>';
        await loadStaff();
        setTimeout(() => modal.hide(), 1500);
      } else {
        statusMessage.innerHTML = `<span class="text-danger">❌ Error: ${result.error}</span>`;
      }
    } catch (err) {
      console.error('Error:', err);
      statusMessage.innerHTML = '<span class="text-danger">❌ Request failed.</span>';
    }
  });

  loadStaff();
});
