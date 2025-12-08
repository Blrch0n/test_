# 🚀 NEXT STEPS - What You Need to Do Now

## ✅ What's Already Done

- ✅ Complete Node.js/Express application built
- ✅ All views (EJS templates) created with styling
- ✅ User authentication system (register, login, logout)
- ✅ Event CRUD operations (create, read, update, delete)
- ✅ Event browsing with filtering
- ✅ Event registration system
- ✅ Host dashboard with statistics
- ✅ Admin panel
- ✅ Database schema (SQL file ready)
- ✅ Complete documentation (README, deployment guide, testing checklist)
- ✅ Git repository initialized
- ✅ .gitignore configured
- ✅ Environment template (.env.example)

## 🎯 What You Need to Do (In Order)

### STEP 1: Setup Database (15 minutes)

**Owner**: Amarjargal (Backend)

1. **Open HeidiSQL**

   - Download from: https://www.heidisql.com/download.php
   - Install if not already installed

2. **Create Connection**

   - Click "New" in HeidiSQL
   - Session name: `Event Portal DB`
   - Network Type: `MySQL (TCP/IP)`
   - Hostname/IP: `203.91.116.122`
   - User: `teams`
   - Password: (Get from instructor)
   - Port: `22136`
   - Click "Open"

3. **Create Database**

   - Right-click server → "Create new" → "Database"
   - Name: `team6_event_portal`
   - Charset: `utf8mb4`
   - Collation: `utf8mb4_unicode_ci`
   - Click OK

4. **Run SQL Setup**

   - Select `team6_event_portal` database
   - Click "File" → "Load SQL file"
   - Navigate to: `database/setup.sql`
   - Click "Execute" (or press F9)
   - Verify: You should see 3 tables (users, events, registrations)

5. **Verify Tables**
   ```sql
   SHOW TABLES;
   SELECT * FROM users;
   SELECT * FROM events;
   SELECT * FROM registrations;
   ```

✅ **Done when**: You see 3 tables and sample data in HeidiSQL

---

### STEP 2: Configure Environment (5 minutes)

**Owner**: Ulsbold (PM)

1. **Copy environment template**

   ```bash
   cd /home/bolro/Downloads/ulsbold
   cp .env.example .env
   ```

2. **Edit .env file**

   ```bash
   nano .env
   # or open in VS Code
   ```

3. **Update password**
   Replace `YOUR_PASSWORD_HERE` with the actual database password:

   ```env
   DB_HOST=203.91.116.122
   DB_PORT=22136
   DB_USER=teams
   DB_PASSWORD=the-real-password-from-instructor
   DB_NAME=team6_event_portal
   PORT=3000
   ```

4. **Save and close**

✅ **Done when**: `.env` file has real password

---

### STEP 3: Test Locally (10 minutes)

**Owner**: All team members

1. **Install dependencies** (if not done)

   ```bash
   npm install
   ```

2. **Start application**

   ```bash
   npm run dev
   ```

3. **Test database connection**

   - Open browser: http://localhost:3000/db-test
   - Should see: `{"success": true, "data": [{"result": 1}]}`

4. **Test registration**

   - Go to: http://localhost:3000/register
   - Create account:
     - Name: Your Name
     - Email: yourname@test.com
     - Password: password123
     - Role: Host
   - Click Register

5. **Test login**

   - Login with credentials you just created
   - Should redirect to dashboard

6. **Test event creation**

   - Click "Create Event"
   - Fill in all fields
   - Submit
   - Verify event appears in "My Events"

7. **Test event browsing**

   - Go to "Browse Events"
   - Try filters (date, category, host)
   - Click on event to see details

8. **Test registration**
   - Register for an event
   - Verify count increases
   - Unregister
   - Verify count decreases

✅ **Done when**: All features work locally

---

### STEP 4: Create GitLab Repository (10 minutes)

**Owner**: Ulsbold (PM)

1. **Go to GitLab**

   - Navigate to: https://gitlab.com
   - Sign in (or create account)

2. **Create New Project**

   - Click "New project"
   - Click "Create blank project"
   - Project name: `event-portal`
   - Project slug: `event-portal`
   - Visibility: `Private` (recommended) or `Public`
   - Initialize repository: **Uncheck** (we already have code)
   - Click "Create project"

3. **Copy repository URL**

   - You'll see something like:
   - `https://gitlab.com/your-username/event-portal.git`

4. **Add remote and push**

   ```bash
   cd /home/bolro/Downloads/ulsbold
   git remote add origin https://gitlab.com/your-username/event-portal.git
   git branch -M master
   git push -u origin master
   ```

5. **Verify on GitLab**
   - Refresh GitLab page
   - You should see all your files

✅ **Done when**: Code is visible on GitLab

---

### STEP 5: Deploy to Remote Server (30 minutes)

**Owner**: Amarjargal (Backend) + Ulsbold (PM)

**Follow the detailed guide**: `docs/DEPLOYMENT.md`

**Quick Summary**:

1. **Determine your student number**

   - Get from instructor (student01 to student20)
   - This determines your port:
     - student01 → Internal: 3001, External: 23001
     - student02 → Internal: 3002, External: 23002
     - etc.

2. **SSH into server**

   ```bash
   ssh studentXX@203.91.116.122 -p 6122
   # Enter password when prompted
   ```

3. **Clone repository**

   ```bash
   cd ~
   git clone https://gitlab.com/your-username/event-portal.git
   cd event-portal
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Create .env file**

   ```bash
   nano .env
   ```

   Add same content as local `.env` but change PORT:

   ```env
   PORT=300X  # Replace X with your student number
   ```

6. **Test locally on server**

   ```bash
   PORT=300X node app.js
   ```

   Should see: "Server running on http://localhost:300X"

7. **Test with curl**
   Open another terminal, SSH again, then:

   ```bash
   curl http://localhost:300X
   ```

   Should see HTML.

8. **Setup PM2**

   ```bash
   npm install -g pm2
   PORT=300X pm2 start app.js --name event-portal
   pm2 save
   pm2 startup  # Follow instructions
   ```

9. **Access from browser**
   - Open: http://203.91.116.122:230XX
   - Should see your Event Portal!

✅ **Done when**: App is accessible from public URL

---

### STEP 6: Complete Testing (30 minutes)

**Owner**: All team members

**Use**: `docs/TESTING_CHECKLIST.md`

1. **Print or open the checklist**

   - Located at: `docs/TESTING_CHECKLIST.md`

2. **Go through each test**

   - 29+ test cases covering all features
   - Check off each one as you complete it
   - Take screenshots for documentation

3. **Record results**

   - Mark Pass/Fail for each test
   - Note any issues found
   - Fix critical bugs immediately

4. **Test on deployed server**
   - Repeat key tests on the public URL
   - Verify everything works in production

✅ **Done when**: All tests passing, checklist complete

---

### STEP 7: Create User Guide with Screenshots (1 hour)

**Owner**: Khosbayar (Frontend) + Ulsbold (PM)

**Create**: `docs/USER_GUIDE.md`

**Include**:

1. **Introduction** (1 paragraph)
2. **Getting Started**

   - How to access the site
   - Creating an account (with screenshot)
   - Logging in (with screenshot)

3. **For Students**

   - Browsing events (with screenshot)
   - Using filters (with screenshot)
   - Registering for an event (with screenshot)
   - Viewing registered events

4. **For Event Hosts**

   - Creating an event (with screenshot)
   - Editing an event
   - Deleting an event
   - Viewing your events (with screenshot)
   - Checking participants (with screenshot)
   - Exporting participant list

5. **For Administrators**
   - Accessing admin panel (with screenshot)
   - Viewing all events
   - Deleting events

**Screenshots needed**: 8-10 clear screenshots

**Tool**: Use Snipping Tool (Windows) or Screenshot tool (Linux/Mac)

✅ **Done when**: USER_GUIDE.md created with all screenshots

---

### STEP 8: Update Planning Report (1 hour)

**Owner**: Ulsbold (PM)

**Update your planning document with**:

1. **Final Architecture**

   - Confirm tech stack used
   - Update database schema
   - Add deployment architecture diagram

2. **Requirements Mapping**

   - Link each requirement to implementation
   - Confirm all MUST/SHOULD/COULD completed

3. **Risk Reflection**

   - For each risk identified:
     - Did it occur? (Yes/No)
     - Impact if it occurred
     - How you handled it
     - Lessons learned

4. **Team Contributions**

   - What each member did
   - Time spent on each task
   - Challenges faced

5. **Final Statistics**
   - Lines of code
   - Number of features
   - Test coverage
   - Deployment details

✅ **Done when**: Planning report fully updated

---

### STEP 9: Prepare Presentation (2 hours)

**Owner**: All team members

**Create slides covering**:

1. **Title Slide**

   - Project name
   - Team members & roles
   - Date

2. **Problem Statement**

   - Why we built this
   - Who it's for

3. **Solution Overview**

   - What Event Portal does
   - Key features

4. **Technical Architecture**

   - Tech stack diagram
   - Database schema
   - System flow

5. **Demo** (Live or Video)

   - Show actual working site
   - Walk through key features:
     - Register/Login
     - Browse events
     - Create event
     - Host dashboard
     - Admin panel

6. **Challenges & Solutions**

   - Technical challenges faced
   - How you solved them

7. **Testing & Quality**

   - Testing approach
   - Results

8. **Deployment**

   - How it's deployed
   - Live URL

9. **Future Enhancements**

   - What's next
   - Phase 2 features

10. **Conclusion**
    - Summary
    - Lessons learned
    - Q&A

**Practice**: Run through presentation 2-3 times

✅ **Done when**: Presentation ready, team practiced

---

### STEP 10: Final Submission (30 minutes)

**Owner**: Ulsbold (PM)

**Prepare submission package**:

1. **Code**

   - GitLab repository URL
   - Latest commit hash
   - Ensure README is up-to-date

2. **Documentation**

   - ✅ README.md
   - ✅ QUICKSTART.md
   - ✅ PROJECT_SUMMARY.md
   - ✅ docs/DEPLOYMENT.md
   - ✅ docs/TESTING_CHECKLIST.md (filled out)
   - ✅ docs/USER_GUIDE.md (with screenshots)
   - ✅ Planning report (updated)

3. **Deployment**

   - Live URL
   - Admin credentials (for instructor)
   - Database access info

4. **Presentation**

   - Slides (PDF + PowerPoint)
   - Demo video (optional)

5. **Submission Checklist**
   - [ ] Code on GitLab
   - [ ] All documentation complete
   - [ ] Live deployment working
   - [ ] Testing checklist filled
   - [ ] User guide with screenshots
   - [ ] Planning report updated
   - [ ] Presentation ready
   - [ ] Team contributions documented

✅ **Done when**: All materials submitted

---

## 📅 Suggested Timeline

| Day       | Tasks                                      | Owner                |
| --------- | ------------------------------------------ | -------------------- |
| **Day 1** | Steps 1-3: DB setup, config, local testing | Amarjargal + All     |
| **Day 2** | Steps 4-5: GitLab + Deployment             | Ulsbold + Amarjargal |
| **Day 3** | Step 6: Complete testing checklist         | All                  |
| **Day 4** | Step 7: User guide with screenshots        | Khosbayar + Ulsbold  |
| **Day 5** | Step 8: Update planning report             | Ulsbold              |
| **Day 6** | Step 9: Prepare presentation               | All                  |
| **Day 7** | Step 10: Final review & submission         | Ulsbold              |

---

## 🆘 If You Get Stuck

### Common Issues

**1. Database connection fails**

- ✅ Check `.env` has correct password
- ✅ Verify database exists in HeidiSQL
- ✅ Test with `/db-test` route

**2. Can't access deployed site**

- ✅ Check PM2 is running: `pm2 status`
- ✅ Check logs: `pm2 logs`
- ✅ Verify port is correct (300X)
- ✅ Test locally first: `curl http://localhost:300X`

**3. Features not working**

- ✅ Check browser console (F12)
- ✅ Check server logs: `pm2 logs`
- ✅ Verify all migrations ran
- ✅ Test database queries in HeidiSQL

**4. Git issues**

- ✅ Check remote: `git remote -v`
- ✅ Pull before push: `git pull`
- ✅ Resolve conflicts if any

### Getting Help

1. Check documentation first (README, DEPLOYMENT, etc.)
2. Search error message online
3. Ask in team chat
4. Contact instructor if stuck >30 minutes

---

## ✨ Final Checklist

Before you say "We're done!":

- [ ] App runs locally without errors
- [ ] Database has sample data
- [ ] All features tested and working
- [ ] Code pushed to GitLab
- [ ] Deployed to remote server
- [ ] Accessible via public URL (http://203.91.116.122:230XX)
- [ ] Testing checklist completed
- [ ] User guide created with screenshots
- [ ] Planning report updated
- [ ] Presentation prepared
- [ ] Team ready to present
- [ ] Submission package ready

---

## 🎉 Success Criteria

**You're successful when**:

✅ Live URL works: http://203.91.116.122:230XX  
✅ Can register, login, create events, browse, register for events  
✅ Host dashboard shows statistics  
✅ Admin panel accessible  
✅ All documentation complete  
✅ Testing checklist shows >90% pass rate  
✅ Presentation ready  
✅ Team confident to demo

---

## 📞 Team Contacts

**Daily Standup**: (Set a time - e.g., 9 AM daily)

**Communication**:

- Team chat: (Create Messenger/Discord group)
- Code reviews: GitLab comments
- Issues: GitLab Issues
- Meetings: (Set schedule)

**Responsibilities Reminder**:

- **Ulsbold (PM)**: Coordination, documentation, testing, presentation
- **Amarjargal (Backend)**: Database, server-side, deployment
- **Khosbayar (Frontend)**: UI/UX, screenshots, user guide

**All**: Test everything, help each other!

---

## 🚀 Let's Go!

**Start with STEP 1 right now!**

1. Open HeidiSQL
2. Connect to database
3. Run setup.sql
4. Move to STEP 2

**You've got this!** The hardest part (coding) is done. Now just follow the steps! 💪

---

_Created: December 8, 2025_  
_Project: Event Portal_  
_Team 6_
