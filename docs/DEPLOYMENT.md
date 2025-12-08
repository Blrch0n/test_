# Deployment Guide - Event Portal

## Remote Server Deployment to 203.91.116.122

### Server Information

- **Server IP**: 203.91.116.122
- **SSH Port**: 6122
- **MySQL Port**: 22136
- **Web Port Mapping**:
  - student01 → Internal: 3001, External: 23001
  - student02 → Internal: 3002, External: 23002
  - studentXX → Internal: 300X, External: 230XX

---

## Step 1: Prepare Local Repository

### 1.1 Initialize Git Repository

```bash
cd /home/bolro/Downloads/ulsbold
git init
git add .
git commit -m "Initial commit - Event Portal MVP"
```

### 1.2 Create GitLab Repository

1. Go to https://gitlab.com
2. Click "New project"
3. Name: `event-portal`
4. Visibility: Private (or Public)
5. Click "Create project"

### 1.3 Push to GitLab

```bash
git remote add origin https://gitlab.com/<your-username>/event-portal.git
git branch -M master
git push -u origin master
```

**Note**: Replace `<your-username>` with your actual GitLab username.

---

## Step 2: SSH into Remote Server

### 2.1 Connect via SSH

```bash
# Replace XX with your assigned student number (01-20)
ssh studentXX@203.91.116.122 -p 6122
```

**Example**:

```bash
ssh student01@203.91.116.122 -p 6122
```

### 2.2 Accept Host Key

First time connecting, you'll see:

```
The authenticity of host '[203.91.116.122]:6122' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

Type: **yes**

### 2.3 Enter Password

Enter the password provided by your instructor.

---

## Step 3: Clone Repository on Server

### 3.1 Clone from GitLab

```bash
# Once logged into the server
cd ~
git clone https://gitlab.com/<your-username>/event-portal.git
cd event-portal
```

### 3.2 Install Dependencies

```bash
npm install
```

**Expected output**:

```
added XX packages, and audited XX packages in Xs
found 0 vulnerabilities
```

---

## Step 4: Configure Environment

### 4.1 Create .env File

```bash
nano .env
```

### 4.2 Add Environment Variables

```env
DB_HOST=203.91.116.122
DB_PORT=22136
DB_USER=teams
DB_PASSWORD=YOUR_ACTUAL_PASSWORD
DB_NAME=team6_event_portal

# Set your assigned port (e.g., 3001 for student01)
PORT=300X

SESSION_SECRET=event-portal-production-secret-change-this
```

### 4.3 Save and Exit

- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

### 4.4 Verify .env File

```bash
cat .env
```

---

## Step 5: Test Application Locally on Server

### 5.1 Run Application

```bash
# For student01 (port 3001):
PORT=3001 node app.js

# For student02 (port 3002):
PORT=3002 node app.js

# General pattern:
PORT=300X node app.js
```

### 5.2 Verify Server Started

You should see:

```
Server running on http://localhost:300X
```

### 5.3 Test Locally with curl

Open another SSH session and run:

```bash
curl http://localhost:300X
```

You should see HTML output (the home page).

### 5.4 Stop the Server

Press `Ctrl + C` to stop the application.

---

## Step 6: Access via Public URL

### 6.1 Restart Application

```bash
PORT=300X node app.js &
```

The `&` runs it in background.

### 6.2 Access from Your Browser

Open your web browser and navigate to:

```
http://203.91.116.122:230XX
```

**Examples**:

- student01: http://203.91.116.122:23001
- student02: http://203.91.116.122:23002
- student20: http://203.91.116.122:23020

### 6.3 Verify All Features Work

- [ ] Home page loads
- [ ] Can register
- [ ] Can login
- [ ] Can create events
- [ ] Can browse events
- [ ] Database operations work

---

## Step 7: Setup PM2 for Production

PM2 keeps your application running even after you disconnect from SSH.

### 7.1 Install PM2

```bash
npm install -g pm2
```

### 7.2 Start Application with PM2

```bash
# For student01:
PORT=3001 pm2 start app.js --name event-portal-student01

# For student02:
PORT=3002 pm2 start app.js --name event-portal-student02

# General pattern:
PORT=300X pm2 start app.js --name event-portal-studentXX
```

### 7.3 Verify PM2 Status

```bash
pm2 status
```

**Expected output**:

```
┌─────┬────────────────────────┬─────────┬─────────┬──────────┐
│ id  │ name                   │ status  │ restart │ uptime   │
├─────┼────────────────────────┼─────────┼─────────┼──────────┤
│ 0   │ event-portal-student01 │ online  │ 0       │ 5s       │
└─────┴────────────────────────┴─────────┴─────────┴──────────┘
```

### 7.4 Save PM2 Configuration

```bash
pm2 save
```

### 7.5 Setup Auto-Start on Reboot

```bash
pm2 startup
```

Follow the instructions provided (may need to run a command with sudo).

---

## Step 8: PM2 Management Commands

### View Logs

```bash
# Real-time logs
pm2 logs event-portal-studentXX

# Last 100 lines
pm2 logs event-portal-studentXX --lines 100
```

### Restart Application

```bash
pm2 restart event-portal-studentXX
```

### Stop Application

```bash
pm2 stop event-portal-studentXX
```

### Delete from PM2

```bash
pm2 delete event-portal-studentXX
```

### Monitor Resources

```bash
pm2 monit
```

### Show Detailed Info

```bash
pm2 show event-portal-studentXX
```

---

## Step 9: Update Deployed Application

### 9.1 Make Changes Locally

Edit files on your local machine and test.

### 9.2 Commit and Push

```bash
git add .
git commit -m "Update: describe your changes"
git push origin master
```

### 9.3 Pull on Server

```bash
# SSH into server
ssh studentXX@203.91.116.122 -p 6122

# Navigate to project
cd ~/event-portal

# Pull latest changes
git pull origin master

# Install any new dependencies
npm install

# Restart with PM2
pm2 restart event-portal-studentXX
```

---

## Step 10: Troubleshooting

### Issue: Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::300X`

**Solution**:

```bash
# Find process using the port
lsof -i :300X

# Kill the process
kill -9 <PID>

# Or use PM2
pm2 delete event-portal-studentXX
pm2 start app.js --name event-portal-studentXX
```

### Issue: Cannot Connect to Database

**Error**: `Error: connect ECONNREFUSED`

**Solution**:

1. Check `.env` file has correct credentials
2. Verify database exists in HeidiSQL
3. Test connection:

```bash
mysql -h 203.91.116.122 -P 22136 -u teams -p team6_event_portal
```

### Issue: Application Crashes

**Check PM2 logs**:

```bash
pm2 logs event-portal-studentXX --err
```

**Common causes**:

- Missing dependencies (run `npm install`)
- Syntax errors (check error log)
- Database connection issues (verify .env)
- Port conflicts (change PORT in .env)

### Issue: Changes Not Reflecting

**Solution**:

```bash
# Clear PM2 logs
pm2 flush

# Hard restart
pm2 delete event-portal-studentXX
PORT=300X pm2 start app.js --name event-portal-studentXX

# Clear browser cache (Ctrl+Shift+R)
```

### Issue: Permission Denied

**Solution**:

```bash
# Check file permissions
ls -la

# Fix if needed
chmod 755 app.js
```

---

## Step 11: Production Checklist

Before going live, verify:

- [ ] `.env` file configured correctly
- [ ] Database tables created and populated
- [ ] Application starts without errors
- [ ] Can access via public URL
- [ ] All features working (login, events, registration)
- [ ] PM2 process running and saved
- [ ] Logs show no critical errors
- [ ] Tested on multiple browsers
- [ ] Error handling works (wrong password, etc.)
- [ ] Admin account created and tested

---

## Step 12: Security Best Practices

### 12.1 Secure .env File

```bash
# Ensure .env is not readable by others
chmod 600 .env
```

### 12.2 Change Session Secret

Update `.env`:

```env
SESSION_SECRET=use-a-very-long-random-string-here-change-from-default
```

### 12.3 Regular Updates

```bash
# Update dependencies regularly
npm update

# Check for vulnerabilities
npm audit
npm audit fix
```

---

## Step 13: Monitoring and Maintenance

### Daily Checks

```bash
# Check PM2 status
pm2 status

# Check logs for errors
pm2 logs --lines 50 --err
```

### Weekly Maintenance

```bash
# Update code
git pull origin master
npm install
pm2 restart event-portal-studentXX

# Check disk space
df -h

# Check memory
free -m
```

### Backup Database

```bash
# Export database
mysqldump -h 203.91.116.122 -P 22136 -u teams -p team6_event_portal > backup_$(date +%Y%m%d).sql

# Import backup (if needed)
mysql -h 203.91.116.122 -P 22136 -u teams -p team6_event_portal < backup_YYYYMMDD.sql
```

---

## Quick Reference

### Student Port Mapping

| Student   | Internal Port | External Port | URL                         |
| --------- | ------------- | ------------- | --------------------------- |
| student01 | 3001          | 23001         | http://203.91.116.122:23001 |
| student02 | 3002          | 23002         | http://203.91.116.122:23002 |
| student03 | 3003          | 23003         | http://203.91.116.122:23003 |
| ...       | ...           | ...           | ...                         |
| student20 | 3020          | 23020         | http://203.91.116.122:23020 |

### Essential Commands

```bash
# SSH Connect
ssh studentXX@203.91.116.122 -p 6122

# Start App
PORT=300X pm2 start app.js --name event-portal-studentXX

# Restart App
pm2 restart event-portal-studentXX

# View Logs
pm2 logs event-portal-studentXX

# Check Status
pm2 status

# Update Code
cd ~/event-portal && git pull && npm install && pm2 restart event-portal-studentXX
```

---

## Support

If you encounter issues:

1. Check PM2 logs: `pm2 logs`
2. Check application is running: `pm2 status`
3. Test locally on server: `curl http://localhost:300X`
4. Verify database connection: Visit `/db-test`
5. Contact team members:
   - PM: Ulsbold
   - Backend: Amarjargal
   - Frontend: Khosbayar

---

**Deployment Completed Successfully!** ✅

Your Event Portal should now be live at:

```
http://203.91.116.122:230XX
```
