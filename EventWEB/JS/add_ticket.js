document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadTickets() {
    try {
      const res = await fetch(`${apiBaseURL}/tickets`);
      const tickets = await res.json();

      const tbody = document.querySelector('#ticketsTable tbody');
      tbody.innerHTML = '';

      tickets.forEach(ticket => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${ticket.ticket_id}</td>
          <td>${ticket.event_id}</td>
          <td>${ticket.ticket_type}</td>
          <td>${ticket.price}</td>
          <td>${ticket.quantity}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading tickets:', err);
    }
  }

  const ticketForm = document.getElementById('ticketForm');
  const modal = new bootstrap.Modal(document.getElementById('addTicketModal'));
  const statusMessage = document.getElementById('statusMessage');

  document.getElementById('btnAddTicket').addEventListener('click', () => {
    ticketForm.reset();
    statusMessage.innerHTML = '';
    modal.show();
  });

  ticketForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const event_id = parseInt(document.getElementById('event_id').value);
    const ticket_type = document.getElementById('ticket_type').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    try {
      const res = await fetch(`${apiBaseURL}/add_tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id, ticket_type, price, quantity })
      });

      const result = await res.json();

      if (res.ok) {
        statusMessage.innerHTML = '<span class="text-success">✅ Ticket added!</span>';
        await loadTickets();
        setTimeout(() => modal.hide(), 1500);
      } else {
        statusMessage.innerHTML = `<span class="text-danger">❌ Error: ${result.error}</span>`;
      }
    } catch (err) {
      console.error('Error:', err);
      statusMessage.innerHTML = '<span class="text-danger">❌ Request failed.</span>';
    }
  });

  loadTickets();
});
