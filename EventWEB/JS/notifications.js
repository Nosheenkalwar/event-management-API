document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadNotifications() {
    try {
      const res = await fetch(`${apiBaseURL}/notifications`);
      const notifications = await res.json();

      const tbody = document.querySelector('#notificationTable tbody');
      tbody.innerHTML = '';

      notifications.forEach(n => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${n.notification_id}</td>
          <td>${n.attendee_id}</td>
          <td>${n.message}</td>
          <td>${n.sent_date}</td>
          <td>${n.status}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  }

  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addnotificationModal'));
  const form = document.getElementById('notificationForm');
  const statusDiv = document.getElementById('statusMessage');

  addBtn.addEventListener('click', () => {
    statusDiv.innerHTML = '';
    form.reset();
    addModal.show();
  });

  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const attendee_id = document.getElementById('attendee_id').value.trim();
    const message = document.getElementById('message').value.trim();
    const sent_date = document.getElementById('sent_date').value.trim();
    const status = document.getElementById('status').value.trim();

    try {
      const res = await fetch(`${apiBaseURL}/add_notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendee_id, message, sent_date, status })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Unknown error');
      }

      const newNotification = await res.json();
      statusDiv.innerHTML = `<span class="text-success">✅ Notification ${newNotification.notification_id} added successfully!</span>`;
      loadNotifications();
      form.reset();
      setTimeout(() => addModal.hide(), 1500);

    } catch (err) {
      console.error('Error adding notification:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Failed to add notification: ${err.message}</span>`;
    }
  });

  loadNotifications();
});
