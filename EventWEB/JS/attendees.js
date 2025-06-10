document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  // Fetch and render attendees on page load
  async function loadAttendees() {
    try {
      const res = await fetch(apiBaseURL + '/attendees');
      const attendees = await res.json();
      const tbody = document.querySelector('#attendeeTable tbody');
      tbody.innerHTML = '';

      attendees.forEach(att => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${att.attendee_id}</td>
          <td>${att.full_name}</td>
          <td>${att.email}</td>
          <td>${att.phone}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading attendees:', err);
    }
  }

  // Show modal on Add button click
  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addAttendeeModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('attendeeForm').reset();
    addModal.show();
  });

  // Handle form submission to add attendee
  document.getElementById('attendeeForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const statusDiv = document.getElementById('statusMessage');

    try {
      const res = await fetch(apiBaseURL + '/add_attendees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      if (res.ok) {
        const newAttendee = await res.json();
        statusDiv.innerHTML = `<span class="text-success">✅ Attendee ${newAttendee.full_name} added successfully!</span>`;
        loadAttendees();   // Reload attendees list to include the new one
        this.reset();
        setTimeout(() => {
          addModal.hide();
        }, 1500);
      } else {
        const error = await res.json();
        statusDiv.innerHTML = `<span class="text-danger">❌ Failed to add attendee: ${error.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding attendee:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Something went wrong. Try again.</span>`;
    }
  });

  // Initial load
  loadAttendees();
});
