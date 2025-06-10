
document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadUsers() {
    try {
      const res = await fetch(apiBaseURL + '/users');
      const user = await res.json();
      const tbody = document.querySelector('#userTable tbody');
      tbody.innerHTML = '';

      user.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.user_id}</td>
          <td>${user.user_name}</td> <!-- fixed from full_name -->
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>${new Date(user.created_at).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading Users:', err);
    }
  }

  loadUsers();
});