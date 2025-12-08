# Quick Start Guide - Event Portal

## For Team Members: Get Running in 5 Minutes

### Prerequisites

- ✅ Node.js installed (v14+)
- ✅ Access to remote MySQL server
- ✅ Database password from instructor

---

## Step 1: Get the Code (Choose One)

### Option A: From GitLab (After Upload)

```bash
git clone https://gitlab.com/<username>/event-portal.git
cd event-portal
```

### Option B: Already Have the Code

```bash
cd /home/bolro/Downloads/ulsbold
# or wherever the project is located
```

---

## Step 2: Install Dependencies

```bash
npm install
```

**Expected**: "added 93 packages" message

---

## Step 3: Configure Database

### 3.1 Copy Environment Template

```bash
cp .env.example .env
```

### 3.2 Edit .env File

Open `.env` and replace `YOUR_PASSWORD_HERE` with the actual database password:

```env
DB_HOST=203.91.116.122
DB_PORT=22136
DB_USER=teams
DB_PASSWORD=your-actual-password-here
DB_NAME=team6_event_portal
PORT=3000
```

### 3.3 Setup Database Tables

**Option 1: Using HeidiSQL (Recommended)**

1. Open HeidiSQL
2. New Session:
   - Host: `203.91.116.122`
   - User: `teams`
   - Password: (from instructor)
   - Port: `22136`
3. Click "Open"
4. Right-click server → "Create new" → "Database"
   - Name: `team6_event_portal`
   - Charset: `utf8mb4`
5. Select the database
6. Click "File" → "Load SQL file"
7. Open `database/setup.sql`
8. Click "Execute" (F9)

**Option 2: Command Line**

```bash
mysql -h 203.91.116.122 -P 22136 -u teams -p team6_event_portal < database/setup.sql
```

---

## Step 4: Start the Application

### Development Mode (Auto-reload)

```bash
npm run dev
```

### Regular Mode

```bash
npm start
```

**Expected output**:

```
Server running on http://localhost:3000
```

---

## Step 5: Test It Works

### 5.1 Open Browser

Navigate to: **http://localhost:3000**

### 5.2 Test Database Connection

Visit: **http://localhost:3000/db-test**

Should see: `{"success": true, "data": [{"result": 1}]}`

### 5.3 Register Test User

1. Click "Register"
2. Fill in:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
   - Role: Student or Host
3. Click "Register"
4. Login with same credentials

✅ **If you can login and see the dashboard, you're all set!**

---

## Step 6: Create First Event (Optional)

1. Login
2. Click "Create Event"
3. Fill in:
   - Title: "Test Event"
   - Description: "Testing the system"
   - Category: "Workshop"
   - Location: "Room 101"
   - Start Date/Time: Tomorrow at 2pm
4. Click "Create Event"
5. Visit "Browse Events" to see it listed

---

## Common Issues & Fixes

### ❌ "Cannot connect to database"

**Fix**:

- Check `.env` has correct password
- Verify database exists in HeidiSQL
- Ping the server: `ping 203.91.116.122`

### ❌ "Port 3000 already in use"

**Fix**:

```bash
# Change port in .env
PORT=3001

# Or kill the process
lsof -i :3000
kill -9 <PID>
```

### ❌ "Module not found"

**Fix**:

```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Tables don't exist

**Fix**: Run the SQL setup again in HeidiSQL

---

## Development Workflow

### 1. Make Changes

Edit files in your code editor (VS Code recommended)

### 2. Test Locally

- If using `npm run dev`, changes auto-reload
- If using `npm start`, restart with Ctrl+C then `npm start`

### 3. Commit Changes

```bash
git add .
git commit -m "Description of changes"
git push origin master
```

### 4. Deploy to Server (When Ready)

See `docs/DEPLOYMENT.md` for full instructions.

---

## Project Structure Overview

```
event-portal/
├── app.js              ← Main application (all routes here)
├── db.js               ← Database connection
├── package.json        ← Dependencies
├── .env                ← Your config (DO NOT COMMIT)
├── views/              ← EJS templates
│   ├── index.ejs       ← Home page
│   ├── login.ejs       ← Login form
│   ├── register.ejs    ← Registration form
│   ├── dashboard.ejs   ← User dashboard
│   ├── events/         ← Event pages
│   ├── host/           ← Host dashboard
│   └── admin/          ← Admin panel
├── database/
│   └── setup.sql       ← Database schema
└── docs/               ← Documentation
```

---

## Team Roles & Responsibilities

### Ulsbold (PM)

- Coordinate team meetings
- Track progress against milestones
- Update documentation
- Test all features
- Prepare final presentation

### Amarjargal (Backend)

- Work on `app.js` (routes, logic)
- Handle database queries
- Implement authentication
- Fix backend bugs
- Deploy to server

### Khosbayar (Frontend)

- Work on `views/` folder (EJS templates)
- Style with CSS
- Improve UX/UI
- Test across browsers
- Create screenshots for documentation

**All**: Test, document, and support each other!

---

## Next Steps

1. ✅ **Everyone**: Get the app running locally
2. 📝 **PM**: Create GitLab issues for remaining tasks
3. 🎨 **Frontend**: Improve styling and responsiveness
4. 🔧 **Backend**: Add any missing features
5. ✅ **All**: Test with `docs/TESTING_CHECKLIST.md`
6. 🚀 **All**: Deploy to remote server
7. 📸 **All**: Take screenshots for final report
8. 📊 **PM**: Complete documentation

---

## Helpful Commands

```bash
# Install dependencies
npm install

# Run in development (auto-reload)
npm run dev

# Run in production
npm start

# Test database
# Visit: http://localhost:3000/db-test

# View git status
git status

# Create new branch
git checkout -b feature-name

# Push changes
git push origin master
```

---

## Resources

- **Full README**: See `README.md` in project root
- **Deployment Guide**: See `docs/DEPLOYMENT.md`
- **Testing Checklist**: See `docs/TESTING_CHECKLIST.md`
- **Database Schema**: See `database/setup.sql`

---

## Getting Help

**Stuck?** Check in this order:

1. Error message in terminal
2. Browser console (F12)
3. Check PM2 logs (if deployed): `pm2 logs`
4. Review `README.md`
5. Ask in team chat
6. Google the error message

**Common Questions**:

- "How do I...?" → Check `README.md` or `docs/`
- "What does this error mean?" → Copy error to team chat
- "Can I change...?" → Yes! Make changes and test
- "Should I deploy now?" → Test locally first, then ask PM

---

## Success Checklist

Before saying "I'm done":

- [ ] App runs locally without errors
- [ ] Can register and login
- [ ] Can create events
- [ ] Can browse and filter events
- [ ] Can register for events
- [ ] Host dashboard works
- [ ] Database operations work
- [ ] No console errors in browser
- [ ] Code committed to Git
- [ ] Tested on deployed server (when ready)

---

**Happy Coding! 🚀**

Any issues? Contact your team members or check the documentation.

---

_Last updated: December 8, 2025_
