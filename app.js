const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: 'event-portal-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Make user available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ============================================
// MIDDLEWARE
// ============================================

function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

function isHost(req, res, next) {
  if (req.session.user && (req.session.user.role === 'host' || req.session.user.role === 'admin')) {
    return next();
  }
  res.status(403).send('Host access required');
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') return next();
  res.status(403).send('Admin only');
}

// ============================================
// ROUTES - HOME
// ============================================

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Event Portal - Welcome',
    message: 'Welcome to the Event Portal'
  });
});

// ============================================
// ROUTES - DATABASE TEST
// ============================================

app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 AS result');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'DB error', details: err.message });
  }
});

// ============================================
// ROUTES - AUTHENTICATION
// ============================================

// Register - Show form
app.get('/register', (req, res) => {
  res.render('register', { error: null, title: 'Register' });
});

// Register - Handle submission
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length) {
      return res.render('register', { error: 'User with this email already exists', title: 'Register' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    
    // Insert new user
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, role || 'student']
    );
    
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login - Show form
app.get('/login', (req, res) => {
  res.render('login', { error: null, title: 'Login' });
});

// Login - Handle submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      return res.render('login', { error: 'No user with that email', title: 'Login' });
    }
    
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.render('login', { error: 'Incorrect password', title: 'Login' });
    }
    
    // Set session
    req.session.user = { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    };
    
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Login error');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Dashboard
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { 
    user: req.session.user,
    title: 'Dashboard'
  });
});

// ============================================
// ROUTES - EVENTS (PUBLIC)
// ============================================

// Browse all events with filtering
app.get('/events', async (req, res) => {
  const { date, category, host } = req.query;

  let sql = `SELECT e.*, u.name AS host_name,
               (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS attendee_count
             FROM events e
             JOIN users u ON e.host_id = u.id
             WHERE 1=1`;
  const params = [];

  if (date) {
    sql += ' AND DATE(e.start_datetime) = ?';
    params.push(date);
  }
  if (category) {
    sql += ' AND e.category = ?';
    params.push(category);
  }
  if (host) {
    sql += ' AND u.name LIKE ?';
    params.push('%' + host + '%');
  }

  sql += ' ORDER BY e.start_datetime ASC';

  try {
    const [events] = await db.query(sql, params);
    res.render('events/index', { 
      events, 
      filters: { date, category, host },
      title: 'Browse Events'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading events');
  }
});

// Event detail page
app.get('/events/:id', async (req, res) => {
  const eventId = req.params.id;
  
  try {
    const [events] = await db.query(`
      SELECT e.*, u.name AS host_name,
        (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS attendee_count
      FROM events e
      JOIN users u ON e.host_id = u.id
      WHERE e.id = ?
    `, [eventId]);
    
    if (!events.length) {
      return res.status(404).send('Event not found');
    }
    
    const event = events[0];
    
    // Check if current user is registered
    let isRegistered = false;
    if (req.session.user) {
      const [reg] = await db.query(
        'SELECT * FROM registrations WHERE user_id = ? AND event_id = ?',
        [req.session.user.id, eventId]
      );
      isRegistered = reg.length > 0;
    }
    
    res.render('events/detail', { 
      event, 
      isRegistered,
      title: event.title
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading event');
  }
});

// Register for event
app.post('/events/:id/register', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  const userId = req.session.user.id;
  
  try {
    await db.query(
      'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)',
      [userId, eventId]
    );
    res.redirect('/events/' + eventId);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.redirect('/events/' + eventId); // already registered
    }
    console.error(err);
    res.status(500).send('Registration error');
  }
});

// Unregister from event
app.post('/events/:id/unregister', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  const userId = req.session.user.id;
  
  try {
    await db.query(
      'DELETE FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );
    res.redirect('/events/' + eventId);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unregistration error');
  }
});

// ============================================
// ROUTES - HOST EVENT MANAGEMENT
// ============================================

// List host's own events
app.get('/events/my/list', isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  
  try {
    const [events] = await db.query(`
      SELECT e.*, 
        (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS attendee_count
      FROM events e
      WHERE e.host_id = ?
      ORDER BY e.start_datetime DESC
    `, [userId]);
    
    res.render('events/my', { 
      events,
      title: 'My Events'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading your events');
  }
});

// Show create event form
app.get('/events/new', isAuthenticated, (req, res) => {
  res.render('events/new', { title: 'Create Event' });
});

// Create new event
app.post('/events', isAuthenticated, async (req, res) => {
  const { title, description, category, location, start_datetime, end_datetime, max_attendees } = req.body;
  
  try {
    await db.query(
      `INSERT INTO events (title, description, category, location, start_datetime, end_datetime, max_attendees, host_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, category, location, start_datetime, end_datetime || null, max_attendees || null, req.session.user.id]
    );
    res.redirect('/events/my/list');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating event');
  }
});

// Show edit event form
app.get('/events/:id/edit', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  
  try {
    const [events] = await db.query(
      'SELECT * FROM events WHERE id = ? AND host_id = ?',
      [eventId, req.session.user.id]
    );
    
    if (!events.length) {
      return res.status(404).send('Event not found or you are not the host');
    }
    
    res.render('events/edit', { 
      event: events[0],
      title: 'Edit Event'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading event');
  }
});

// Update event
app.post('/events/:id/edit', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  const { title, description, category, location, start_datetime, end_datetime, max_attendees } = req.body;
  
  try {
    const result = await db.query(
      `UPDATE events 
       SET title=?, description=?, category=?, location=?, start_datetime=?, end_datetime=?, max_attendees=?
       WHERE id=? AND host_id=?`,
      [title, description, category, location, start_datetime, end_datetime || null, max_attendees || null, eventId, req.session.user.id]
    );
    
    res.redirect('/events/my/list');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating event');
  }
});

// Delete event
app.post('/events/:id/delete', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  
  try {
    // Delete registrations first (foreign key constraint)
    await db.query('DELETE FROM registrations WHERE event_id = ?', [eventId]);
    
    // Delete event
    await db.query(
      'DELETE FROM events WHERE id = ? AND host_id = ?',
      [eventId, req.session.user.id]
    );
    
    res.redirect('/events/my/list');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting event');
  }
});

// ============================================
// ROUTES - HOST DASHBOARD
// ============================================

app.get('/host/dashboard', isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  
  try {
    const [events] = await db.query(`
      SELECT e.id, e.title, e.start_datetime, e.location,
        COUNT(r.id) AS registrations
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE e.host_id = ?
      GROUP BY e.id, e.title, e.start_datetime, e.location
      ORDER BY e.start_datetime DESC
    `, [userId]);
    
    res.render('host/dashboard', { 
      events,
      title: 'Host Dashboard'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading dashboard');
  }
});

// View participants for an event
app.get('/host/events/:id/participants', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  
  try {
    // Verify ownership
    const [events] = await db.query(
      'SELECT * FROM events WHERE id = ? AND host_id = ?',
      [eventId, req.session.user.id]
    );
    
    if (!events.length) {
      return res.status(403).send('Not your event');
    }
    
    const event = events[0];
    
    // Get participants
    const [participants] = await db.query(`
      SELECT u.name, u.email, r.registered_at
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      WHERE r.event_id = ?
      ORDER BY r.registered_at DESC
    `, [eventId]);
    
    res.render('host/participants', { 
      event,
      participants,
      title: 'Event Participants'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading participants');
  }
});

// ============================================
// ROUTES - ADMIN
// ============================================

app.get('/admin/events', isAdmin, async (req, res) => {
  try {
    const [events] = await db.query(`
      SELECT e.*, u.name AS host_name,
        (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS attendee_count
      FROM events e
      JOIN users u ON e.host_id = u.id
      ORDER BY e.created_at DESC
    `);
    
    res.render('admin/events', { 
      events,
      title: 'Admin - All Events'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading events');
  }
});

app.post('/admin/events/:id/delete', isAdmin, async (req, res) => {
  const eventId = req.params.id;
  
  try {
    // Delete registrations first
    await db.query('DELETE FROM registrations WHERE event_id = ?', [eventId]);
    
    // Delete event
    await db.query('DELETE FROM events WHERE id = ?', [eventId]);
    
    res.redirect('/admin/events');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting event');
  }
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
