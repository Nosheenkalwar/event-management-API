document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadEvents() {
    try {
      const res = await fetch(apiBaseURL + '/event');
      if (!res.ok) throw new Error('Failed to fetch events');
      const events = await res.json();

      const tbody = document.querySelector('#eventsTable tbody');
      tbody.innerHTML = '';

      events.forEach(event => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${event.event_id}</td>
          <td>${event.name}</td>
          <td>${event.description || ''}</td>
          <td>${event.date}</td>
          <td>${event.time}</td>
          <td>${event.venue_id}</td>
          <td>${event.category_id}</td>
          <td>${event.organizer_id}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading events:', err);
    }
  }

  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addEventModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('eventForm').reset();
    addModal.show();
  });

  document.getElementById('eventForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const venue_id = parseInt(document.getElementById('venue_id').value);
    const category_id = parseInt(document.getElementById('category_id').value);
    const organizer_id = parseInt(document.getElementById('organizer_id').value);
    const statusDiv = document.getElementById('statusMessage');

    try {
      const res = await fetch(apiBaseURL + '/add_events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, date, time, venue_id, category_id, organizer_id }),
      });

      if (res.ok) {
        const newEvent = await res.json();
        statusDiv.innerHTML = `<span class="text-success">✅ Event "${newEvent.name}" added!</span>`;
        loadEvents();
        this.reset();
        setTimeout(() => addModal.hide(), 1500);
      } else {
        const error = await res.json();
        statusDiv.innerHTML = `<span class="text-danger">❌ Failed: ${error.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding event:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Something went wrong.</span>`;
    }
  });

  loadEvents();
});
