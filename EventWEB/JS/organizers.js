document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadOrganizers() {
    try {
      const res = await fetch(apiBaseURL + '/organizers');
      if (!res.ok) throw new Error('Failed to fetch organizers');
      const organizers = await res.json();

      const tbody = document.querySelector('#organizersTable tbody');
      tbody.innerHTML = '';

      organizers.forEach(org => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${org.organizer_id}</td>
          <td>${org.name}</td>
          <td>${org.email}</td>
          <td>${org.phone || ''}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading organizers:', err);
    }
  }

  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addOrganizerModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('organizerForm').reset();
    addModal.show();
  });

  document.getElementById('organizerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const statusDiv = document.getElementById('statusMessage');

    try {
      const res = await fetch(apiBaseURL + '/add_organizers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      const result = await res.json();

      if (res.ok) {
        statusDiv.innerHTML = `<span class="text-success">✅ Organizer "${result.name}" added!</span>`;
        loadOrganizers();
        this.reset();
        setTimeout(() => addModal.hide(), 1500);
      } else {
        statusDiv.innerHTML = `<span class="text-danger">❌ Failed: ${result.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding organizer:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Something went wrong.</span>`;
    }
  });

  loadOrganizers();
});
