document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadSchedules() {
    try {
      const res = await fetch(apiBaseURL + '/schedules');
      const schedules = await res.json();
      const tbody = document.querySelector('#scheduleTable tbody');
      tbody.innerHTML = '';

      schedules.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${s.schedule_id}</td>
          <td>${s.event_id}</td>
          <td>${s.activity}</td>
          <td>${s.start_time}</td>
          <td>${s.end_time}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading schedules:', err);
    }
  }

  loadSchedules();
});
