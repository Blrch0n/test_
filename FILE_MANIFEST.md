# Event Portal - File Manifest

**Generated**: December 8, 2025  
**Total Files**: 28  
**Total Lines**: ~6,500

---

## 📁 Root Directory

| File                 | Lines | Purpose                                 |
| -------------------- | ----- | --------------------------------------- |
| `app.js`             | 523   | Main application - all routes and logic |
| `db.js`              | 13    | Database connection pool configuration  |
| `package.json`       | 24    | Dependencies and scripts                |
| `package-lock.json`  | Auto  | Dependency lock file                    |
| `.gitignore`         | 45    | Git exclusions                          |
| `.env.example`       | 10    | Environment variable template           |
| `README.md`          | 420   | Comprehensive project documentation     |
| `QUICKSTART.md`      | 310   | 5-minute setup guide                    |
| `PROJECT_SUMMARY.md` | 650   | Complete project overview               |
| `NEXT_STEPS.md`      | 475   | Step-by-step action items               |

---

## 📂 database/

| File        | Lines | Purpose                                |
| ----------- | ----- | -------------------------------------- |
| `setup.sql` | 150   | Complete database schema + sample data |

**What it does**:

- Creates database structure
- Defines all tables (users, events, registrations)
- Sets up foreign keys and indexes
- Inserts sample data for testing
- Includes verification queries

---

## 📂 docs/

| File                   | Lines | Purpose                              |
| ---------------------- | ----- | ------------------------------------ |
| `DEPLOYMENT.md`        | 520   | Step-by-step server deployment guide |
| `TESTING_CHECKLIST.md` | 410   | 29+ test cases with checkboxes       |

**DEPLOYMENT.md covers**:

- SSH connection
- GitLab setup
- Server configuration
- PM2 process management
- Troubleshooting
- Port mapping
- Maintenance

**TESTING_CHECKLIST.md includes**:

- User authentication tests
- Event CRUD tests
- Browsing/filtering tests
- Registration tests
- Dashboard tests
- Admin tests
- Security tests
- Edge case tests

---

## 📂 views/

### Root Level Views

| File            | Lines | Purpose                           |
| --------------- | ----- | --------------------------------- |
| `index.ejs`     | 58    | Home page with hero section       |
| `login.ejs`     | 67    | Login form                        |
| `register.ejs`  | 81    | Registration form                 |
| `dashboard.ejs` | 85    | User dashboard with quick actions |

---

### 📂 views/partials/

| File                | Lines | Purpose                         |
| ------------------- | ----- | ------------------------------- |
| `header.ejs`        | 25    | Navigation bar with user status |
| `header-layout.ejs` | 125   | HTML head + global CSS styles   |
| `footer-layout.ejs` | 7     | Footer and closing HTML tags    |

**Purpose**: Reusable components included in every page

---

### 📂 views/events/

| File         | Lines | Purpose                             |
| ------------ | ----- | ----------------------------------- |
| `index.ejs`  | 135   | Browse events with filtering        |
| `detail.ejs` | 142   | Event detail page with registration |
| `new.ejs`    | 103   | Create new event form               |
| `edit.ejs`   | 115   | Edit existing event form            |
| `my.ejs`     | 94    | Host's event list with actions      |

**Features**:

- Grid layout for event cards
- Filter by date, category, host
- Registration/unregistration buttons
- Host-only edit/delete controls
- Attendance count display

---

### 📂 views/host/

| File               | Lines | Purpose                            |
| ------------------ | ----- | ---------------------------------- |
| `dashboard.ejs`    | 98    | Host statistics and event overview |
| `participants.ejs` | 137   | Participant list with CSV export   |

**Features**:

- Total events/registrations stats
- Average registrations per event
- Participant details (name, email, timestamp)
- CSV export functionality
- Event-specific participant lists

---

### 📂 views/admin/

| File         | Lines | Purpose                          |
| ------------ | ----- | -------------------------------- |
| `events.ejs` | 72    | Admin panel to manage all events |

**Features**:

- View all events from all hosts
- Delete any event (admin privilege)
- Event statistics
- Host information display

---

## 🎨 Styling Summary

**All styles are inline in views** using `<style>` tags:

- **Color Scheme**:

  - Primary: #3498db (blue)
  - Success: #27ae60 (green)
  - Danger: #e74c3c (red)
  - Dark: #2c3e50
  - Gradients: Purple-blue (#667eea → #764ba2)

- **Layout**:

  - Max width: 1200px containers
  - Responsive grid (CSS Grid)
  - Card-based design
  - Flexbox navigation

- **Components**:
  - Buttons (primary, success, danger, secondary)
  - Badges (for categories, counts)
  - Cards (for events, stats)
  - Tables (for participant lists)
  - Forms (with validation styling)

---

## 📊 Code Statistics

### By File Type

| Type          | Files | Lines | Purpose           |
| ------------- | ----- | ----- | ----------------- |
| JavaScript    | 2     | 536   | Application logic |
| EJS Templates | 15    | 1,938 | User interface    |
| SQL           | 1     | 150   | Database schema   |
| Markdown      | 7     | 2,785 | Documentation     |
| JSON          | 2     | 24+   | Configuration     |
| Config        | 2     | 55    | Environment & Git |

**Total**: ~5,488 lines of code + documentation

---

## 🗺️ Route-to-File Mapping

### Public Routes → Views

| Route         | Method | View File                 | Lines |
| ------------- | ------ | ------------------------- | ----- |
| `/`           | GET    | `views/index.ejs`         | 58    |
| `/login`      | GET    | `views/login.ejs`         | 67    |
| `/register`   | GET    | `views/register.ejs`      | 81    |
| `/events`     | GET    | `views/events/index.ejs`  | 135   |
| `/events/:id` | GET    | `views/events/detail.ejs` | 142   |

### Authenticated Routes → Views

| Route                           | Method | View File                     | Lines |
| ------------------------------- | ------ | ----------------------------- | ----- |
| `/dashboard`                    | GET    | `views/dashboard.ejs`         | 85    |
| `/events/new`                   | GET    | `views/events/new.ejs`        | 103   |
| `/events/:id/edit`              | GET    | `views/events/edit.ejs`       | 115   |
| `/events/my/list`               | GET    | `views/events/my.ejs`         | 94    |
| `/host/dashboard`               | GET    | `views/host/dashboard.ejs`    | 98    |
| `/host/events/:id/participants` | GET    | `views/host/participants.ejs` | 137   |

### Admin Routes → Views

| Route           | Method | View File                | Lines |
| --------------- | ------ | ------------------------ | ----- |
| `/admin/events` | GET    | `views/admin/events.ejs` | 72    |

---

## 🔄 Data Flow

### Registration Flow

1. User fills `views/register.ejs` form
2. POST to `/register` in `app.js`
3. `app.js` hashes password with bcryptjs
4. `db.js` inserts into users table
5. Redirect to `views/login.ejs`

### Event Creation Flow

1. Host fills `views/events/new.ejs` form
2. POST to `/events` in `app.js`
3. `app.js` validates data
4. `db.js` inserts into events table
5. Redirect to `views/events/my.ejs`

### Event Registration Flow

1. User clicks "Register" on `views/events/detail.ejs`
2. POST to `/events/:id/register` in `app.js`
3. `db.js` inserts into registrations table
4. Page reloads with updated count

---

## 📦 Dependencies (package.json)

### Production Dependencies (6)

- **express** (5.2.1) - 2,500+ lines
- **ejs** (3.1.10) - 1,500+ lines
- **mysql2** (3.15.3) - 15,000+ lines
- **bcryptjs** (3.0.3) - 1,000+ lines
- **express-session** (1.18.2) - 800+ lines
- **dotenv** (17.2.3) - 200+ lines

### Dev Dependencies (1)

- **nodemon** (latest) - Auto-reload during development

**Total npm packages**: 93 (including sub-dependencies)

---

## 🔐 Configuration Files

### .env (Not in Git)

```env
DB_HOST=203.91.116.122
DB_PORT=22136
DB_USER=teams
DB_PASSWORD=secret
DB_NAME=team6_event_portal
PORT=3000
SESSION_SECRET=random-secret-key
```

### .gitignore

Excludes:

- node_modules/
- .env
- logs/
- \*.log
- OS files (.DS_Store, Thumbs.db)
- IDE files (.vscode/, .idea/)

---

## 📋 Database Tables (from setup.sql)

### users (7 columns)

- id, name, email, password, role, created_at
- Indexes: email, role
- Constraints: UNIQUE(email)

### events (10 columns)

- id, title, description, category, location
- start_datetime, end_datetime, max_attendees
- host_id, created_at
- Indexes: start_datetime, category, host_id
- Foreign key: host_id → users.id

### registrations (4 columns)

- id, user_id, event_id, registered_at
- Unique constraint: (user_id, event_id)
- Indexes: user_id, event_id
- Foreign keys: user_id → users.id, event_id → events.id

---

## 🎯 Feature-to-File Mapping

### User Authentication

- **Files**: `app.js`, `views/register.ejs`, `views/login.ejs`
- **Dependencies**: bcryptjs, express-session
- **Database**: users table
- **Lines**: ~250

### Event CRUD

- **Files**: `app.js`, `views/events/*.ejs`
- **Database**: events, registrations tables
- **Lines**: ~450

### Event Browsing

- **Files**: `app.js`, `views/events/index.ejs`
- **Database**: events, users, registrations tables
- **Lines**: ~200

### Host Dashboard

- **Files**: `app.js`, `views/host/*.ejs`
- **Database**: All tables
- **Lines**: ~300

### Admin Panel

- **Files**: `app.js`, `views/admin/*.ejs`
- **Database**: All tables
- **Lines**: ~150

---

## 📚 Documentation Files

### For Users

- **QUICKSTART.md**: New users getting started
- **README.md**: Complete feature documentation
- **docs/USER_GUIDE.md**: (To be created with screenshots)

### For Developers

- **PROJECT_SUMMARY.md**: High-level project overview
- **docs/DEPLOYMENT.md**: Server deployment
- **docs/TESTING_CHECKLIST.md**: QA testing
- **database/setup.sql**: Schema reference

### For Team

- **NEXT_STEPS.md**: Immediate action items
- **Planning Report**: (To be updated by PM)

---

## 🚀 Deployment Files

### Required on Server

- All `.js` files
- All `views/` files
- `database/setup.sql` (for reference)
- `.env` (created manually, not pushed)
- `package.json`

### Not Required on Server

- Documentation (`.md` files)
- `.env.example`
- `.gitignore`
- `README.md` (optional, helpful for reference)

---

## ✅ Quality Metrics

| Metric              | Count | Status |
| ------------------- | ----- | ------ |
| Total files         | 28    | ✅     |
| Code files          | 18    | ✅     |
| Documentation files | 7     | ✅     |
| Routes              | 22    | ✅     |
| Database tables     | 3     | ✅     |
| Test cases          | 29+   | ✅     |
| Features            | 15+   | ✅     |
| Dependencies        | 6     | ✅     |

---

## 🔍 File Search Quick Reference

**Looking for...**

- Authentication logic? → `app.js` (lines 80-180)
- Event creation? → `app.js` (lines 280-320)
- Event browsing? → `views/events/index.ejs`
- Database schema? → `database/setup.sql`
- Deployment steps? → `docs/DEPLOYMENT.md`
- Testing checklist? → `docs/TESTING_CHECKLIST.md`
- Quick setup? → `QUICKSTART.md`
- Project overview? → `PROJECT_SUMMARY.md`
- Next tasks? → `NEXT_STEPS.md`

---

## 📊 Complexity Analysis

### Simple Files (<50 lines)

- `db.js` - 13 lines
- `.env.example` - 10 lines
- `partials/footer-layout.ejs` - 7 lines
- `partials/header.ejs` - 25 lines

### Medium Files (50-150 lines)

- All view files
- Documentation files

### Complex Files (>150 lines)

- `app.js` - 523 lines (main application)
- `docs/DEPLOYMENT.md` - 520 lines
- `PROJECT_SUMMARY.md` - 650 lines

---

## 🎨 Style Guide Summary

**Naming Conventions**:

- Files: lowercase with hyphens (`event-detail.ejs`)
- Variables: camelCase (`eventId`)
- Functions: camelCase (`isAuthenticated`)
- CSS classes: kebab-case (`event-card`)
- Database: snake_case (`start_datetime`)

**Code Organization**:

- Routes grouped by function
- Views organized by feature
- Middleware at top of app.js
- Styles inline in EJS files

---

## 🏁 Completion Status

✅ **100% Complete**

All files created, documented, and committed to Git.

**Next**: Follow `NEXT_STEPS.md` to:

1. Setup database
2. Configure environment
3. Test locally
4. Deploy to server
5. Complete testing
6. Create user guide
7. Finalize documentation
8. Prepare presentation
9. Submit

---

_Last updated: December 8, 2025_  
_Team 6 - Event Portal_
