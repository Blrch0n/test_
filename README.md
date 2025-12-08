# Campus Event Portal 🎓

A full-featured web application for managing campus events. Students can discover and register for events, hosts can create and manage events, and admins have full oversight.

## 👥 Team

- **PM**: Ulsbold
- **Backend**: Amarjargal
- **Frontend**: Khosbayar

## ✨ Features

### For Students

- 🔍 Browse and search events by date, category, and host
- 📝 Register/unregister for events
- 📊 View event details and attendee counts
- 🎯 Track registered events

### For Hosts

- ➕ Create and manage events
- ✏️ Edit event details
- 👥 View participant lists
- 📈 Track event registrations
- 🗑️ Delete events

### For Admins

- 👀 View all events across the platform
- 🛡️ Moderate and delete any event
- 📊 Full platform oversight

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: bcryptjs, express-session
- **Template Engine**: EJS
- **Styling**: Custom CSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL database (local or remote)
- npm or yarn

## 🚀 Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ulsbold
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=team6_event_portal

   PORT=3001
   SESSION_SECRET=your-super-secret-random-string
   NODE_ENV=development
   ```

4. **Set up the database**

   Run the SQL setup script:

   ```bash
   mysql -u your_user -p < database/setup.sql
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3001`

## 📦 Production Deployment (Vercel)

### ⚠️ Important Limitations

Vercel uses **serverless functions** which have some limitations:

1. **No persistent connections** - Each request creates a new database connection
2. **Stateless sessions** - In-memory sessions won't work across requests
3. **External database required** - You need a remotely accessible MySQL database

### 🔧 Pre-Deployment Checklist

- [x] `vercel.json` configuration file created
- [ ] Database is remotely accessible
- [ ] Environment variables set in Vercel dashboard
- [ ] Session management reviewed (consider using a session store)

### 📝 Deployment Steps

1. **Install Vercel CLI** (optional)

   ```bash
   npm i -g vercel
   ```

2. **Set up environment variables in Vercel**

   Go to your Vercel project settings → Environment Variables and add:

   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `SESSION_SECRET` (generate a strong random string)
   - `NODE_ENV=production`

3. **Deploy**

   ```bash
   vercel --prod
   ```

   Or push to your connected GitHub repository for automatic deployment.

### ⚠️ Known Issues on Vercel

1. **Session Management**: The current in-memory session storage won't persist across serverless function invocations. For production, consider:

   - Using a database-backed session store (e.g., `connect-session-sequelize`)
   - Using Vercel KV or Redis for session storage
   - Implementing JWT-based authentication

2. **Database Connections**: Each serverless function creates new database connections. Ensure your MySQL server can handle multiple connections and has proper timeouts configured.

3. **Cold Starts**: First requests may be slower due to serverless cold starts.

## 🔐 Default Accounts (for testing)

After running the setup script, you'll have these test accounts:

- **Admin**: admin@eventportal.com / password
- **Host**: john@host.com / password
- **Student**: jane@student.com / password

⚠️ **Change these credentials in production!**

## 📁 Project Structure

```
.
├── app.js              # Main application file
├── db.js               # Database connection configuration
├── package.json        # Dependencies and scripts
├── vercel.json         # Vercel deployment configuration
├── database/
│   └── setup.sql       # Database schema and seed data
└── views/
    ├── index.ejs       # Landing page
    ├── login.ejs       # Login page
    ├── register.ejs    # Registration page
    ├── dashboard.ejs   # User dashboard
    ├── admin/
    │   └── events.ejs  # Admin event management
    ├── events/
    │   ├── index.ejs   # Browse events
    │   ├── detail.ejs  # Event details
    │   ├── new.ejs     # Create event
    │   ├── edit.ejs    # Edit event
    │   └── my.ejs      # My events list
    ├── host/
    │   ├── dashboard.ejs     # Host dashboard
    │   └── participants.ejs  # Event participants
    └── partials/
        ├── header-layout.ejs
        ├── header.ejs
        └── footer-layout.ejs
```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (not yet implemented)

## 🐛 Troubleshooting

### Database Connection Issues

- Verify your database credentials in `.env`
- Ensure your MySQL server is running
- Check if the database `team6_event_portal` exists
- Verify firewall rules allow connections to your database

### Session Not Persisting

- For local development, this should work fine
- For Vercel, implement a proper session store (see deployment notes)

### Port Already in Use

- Change the `PORT` in your `.env` file
- Kill the process using the port: `lsof -ti:3001 | xargs kill`

## 📝 TODO/Improvements

- [ ] Implement proper session store for production
- [ ] Add email notifications for event registrations
- [ ] Implement event capacity checking
- [ ] Add image upload for events
- [ ] Create API endpoints for mobile app
- [ ] Add unit and integration tests
- [ ] Implement rate limiting
- [ ] Add event search functionality
- [ ] Create event calendar view
- [ ] Add user profile management

## 📄 License

ISC

## 🤝 Contributing

This is a team project for educational purposes. Contact the team members for contribution guidelines.
