document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadTickets() {
    try {
      const res = await fetch(apiBaseURL + '/tickets');
      const tickets = await res.json();
      const tbody = document.querySelector('#ticketTable tbody');
      tbody.innerHTML = '';

      tickets.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${t.ticket_id}</td>
          <td>${t.event_id}</td>
          <td>${t.ticket_type}</td>
          <td>${t.price}</td>
          <td>${t.quantity}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading tickets:', err);
    }
  }

  loadTickets();
});
