# Event Portal

A comprehensive campus event management system built with Node.js, Express, EJS, and MySQL.

## Team Members
- **PM**: Ulsbold
- **Backend**: Amarjargal
- **Frontend**: Khosbayar

## Features

### Core Functionality (MUST Requirements)
- ✅ **User Authentication**: Register, login, logout with secure password hashing
- ✅ **Event Creation**: Hosts can create, edit, and delete events
- ✅ **Event Browsing**: Filter events by date, category, and host
- ✅ **Event Registration**: Students can register/unregister for events
- ✅ **Host Dashboard**: View event statistics and participant lists

### Additional Features (SHOULD/COULD)
- ✅ **Admin Panel**: Manage all events across the platform
- ✅ **Real-time Attendance**: Automatic registration counting
- ✅ **Event Categories**: Academic, Social, Sports, Club, Workshop, Other
- ✅ **Capacity Management**: Optional max attendee limits
- ✅ **Export Participants**: Download participant lists as CSV

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, CSS3
- **Database**: MySQL (remote server)
- **Authentication**: bcryptjs, express-session
- **Environment**: dotenv

## Database Structure

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student','host','admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Events Table
```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  location VARCHAR(100),
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME,
  host_id INT NOT NULL,
  max_attendees INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES users(id)
);
```

### Registrations Table
```sql
CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_registration (user_id, event_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);
```

## Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Access to remote MySQL server

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://gitlab.com/<your-username>/event-portal.git
   cd event-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your database credentials:
   ```
   DB_HOST=203.91.116.122
   DB_PORT=22136
   DB_USER=teams
   DB_PASSWORD=YOUR_ACTUAL_PASSWORD
   DB_NAME=team6_event_portal
   PORT=3000
   ```

4. **Setup database**
   - Connect to MySQL using HeidiSQL or command line
   - Run the SQL scripts to create tables (see Database Structure above)

5. **Run the application**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Open browser: http://localhost:3000
   - Register a new account
   - Create events or browse existing ones

## Testing Database Connection

Visit http://localhost:3000/db-test to verify database connectivity. You should see:
```json
{"success": true, "data": [{"result": 1}]}
```

## Deployment (Remote Server)

### Deploy to 203.91.116.122

1. **SSH into server**
   ```bash
   ssh studentXX@203.91.116.122 -p 6122
   ```

2. **Clone repository**
   ```bash
   git clone https://gitlab.com/<your-username>/event-portal.git
   cd event-portal
   npm install
   ```

3. **Create .env file**
   ```bash
   nano .env
   # Add your environment variables
   ```

4. **Run with assigned port**
   ```bash
   # For student01: PORT=3001
   # For student02: PORT=3002, etc.
   PORT=300X node app.js
   ```

5. **Access via public URL**
   - student01: http://203.91.116.122:23001
   - student02: http://203.91.116.122:23002
   - studentXX: http://203.91.116.122:230XX

### Using PM2 (Production)

```bash
# Install PM2
npm install -g pm2

# Start application
PORT=300X pm2 start app.js --name event-portal

# Save PM2 configuration
pm2 save

# Setup auto-restart on reboot
pm2 startup

# Monitor application
pm2 logs event-portal
pm2 status
```

## Project Structure

```
event-portal/
├── app.js                  # Main application file
├── db.js                   # Database connection
├── package.json            # Dependencies
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── views/
│   ├── index.ejs          # Home page
│   ├── login.ejs          # Login page
│   ├── register.ejs       # Registration page
│   ├── dashboard.ejs      # User dashboard
│   ├── partials/
│   │   ├── header.ejs     # Navigation header
│   │   ├── header-layout.ejs  # HTML header
│   │   └── footer-layout.ejs  # HTML footer
│   ├── events/
│   │   ├── index.ejs      # Browse events
│   │   ├── detail.ejs     # Event details
│   │   ├── new.ejs        # Create event
│   │   ├── edit.ejs       # Edit event
│   │   └── my.ejs         # My events list
│   ├── host/
│   │   ├── dashboard.ejs  # Host dashboard
│   │   └── participants.ejs  # Participant list
│   └── admin/
│       └── events.ejs     # Admin panel
└── README.md              # This file
```

## User Roles

### Student (Default)
- Browse and filter events
- Register/unregister for events
- View registered events

### Host
- All student permissions
- Create, edit, delete own events
- View participant lists
- Access host dashboard

### Admin
- All host permissions
- Delete any event
- View all events in admin panel

## Setting Admin Role

Connect to MySQL and run:
```sql
UPDATE users SET role='admin' WHERE email='youradmin@example.com';
```

## API Routes

### Public Routes
- `GET /` - Home page
- `GET /events` - Browse events (with filtering)
- `GET /events/:id` - Event details
- `GET /login` - Login form
- `POST /login` - Login submission
- `GET /register` - Registration form
- `POST /register` - Registration submission

### Authenticated Routes
- `GET /dashboard` - User dashboard
- `GET /logout` - Logout
- `POST /events/:id/register` - Register for event
- `POST /events/:id/unregister` - Unregister from event

### Host Routes
- `GET /events/new` - Create event form
- `POST /events` - Create event
- `GET /events/my/list` - List own events
- `GET /events/:id/edit` - Edit event form
- `POST /events/:id/edit` - Update event
- `POST /events/:id/delete` - Delete event
- `GET /host/dashboard` - Host statistics
- `GET /host/events/:id/participants` - View participants

### Admin Routes
- `GET /admin/events` - Admin panel
- `POST /admin/events/:id/delete` - Delete any event

## Testing Checklist

### User Authentication
- [ ] Register with new email → user created in database
- [ ] Login with correct password → redirected to dashboard
- [ ] Login with wrong password → error message shown
- [ ] Logout → session destroyed, redirected to home

### Event Creation
- [ ] Create event → appears in database
- [ ] Edit event → changes saved
- [ ] Delete event → removed from database

### Event Browsing
- [ ] All events displayed on /events
- [ ] Filter by date → correct results
- [ ] Filter by category → correct results
- [ ] Filter by host name → correct results

### Event Registration
- [ ] Register for event → entry in registrations table
- [ ] Unregister → entry removed
- [ ] Cannot register twice → duplicate prevented

### Host Dashboard
- [ ] View all own events with registration counts
- [ ] View participant list for each event
- [ ] Export participants to CSV

### Admin Panel
- [ ] View all events in system
- [ ] Delete any event → removed with registrations

## Security Notes

- Passwords hashed with bcryptjs (10 salt rounds)
- Sessions use secure secret key
- SQL queries use parameterized statements (prevents SQL injection)
- User input validated on both client and server side
- `.env` file excluded from git (sensitive credentials)

## Future Enhancements

- Email notifications for event reminders
- QR code check-in system
- Event feedback and ratings
- Image uploads for events
- Calendar integration (iCal/Google Calendar)
- Search functionality with autocomplete
- Mobile-responsive improvements
- Real-time updates with WebSockets

## Support & Contact

For issues or questions, contact:
- PM: Ulsbold
- Backend Developer: Amarjargal
- Frontend Developer: Khosbayar

## License

ISC License - Copyright 2025 Team 6
