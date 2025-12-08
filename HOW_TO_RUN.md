# 🚀 How to Run Event Portal - Quick Guide

## Prerequisites Check

Before starting, make sure you have:

- ✅ Node.js installed (check: `node --version`)
- ✅ npm installed (check: `npm --version`)
- ✅ Database password from your instructor

---

## Step 1: Setup Environment (2 minutes)

### Create .env file

```bash
# Copy the example file
cp .env.example .env
```

### Edit .env with your database password

Open `.env` in a text editor and update:

```env
DB_HOST=203.91.116.122
DB_PORT=22136
DB_USER=teams
DB_PASSWORD=PUT_REAL_PASSWORD_HERE  # ← CHANGE THIS!
DB_NAME=team6_event_portal
PORT=3000
SESSION_SECRET=event-portal-secret-key-change-in-production
```

**Important:** Replace `PUT_REAL_PASSWORD_HERE` with the actual password from your instructor.

---

## Step 2: Install Dependencies (1 minute)

```bash
# Make sure you're in the project directory
cd /home/bolro/Downloads/ulsbold

# Install all required packages
npm install
```

**Expected output:** "added 93 packages" message

---

## Step 3: Setup Database (5 minutes)

### Option A: Using HeidiSQL (Recommended)

1. **Download & Install HeidiSQL** (if not installed)

   - Download from: https://www.heidisql.com/download.php
   - Install and open

2. **Create New Session**

   - Click "New" button
   - Session name: `Event Portal DB`
   - Network type: `MySQL (TCP/IP)`
   - Hostname/IP: `203.91.116.122`
   - User: `teams`
   - Password: (from instructor)
   - Port: `22136`
   - Click "Open"

3. **Create Database**

   - Right-click on the server → "Create new" → "Database"
   - Name: `team6_event_portal`
   - Charset: `utf8mb4`
   - Collation: `utf8mb4_unicode_ci`
   - Click OK

4. **Run Setup Script**

   - Select `team6_event_portal` database (click on it)
   - Click "File" → "Load SQL file..."
   - Navigate to: `/home/bolro/Downloads/ulsbold/database/setup.sql`
   - Click "Execute" (or press F9)

5. **Verify Tables Created**
   - You should see 3 tables: `users`, `events`, `registrations`
   - Sample data should be loaded

### Option B: Using Command Line

```bash
# Login to MySQL
mysql -h 203.91.116.122 -P 22136 -u teams -p

# Enter password when prompted
# Then run:
CREATE DATABASE team6_event_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# Import the schema
mysql -h 203.91.116.122 -P 22136 -u teams -p team6_event_portal < database/setup.sql
```

---

## Step 4: Run the Application

### Start in Development Mode (with auto-reload)

```bash
npm run dev
```

**You should see:**

```
Server running on http://localhost:3000
```

### Start in Production Mode

```bash
npm start
```

---

## Step 5: Test the Application

### 5.1 Test Database Connection

Open your browser and go to:

```
http://localhost:3000/db-test
```

**Expected response:**

```json
{ "success": true, "data": [{ "result": 1 }] }
```

✅ **If you see this, database is connected!**

❌ **If you see an error:**

- Check your `.env` file has the correct password
- Verify database exists in HeidiSQL
- Make sure you ran the setup.sql script

### 5.2 Open the Application

Open your browser and go to:

```
http://localhost:3000
```

You should see the Event Portal home page!

---

## Step 6: Create Your First Account

1. **Click "Register"**
2. **Fill in the form:**
   - Name: Your Name
   - Email: yourname@test.com
   - Password: password123
   - Role: Choose "Event Host"
3. **Click "Register"**
4. **You'll be redirected to login page**
5. **Login with your credentials**

✅ **Success!** You should now see the Dashboard.

---

## Step 7: Create Your First Event

1. **Click "Create Event"** in the navigation
2. **Fill in the form:**
   - Title: "Test Workshop"
   - Description: "Testing the event portal"
   - Category: Choose "Workshop"
   - Location: "Room 101"
   - Start Date & Time: Choose tomorrow at 2:00 PM
   - End Date & Time: Choose tomorrow at 5:00 PM
   - Max Attendees: 30 (optional)
3. **Click "Create Event"**

✅ **Your event is now created!**

---

## Step 8: Test All Features

### Browse Events

- Go to "Browse Events"
- You should see your test event
- Try the filters (date, category, host)

### Register for an Event

- Click on any event
- Click "Register for Event"
- Count should increase

### Host Dashboard

- Click "Host Panel" in navigation
- You should see your events and registration counts
- Click "View Participants" to see who registered

### Admin Panel (if you set admin role)

- First, set your user as admin in HeidiSQL:
  ```sql
  UPDATE users SET role='admin' WHERE email='yourname@test.com';
  ```
- Logout and login again
- Click "Admin" in navigation
- You can now see and delete all events

---

## Common Issues & Solutions

### ❌ Issue: "Cannot connect to database"

**Solution:**

1. Check `.env` file has correct password
2. Test database connection:
   ```bash
   mysql -h 203.91.116.122 -P 22136 -u teams -p team6_event_portal
   ```
3. Verify database exists in HeidiSQL
4. Make sure you ran `database/setup.sql`

### ❌ Issue: "Port 3000 already in use"

**Solution:**

```bash
# Option 1: Kill the process using port 3000
lsof -i :3000
kill -9 <PID>

# Option 2: Use a different port
# Edit .env and change PORT=3000 to PORT=3001
```

### ❌ Issue: "Module not found"

**Solution:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### ❌ Issue: Tables don't exist

**Solution:**

- Re-run the setup.sql in HeidiSQL
- Or use command line:
  ```bash
  mysql -h 203.91.116.122 -P 22136 -u teams -p team6_event_portal < database/setup.sql
  ```

### ❌ Issue: Login doesn't work

**Solution:**

1. Check if user exists in database:
   ```sql
   SELECT * FROM users WHERE email='yourname@test.com';
   ```
2. If password is wrong, create new account
3. Clear browser cookies and try again

---

## Development Workflow

### Making Changes

1. **Edit files** (use VS Code or any editor)
2. **If using `npm run dev`**: Changes auto-reload
3. **If using `npm start`**: Press Ctrl+C, then `npm start` again
4. **Test in browser**

### View Logs

The terminal where you ran `npm run dev` or `npm start` shows:

- All HTTP requests
- Database queries
- Errors and console.log output

### Stop the Server

Press **Ctrl + C** in the terminal

---

## File Structure Overview

```
event-portal/
├── app.js              ← Backend: All routes and logic HERE
├── db.js               ← Database connection configuration
├── package.json        ← Dependencies list
├── .env               ← YOUR database credentials (create this!)
│
├── views/              ← Frontend: All HTML/CSS HERE
│   ├── index.ejs       ← Home page
│   ├── login.ejs       ← Login page
│   ├── register.ejs    ← Registration page
│   ├── dashboard.ejs   ← User dashboard
│   ├── events/         ← Event-related pages
│   ├── host/           ← Host dashboard pages
│   ├── admin/          ← Admin panel
│   └── partials/       ← Reusable components
│
└── database/
    └── setup.sql       ← Database schema
```

### Where to Make Changes

**Backend (Routes, Logic):**

- Edit: `app.js`
- Database config: `db.js`

**Frontend (HTML, CSS, UI):**

- Edit files in: `views/` folder
- Each `.ejs` file is a page

**Database:**

- Schema: `database/setup.sql`
- View/edit data: Use HeidiSQL

---

## Running on Different Ports

### Local Development (Port 3000)

```bash
npm run dev
# Access: http://localhost:3000
```

### Custom Port

```bash
# Edit .env and change PORT=3000 to your port
# Then:
npm start
```

---

## Next Steps After Local Testing

Once everything works locally:

1. ✅ **Test all features** (use `docs/TESTING_CHECKLIST.md`)
2. ✅ **Create GitLab repository** and push code
3. ✅ **Deploy to remote server** (see `docs/DEPLOYMENT.md`)
4. ✅ **Complete documentation** (user guide, screenshots)
5. ✅ **Prepare presentation**

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Run in development (auto-reload)
npm run dev

# Run in production
npm start

# Test database connection
# Visit: http://localhost:3000/db-test

# Check what's running on port 3000
lsof -i :3000

# Stop the server
# Press Ctrl + C in terminal

# View git status
git status

# Commit changes
git add .
git commit -m "Your message"
```

---

## Team Workflow

### Ulsbold (PM)

1. Run the app locally
2. Test all features
3. Document any issues
4. Coordinate with team

### Amarjargal (Backend)

1. Setup database first
2. Test database connection
3. Make sure all routes work
4. Help others with database issues

### Khosbayar (Frontend)

1. Test all pages load correctly
2. Check styling on different browsers
3. Test forms and buttons
4. Take screenshots for documentation

---

## Success Checklist

Before saying "it works":

- [ ] Database connected (test at /db-test)
- [ ] Can register new account
- [ ] Can login
- [ ] Can create event
- [ ] Can browse events
- [ ] Can filter events
- [ ] Can register for events
- [ ] Host dashboard shows stats
- [ ] Can view participants
- [ ] Can export CSV
- [ ] No errors in browser console (F12)
- [ ] No errors in terminal

---

## Getting Help

1. **Check error message** in terminal or browser console
2. **Review this guide** for common issues
3. **Check documentation**: README.md, DEPLOYMENT.md, etc.
4. **Test database** connection first
5. **Ask team members** in your group chat

---

## Summary

**To run the Event Portal:**

```bash
# 1. Create .env file and add database password
cp .env.example .env
# (Edit .env with real password)

# 2. Install dependencies
npm install

# 3. Setup database (use HeidiSQL with setup.sql)

# 4. Run the app
npm run dev

# 5. Open browser
# http://localhost:3000
```

**That's it!** 🎉

---

_Last updated: December 8, 2025_  
_Team 6 - Event Portal_
