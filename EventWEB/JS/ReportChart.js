const baseURL = 'https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev';


fetch(`${baseURL}/events-by-category`)
  .then(res => res.json())
  .then(data => {
    const labels = data.map(d => d.category);
    const counts = data.map(d => parseInt(d.total_events));

    const ctx = document.getElementById('eventsByCategoryChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Events',
          data: counts,
          backgroundColor: '#0d6efd'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Events by Category' },
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  })
  .catch(err => console.error('Error loading events by category:', err));


fetch(`${baseURL}/payment-methods`)
  .then(res => res.json())
  .then(data => {
    const labels = data.map(d => d.payment_method);
    const counts = data.map(d => parseInt(d.count));

    const ctx = document.getElementById('paymentMethodsChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Payment Methods',
          data: counts,
          backgroundColor: ['#198754', '#dc3545', '#ffc107', '#0dcaf0', '#6f42c1']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Payment Method Distribution' }
        }
      }
    });
  })
  .catch(err => console.error('Error loading payment methods:', err));


fetch(`${baseURL}/registration-status`)
  .then(res => res.json())
  .then(data => {
    const labels = data.map(d => d.payment_status);
    const counts = data.map(d => parseInt(d.count));

    const ctx = document.getElementById('registrationStatusChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Registration Status',
          data: counts,
          backgroundColor: ['#28a745', '#dc3545'] 
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Registration Payment Status' },
          legend: { position: 'bottom' }
        }
      }
    });
  })
  .catch(err => console.error('Error loading registration status:', err));



fetch(`${baseURL}/feedback-ratings`)
  .then(res => res.json())
  .then(data => {
    const labels = data.map(d => `Rating ${d.rating}`);
    const counts = data.map(d => parseInt(d.count));

    const ctx = document.getElementById('feedbackRatingsChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Feedbacks',
          data: counts,
          backgroundColor: '#0d6efd'
        }]
      },
     options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Feedback Ratings Distribution'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count'
            }
          }
        }
      }
    });
  })
  .catch(err => console.error('Error loading ratings:', err));