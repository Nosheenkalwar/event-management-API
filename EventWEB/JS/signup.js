document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const user_name = document.getElementById('user_name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  const errorDiv = document.getElementById('signupError');
  const successDiv = document.getElementById('signupSuccess');
  errorDiv.textContent = '';
  successDiv.textContent = '';

  if (!user_name || !email || !password || !role) {
    errorDiv.textContent = 'Please fill out all fields.';
    return;
  }

  try {
    const res = await fetch(
      'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name, email, password, role }),
      }
    );

    const data = await res.json();

    if (data.success) {
      successDiv.textContent = 'Signup successful! Redirecting to login...';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      errorDiv.textContent = data.message || 'Signup failed';
    }
  } catch (err) {
    console.error('Error:', err);
    errorDiv.textContent = 'Something went wrong';
  }
});
