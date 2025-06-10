document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadSchedules() {
    try {
      const res = await fetch(`${apiBaseURL}/schedules`);
      const schedules = await res.json();

      const tbody = document.querySelector('#schedulesTable tbody');
      tbody.innerHTML = '';

      schedules.forEach(sch => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${sch.schedule_id}</td>
          <td>${sch.event_id}</td>
          <td>${sch.activity}</td>
          <td>${sch.start_time}</td>
          <td>${sch.end_time}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading schedules:', err);
    }
  }

  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addScheduleModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('scheduleForm').reset();
    document.getElementById('statusMessage').innerHTML = '';
    addModal.show();
  });

  document.getElementById('scheduleForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const event_id = parseInt(document.getElementById('event_id').value);
    const activity = document.getElementById('activity').value;
    const start_time = document.getElementById('start_time').value;
    const end_time = document.getElementById('end_time').value;
    const statusMessage = document.getElementById('statusMessage');

    try {
      const res = await fetch(`${apiBaseURL}/add_schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id, activity, start_time, end_time })
      });

      const result = await res.json();

      if (res.ok) {
        statusMessage.innerHTML = `<span class="text-success">✅ Schedule added for Event ID ${result.event_id}</span>`;
        await loadSchedules();
        this.reset();
        setTimeout(() => addModal.hide(), 1500);
      } else {
        statusMessage.innerHTML = `<span class="text-danger">❌ Failed: ${result.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding schedule:', err);
      statusMessage.innerHTML = `<span class="text-danger">❌ Something went wrong.</span>`;
    }
  });

  loadSchedules();
});
