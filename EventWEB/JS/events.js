document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadEvents() {
    try {
      const res = await fetch(apiBaseURL + '/event');
      const events = await res.json();
      const tbody = document.querySelector('#eventTable tbody');
      tbody.innerHTML = '';

      events.forEach(e => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${e.event_id}</td>
          <td>${e.name}</td>
          <td>${e.description || '-'}</td>
          <td>${e.date}</td>
          <td>${e.time}</td>
          <td>${e.venue_id}</td>
          <td>${e.category_id}</td>
          <td>${e.organizer_id}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading events:', err);
    }
  }

  loadEvents();
});
