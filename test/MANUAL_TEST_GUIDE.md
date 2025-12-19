# Manual System Testing Guide

## Prerequisites

- Server running on http://localhost:3001
- Database connection active
- Browser ready (Chrome/Firefox/Edge)

## Test Cases to Execute

### ST-001: View Homepage

**Steps:**

1. Open browser
2. Navigate to http://localhost:3001/
3. Observe page load

**Expected Result:** Homepage displays with "Event Portal" title and welcome message

**Status:** [ ] Pass / [ ] Fail

---

### ST-002: View Events List

**Steps:**

1. Navigate to http://localhost:3001/events
2. Observe events displayed

**Expected Result:** List of all events displayed with titles, dates, and details

**Status:** [ ] Pass / [ ] Fail

---

### ST-003: Register New User

**Steps:**

1. Navigate to http://localhost:3001/register
2. Fill in:
   - Name: Manual Test User
   - Email: manualtest@test.com
   - Password: test123
   - Role: student
3. Click Submit

**Expected Result:** Redirect to login page successfully

**Status:** [ ] Pass / [ ] Fail

---

### ST-004: Login with Valid Credentials

**Steps:**

1. Navigate to http://localhost:3001/login
2. Enter:
   - Email: test.student@test.com
   - Password: password
3. Click Login

**Expected Result:** Successfully login and redirect to dashboard

**Status:** [ ] Pass / [ ] Fail

---

### ST-005: Login with Invalid Credentials

**Steps:**

1. Navigate to http://localhost:3001/login
2. Enter:
   - Email: wrong@test.com
   - Password: wrongpass
3. Click Login

**Expected Result:** Error message displayed, no crash

**Status:** [ ] Pass / [ ] Fail

---

### ST-006: View Event Details

**Steps:**

1. Navigate to http://localhost:3001/events
2. Click on any event
3. Observe detail page

**Expected Result:** Event details page shows full information

**Status:** [ ] Pass / [ ] Fail

---

### ST-007: Access Dashboard (Authenticated)

**Steps:**

1. Login first
2. Navigate to http://localhost:3001/dashboard

**Expected Result:** Dashboard page displays user information

**Status:** [ ] Pass / [ ] Fail

---

### ST-008: Access Dashboard (Unauthenticated)

**Steps:**

1. Ensure logged out
2. Navigate to http://localhost:3001/dashboard

**Expected Result:** Redirect to login page

**Status:** [ ] Pass / [ ] Fail

---

### ST-009: Create New Event (As Host)

**Steps:**

1. Login as host (john@host.com / password)
2. Navigate to http://localhost:3001/events/new
3. Fill in event details
4. Submit form

**Expected Result:** Event created successfully, redirected to event list or my events

**Status:** [ ] Pass / [ ] Fail

---

### ST-010: View My Events (As Host)

**Steps:**

1. Login as host
2. Navigate to http://localhost:3001/events/my/list

**Expected Result:** List of events created by this host displayed

**Status:** [ ] Pass / [ ] Fail

---

### ST-011: Register for Event

**Steps:**

1. Login as student
2. View event details
3. Click "Register" button

**Expected Result:** Successfully registered for event

**Status:** [ ] Pass / [ ] Fail

---

### ST-012: View Registered Events

**Steps:**

1. Login as student
2. Navigate to dashboard or registered events page
3. View registered events

**Expected Result:** List shows events student has registered for

**Status:** [ ] Pass / [ ] Fail

---

### ST-013: Filter Events by Category

**Steps:**

1. Navigate to http://localhost:3001/events
2. Select category filter (e.g., Workshop)
3. Apply filter

**Expected Result:** Only events matching selected category displayed

**Status:** [ ] Pass / [ ] Fail

---

### ST-014: Error Handling - Non-existent Event

**Steps:**

1. Navigate to http://localhost:3001/events/99999

**Expected Result:** Error page or appropriate error message, no server crash

**Status:** [ ] Pass / [ ] Fail

---

### ST-015: Database Connection Test

**Steps:**

1. Navigate to http://localhost:3001/db-test

**Expected Result:** JSON response with success: true and database result

**Status:** [ ] Pass / [ ] Fail

---

## Screenshot Checklist

Capture screenshots for:

- [ ] Homepage
- [ ] Events list page
- [ ] Event detail page
- [ ] Registration form
- [ ] Login page
- [ ] Dashboard (authenticated)
- [ ] Create event form
- [ ] My events page
- [ ] Error page (non-existent resource)
- [ ] Database test result

## Notes

Record any issues or unexpected behavior below:

---
