document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev'; // use your working URL

  const tbody = document.querySelector('#feedbackTable tbody');
  const feedbackForm = document.getElementById('feedbackForm');
  const statusMessage = document.getElementById('statusMessage');
  const modalElement = document.getElementById('addfeedbackModal');
  const modal = new bootstrap.Modal(modalElement);
  const btnAddFeedback = document.getElementById('btnAddFeedback');

  async function loadFeedback() {
    try {
      const res = await fetch(`${apiBaseURL}/feedback`);
      if (!res.ok) throw new Error('Failed to fetch feedback');
      const feedback = await res.json();

      tbody.innerHTML = '';

      feedback.forEach(fb => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${fb.feedback_id}</td>
          <td>${fb.attendee_id}</td>
          <td>${fb.event_id}</td>
          <td>${fb.rating}</td>
          <td>${fb.comments || ''}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading feedback:', err);
      tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Failed to load feedback.</td></tr>`;
    }
  }

  btnAddFeedback.addEventListener('click', () => {
    feedbackForm.reset();
    statusMessage.innerHTML = '';
    modal.show();
  });

  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const attendee_id = parseInt(document.getElementById('attendee_id').value);
    const event_id = parseInt(document.getElementById('event_id').value);
    const rating = parseInt(document.getElementById('rating').value);
    const comments = document.getElementById('comments').value;

    try {
      const res = await fetch(`${apiBaseURL}/add_feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendee_id, event_id, rating, comments })
      });

      const result = await res.json();

      if (res.ok) {
        statusMessage.innerHTML = '<span class="text-success">✅ Feedback submitted!</span>';
        await loadFeedback();
        setTimeout(() => modal.hide(), 1500);
      } else {
        statusMessage.innerHTML = `<span class="text-danger">❌ Error: ${result.error}</span>`;
      }
    } catch (err) {
      console.error('Error:', err);
      statusMessage.innerHTML = '<span class="text-danger">❌ Request failed.</span>';
    }
  });

  loadFeedback();
});
