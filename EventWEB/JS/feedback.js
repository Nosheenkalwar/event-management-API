document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadFeedback() {
    try {
      const res = await fetch(apiBaseURL + '/feedback');
      const feedbackList = await res.json();
      const tbody = document.querySelector('#feedbackTable tbody');
      tbody.innerHTML = '';

      feedbackList.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${f.feedback_id}</td>
          <td>${f.attendee_id}</td>
          <td>${f.event_id}</td>
          <td>${f.rating}</td>
          <td>${f.comments || ''}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading feedback:', err);
    }
  }

  loadFeedback();
});
