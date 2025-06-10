document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadSponsors() {
    try {
      const res = await fetch(`${apiBaseURL}/sponsors`);
      const sponsors = await res.json();

      const tbody = document.querySelector('#sponsorsTable tbody');
      tbody.innerHTML = '';

      sponsors.forEach(sp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${sp.sponsor_id}</td>
          <td>${sp.name}</td>
          <td>${sp.event_id}</td>
          <td>${sp.amount}</td>
          <td>${sp.sponsorship_type}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading sponsors:', err);
    }
  }

  const sponsorForm = document.getElementById('sponsorForm');
  const modal = new bootstrap.Modal(document.getElementById('addSponsorModal'));
  const statusMessage = document.getElementById('statusMessage');

  document.getElementById('btnAddSponsor').addEventListener('click', () => {
    sponsorForm.reset();
    statusMessage.innerHTML = '';
    modal.show();
  });

  sponsorForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const event_id = parseInt(document.getElementById('event_id').value);
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const sponsorship_type = document.getElementById('sponsorship_type').value;

    try {
      const res = await fetch(`${apiBaseURL}/add_sponsor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, event_id, amount, sponsorship_type })
      });

      const result = await res.json();

      if (res.ok) {
        statusMessage.innerHTML = '<span class="text-success">✅ Sponsor added!</span>';
        await loadSponsors();
        setTimeout(() => modal.hide(), 1500);
      } else {
        statusMessage.innerHTML = `<span class="text-danger">❌ Error: ${result.error}</span>`;
      }
    } catch (err) {
      console.error('Error:', err);
      statusMessage.innerHTML = '<span class="text-danger">❌ Request failed.</span>';
    }
  });

  loadSponsors();
});
