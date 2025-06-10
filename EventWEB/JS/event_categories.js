document.addEventListener('DOMContentLoaded', () => {
  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';

  async function loadCategories() {
    try {
      const res = await fetch(apiBaseURL + '/event_categories');
      if (!res.ok) throw new Error('Failed to fetch event categories');
      const categories = await res.json();

      const tbody = document.querySelector('#categoriesTable tbody');
      tbody.innerHTML = '';

      categories.forEach(cat => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${cat.category_id}</td>
          <td>${cat.name}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  }

  const addBtn = document.getElementById('btnAdd');
  const addModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));

  addBtn.addEventListener('click', () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('categoryForm').reset();
    addModal.show();
  });

  document.getElementById('categoryForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const statusDiv = document.getElementById('statusMessage');

    try {
      const res = await fetch(apiBaseURL + '/event_categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const result = await res.json();

      if (res.ok) {
        statusDiv.innerHTML = `<span class="text-success">✅ Category "${result.name}" added!</span>`;
        loadCategories();
        this.reset();
        setTimeout(() => addModal.hide(), 1500);
      } else {
        statusDiv.innerHTML = `<span class="text-danger">❌ Failed: ${result.error}</span>`;
      }
    } catch (err) {
      console.error('Error adding category:', err);
      statusDiv.innerHTML = `<span class="text-danger">❌ Something went wrong.</span>`;
    }
  });

  loadCategories();
});
