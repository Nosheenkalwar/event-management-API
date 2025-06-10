document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadVenues() {
    try {
      const res = await fetch(apiBaseURL + '/venues');
      if (!res.ok) throw new Error('Failed to fetch venues');
      const venues = await res.json();

      const tbody = document.querySelector('#venuesTable tbody');
      tbody.innerHTML = '';

      venues.forEach(venue => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${venue.venue_id}</td>
          <td>${venue.name}</td>
          <td>${venue.location}</td>
          <td>${venue.capacity}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading venues:', err);
    }
  }

  const addBtn = document.getElementById('btnAddVenue');
  const addModal = new bootstrap.Modal(document.getElementById('addVenueModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('venueForm').reset();
    addModal.show();
  });

  document.getElementById('venueForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const location = document.getElementById('location').value.trim();
    const capacity = parseInt(document.getElementById('capacity').value.trim());
    const statusDiv = document.getElementById('statusMessage');

    try {
      const res = await fetch(apiBaseURL + '/add_venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, capacity }),
      });

      if (res.ok) {
        const newVenue = await res.json();
        statusDiv.innerHTML = `<span class="text-success">✅ Venue "${newVenue.name}" added!</span>`;
        loadVenues();
        this.reset();
        setTimeout(() => addModal.hide(), 1500);
      } else {
        const error = await res.json();
        statusDiv.innerHTML = `<span class="text-danger">❌ Failed: ${error.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding venue:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Something went wrong.</span>`;
    }
  });

  loadVenues();
});
