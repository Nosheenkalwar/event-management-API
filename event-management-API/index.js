const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('WELCOME TO EVENT MANAGEMENT SYSTEM API');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/event', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/attendees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM attendees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/organizers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM organizers');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/venues', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM venues');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/event_categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM event_categories');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/tickets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickets');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/registrations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM registrations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/payments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/schedules', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM schedules');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/feedback', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM feedback');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/sponsors', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sponsors');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/staff', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM staff');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/notifications', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notifications');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});




app.post('/add_attendees', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO attendees (full_name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding attendee:', err);
    res.status(500).json({ error: 'Failed to add attendee' });
  }
});

app.post('/add_notifications', async (req, res) => {
  const { attendee_id, message, sent_date, status } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO notifications (attendee_id, message, sent_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [attendee_id, message, sent_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding notification:', err);
    res.status(500).json({ error: 'Failed to add notification' });
  }
});

app.post('/add_payments', async (req, res) => {
  const { registration_id, amount, payment_date, payment_method } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO payments (registration_id, amount, payment_date, payment_method) VALUES ($1, $2, $3, $4) RETURNING *',
      [registration_id, amount, payment_date, payment_method]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding payment:', err);
    res.status(500).json({ error: 'Failed to add payment' });
  }
});

app.post('/add_registrations', async (req, res) => {
  const { attendee_id, ticket_id, registration_date, payment_status } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO registrations (attendee_id, ticket_id, registration_date, payment_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [attendee_id, ticket_id, registration_date, payment_status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding registration:', err);
    res.status(500).json({ error: 'Failed to add registration' });
  }
});

app.post('/add_tickets', async (req, res) => {
  const { event_id, ticket_type, price, quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tickets (event_id, ticket_type, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [event_id, ticket_type, price, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding ticket:', err.message);
    res.status(500).json({ error: 'Failed to add ticket' });
  }
});

app.post('/add_events', async (req, res) => {
  const { name, description, date, time, venue_id, category_id, organizer_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO events 
        (name, description, date, time, venue_id, category_id, organizer_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, description, date, time, venue_id, category_id, organizer_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding event:', err.message);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

app.post('/add_venues', async (req, res) => {
  const { name, location, capacity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO venues (name, location, capacity) VALUES ($1, $2, $3) RETURNING *',
      [name, location, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding venue:', err.message);
    res.status(500).json({ error: 'Failed to add venue' });
  }
});

app.post('/add_organizers', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO organizers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding organizer:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/event_categories', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO event_categories (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding category:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/add_schedule', async (req, res) => {
  const { event_id, activity, start_time, end_time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO schedules (event_id, activity, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [event_id, activity, start_time, end_time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding schedule:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/add_sponsor', async (req, res) => {
  const { name, event_id, amount, sponsorship_type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO sponsors (name, event_id, amount, sponsorship_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, event_id, amount, sponsorship_type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.post('/add_staff', async (req, res) => {
  const { name, role, event_id, contact_number } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO staff (name, role, event_id, contact_number) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, role, event_id, contact_number]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/add_feedback', async (req, res) => {
  const { attendee_id, event_id, rating, comments } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO feedback (attendee_id, event_id, rating, comments) VALUES ($1, $2, $3, $4) RETURNING *',
      [attendee_id, event_id, rating, comments]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/signup', async (req, res) => {
  const { user_name, email, password, role } = req.body;

  if (!user_name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE user_name = $1 OR email = $2',
      [user_name, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'Username or Email already exists' });
    }

    await pool.query(
      'INSERT INTO users (user_name, email, password, role) VALUES ($1, $2, $3, $4)',
      [user_name, email, password, role]
    );

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});



app.post('/login', async (req, res) => {
  const { user_name, password } = req.body;

  
  if (!user_name || !password) {
    return res.status(400).json({ success: false, message: 'Please fill out all fields.' });
  }

  try {
    
    const result = await pool.query(
      'SELECT * FROM users WHERE user_name = $1 AND password = $2',
      [user_name, password]
    );

    if (result.rows.length === 0) {
     
      return res.status(401).json({ success: false, message: 'Username or password is incorrect.' });
    }

   
    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});


app.post('/admin_login', async (req, res) => {
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    return res.status(400).json({ success: false, message: 'Please fill out all fields.' });
  }

  try {
    
    const result = await pool.query(
      'SELECT * FROM users WHERE user_name = $1 AND password = $2 AND role = $3',
      [user_name, password , 'admin']
    );
     if (result.rows.length === 0) {
      
      return res.status(401).json({ success: false, message: 'Username or password is incorrect or not an admin' });
    }

   
    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

app.get('/Tattendees', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM attendees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tevents', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM events');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tregistrations', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM registrations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tpayments', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM payments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tfeedback', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM feedback');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tvenues', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM venues');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Torganizers', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM organizers');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tevent_categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM event_categories');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tsponsors', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM sponsors');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tstaff', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM staff');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Ttickets', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM tickets');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tnotifications', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM notifications');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tschedules', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM schedules');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Tusers', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/events-by-category', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ec.name AS category, COUNT(e.event_id) AS total_events
      FROM event_categories ec
      LEFT JOIN events e ON ec.category_id = e.category_id
      GROUP BY ec.name
      ORDER BY total_events DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

git 
app.get('/payment-methods', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT payment_method, COUNT(*) AS count
      FROM payments
      GROUP BY payment_method
      ORDER BY count DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/registration-status', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT payment_status, COUNT(*) AS count
      FROM registrations
      GROUP BY payment_status
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching registration status data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/feedback-ratings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT rating, COUNT(*) AS count
      FROM feedback
      GROUP BY rating
      ORDER BY rating
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching feedback rating data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Connected Successfully on PORT ${PORT}`);
});









