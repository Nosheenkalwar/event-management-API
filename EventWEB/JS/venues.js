document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadVenues() {
    try {
      const res = await fetch(apiBaseURL + '/venues');
      const venues = await res.json();
      const tbody = document.querySelector('#venueTable tbody');
      tbody.innerHTML = '';

      venues.forEach(v => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${v.venue_id}</td>
          <td>${v.name}</td>
          <td>${v.location}</td>
          <td>${v.capacity}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading venues:', err);
    }
  }

  loadVenues();
});
