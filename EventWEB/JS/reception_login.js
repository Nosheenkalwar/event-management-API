document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const backBtn = document.getElementById('backBtn');
  const errorDiv = document.getElementById('loginError');
  const successDiv = document.getElementById('loginSuccess');

  const apiBaseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev'; 

  backBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html';  // go to signup page
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorDiv.textContent = '';
    successDiv.textContent = '';

    const user_name = document.getElementById('user_name').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!user_name || !password) {
      errorDiv.textContent = 'Please fill out all fields.';
      return;
    }

    try {
      const res = await fetch(`${apiBaseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name, password })
      });

      const result = await res.json();

      if (res.ok && result.success) {
        successDiv.textContent = 'Login successful! Redirecting...';
        setTimeout(() => {
          window.location.href = 'reception.html';  // redirect on successful login
        }, 1500);
      } else {
        errorDiv.textContent = result.message || 'Invalid username or password.';
      }
    } catch (error) {
      errorDiv.textContent = 'Something went wrong. Please try again later.';
      console.error('Login error:', error);
    }
  });
});
