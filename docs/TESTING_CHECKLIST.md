# Testing Checklist - Event Portal

## Test Date: ****\_****

## Tester: ****\_****

---

## 1. User Authentication (MUST Requirement)

### Registration

- [ ] Can access `/register` page
- [ ] Form displays all required fields (name, email, password, role)
- [ ] **Test 1**: Register with valid email → Success, redirected to login
  - Email: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] **Test 2**: Try registering same email again → Error message shown
  - Result: ⬜ Pass ⬜ Fail
- [ ] User appears in database (check via HeidiSQL)
  - Result: ⬜ Pass ⬜ Fail

### Login

- [ ] Can access `/login` page
- [ ] **Test 3**: Login with correct credentials → Redirected to dashboard
  - Email: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] **Test 4**: Login with wrong password → Error message displayed
  - Result: ⬜ Pass ⬜ Fail
- [ ] **Test 5**: Login with non-existent email → Error message displayed
  - Result: ⬜ Pass ⬜ Fail
- [ ] User name appears in header after login
  - Result: ⬜ Pass ⬜ Fail

### Session Persistence

- [ ] **Test 6**: After login, navigate to `/dashboard` → Access granted
  - Result: ⬜ Pass ⬜ Fail
- [ ] **Test 7**: Without login, try `/dashboard` → Redirected to login
  - Result: ⬜ Pass ⬜ Fail
- [ ] Session persists across page refreshes
  - Result: ⬜ Pass ⬜ Fail

### Logout

- [ ] **Test 8**: Click logout → Redirected to home page
  - Result: ⬜ Pass ⬜ Fail
- [ ] After logout, cannot access protected routes
  - Result: ⬜ Pass ⬜ Fail

---

## 2. Event Creation (MUST Requirement)

### Create Event

- [ ] Can access `/events/new` when logged in
  - Result: ⬜ Pass ⬜ Fail
- [ ] **Test 9**: Create event with all required fields
  - Title: ******\_\_\_\_******
  - Category: ******\_\_\_\_******
  - Date: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] Event appears in database
  - Event ID: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] Event appears in "My Events" list
  - Result: ⬜ Pass ⬜ Fail

### Edit Event

- [ ] **Test 10**: Click edit on own event → Form pre-filled
  - Result: ⬜ Pass ⬜ Fail
- [ ] **Test 11**: Change title and save → Changes reflected in database
  - Old title: ******\_\_\_\_******
  - New title: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail

### Delete Event

- [ ] **Test 12**: Delete own event → Removed from database
  - Event ID: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] Associated registrations also deleted
  - Result: ⬜ Pass ⬜ Fail
- [ ] Cannot delete another user's event
  - Result: ⬜ Pass ⬜ Fail

---

## 3. Event Browsing (MUST Requirement)

### Browse All Events

- [ ] Can access `/events` without login
  - Result: ⬜ Pass ⬜ Fail
- [ ] All events displayed in grid layout
  - Total events shown: **\_\_\_\_**
  - Result: ⬜ Pass ⬜ Fail

### Filter by Date

- [ ] **Test 13**: Select specific date → Only events on that date shown
  - Date selected: ******\_\_\_\_******
  - Events shown: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail

### Filter by Category

- [ ] **Test 14**: Select category (e.g., "Sports") → Only Sports events shown
  - Category: ******\_\_\_\_******
  - Events shown: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail

### Filter by Host

- [ ] **Test 15**: Enter host name → Events filtered correctly
  - Host name: ******\_\_\_\_******
  - Events shown: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail

### Combined Filters

- [ ] **Test 16**: Apply multiple filters → Results match all criteria
  - Filters applied: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail

---

## 4. Event Registration (MUST Requirement)

### Register for Event

- [ ] **Test 17**: Click "Register" on event detail page → Success message
  - Event: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] Registration appears in database
  - Check registrations table
  - Result: ⬜ Pass ⬜ Fail
- [ ] Attendee count increments by 1
  - Before: **\_\_\_\_** After: **\_\_\_\_**
  - Result: ⬜ Pass ⬜ Fail

### Duplicate Registration Prevention

- [ ] **Test 18**: Try registering for same event twice → Prevented
  - Result: ⬜ Pass ⬜ Fail

### Unregister from Event

- [ ] **Test 19**: Click "Unregister" → Registration removed
  - Event: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] Attendee count decrements by 1
  - Result: ⬜ Pass ⬜ Fail

### Capacity Limits

- [ ] **Test 20**: Event at max capacity → Cannot register
  - Event: ******\_\_\_\_******
  - Max: **\_\_\_\_** Current: **\_\_\_\_**
  - Result: ⬜ Pass ⬜ Fail

---

## 5. Host Dashboard (SHOULD Requirement)

### Dashboard Access

- [ ] Can access `/host/dashboard` when logged in
  - Result: ⬜ Pass ⬜ Fail
- [ ] Dashboard shows all host's events
  - Total events: **\_\_\_\_**
  - Result: ⬜ Pass ⬜ Fail

### Event Statistics

- [ ] **Test 21**: Registration counts displayed correctly
  - Event 1: ******\_\_\_\_****** (Count: **\_\_\_\_**)
  - Event 2: ******\_\_\_\_****** (Count: **\_\_\_\_**)
  - Result: ⬜ Pass ⬜ Fail
- [ ] Total statistics calculated correctly
  - Total events: **\_\_\_\_**
  - Total registrations: **\_\_\_\_**
  - Result: ⬜ Pass ⬜ Fail

### Participant List

- [ ] **Test 22**: Click "View Participants" → List shown
  - Event: ******\_\_\_\_******
  - Participants: **\_\_\_\_**
  - Result: ⬜ Pass ⬜ Fail
- [ ] Participant details displayed (name, email, registration time)
  - Result: ⬜ Pass ⬜ Fail

### Export Participants

- [ ] **Test 23**: Click "Export to CSV" → File downloaded
  - Filename: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] CSV contains all participant data
  - Result: ⬜ Pass ⬜ Fail

---

## 6. Admin Controls (COULD Requirement)

### Admin Role Setup

- [ ] **Test 24**: Set user role to 'admin' via database
  - User: ******\_\_\_\_******
  - SQL: `UPDATE users SET role='admin' WHERE email='...'`
  - Result: ⬜ Pass ⬜ Fail
- [ ] Admin link appears in navigation
  - Result: ⬜ Pass ⬜ Fail

### Admin Panel

- [ ] Can access `/admin/events`
  - Result: ⬜ Pass ⬜ Fail
- [ ] All events from all hosts displayed
  - Total events: **\_\_\_\_**
  - Result: ⬜ Pass ⬜ Fail

### Delete Any Event

- [ ] **Test 25**: Admin deletes any event → Success
  - Event: ******\_\_\_\_******
  - Host: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail
- [ ] Event and registrations removed from database
  - Result: ⬜ Pass ⬜ Fail

### Non-Admin Access

- [ ] **Test 26**: Regular user tries `/admin/events` → Access denied
  - Result: ⬜ Pass ⬜ Fail

---

## 7. Database Connection

### Connection Test

- [ ] **Test 27**: Visit `/db-test` → JSON response with success
  - Response: ******\_\_\_\_******
  - Result: ⬜ Pass ⬜ Fail

### Data Integrity

- [ ] Foreign keys working (cascade deletes)
  - Result: ⬜ Pass ⬜ Fail
- [ ] Unique constraints enforced (email, user+event)
  - Result: ⬜ Pass ⬜ Fail
- [ ] Timestamps auto-populated
  - Result: ⬜ Pass ⬜ Fail

---

## 8. UI/UX Testing

### Navigation

- [ ] All navigation links work correctly
  - Result: ⬜ Pass ⬜ Fail
- [ ] Header shows correct user info when logged in
  - Result: ⬜ Pass ⬜ Fail
- [ ] Header shows login/register when logged out
  - Result: ⬜ Pass ⬜ Fail

### Responsive Design

- [ ] Pages display correctly on desktop (1920x1080)
  - Result: ⬜ Pass ⬜ Fail
- [ ] Pages display correctly on tablet (768px)
  - Result: ⬜ Pass ⬜ Fail
- [ ] Pages display correctly on mobile (375px)
  - Result: ⬜ Pass ⬜ Fail

### Forms

- [ ] All forms have proper labels
  - Result: ⬜ Pass ⬜ Fail
- [ ] Required fields marked with asterisks
  - Result: ⬜ Pass ⬜ Fail
- [ ] Error messages displayed clearly
  - Result: ⬜ Pass ⬜ Fail
- [ ] Success messages displayed after actions
  - Result: ⬜ Pass ⬜ Fail

---

## 9. Security Testing

### Password Security

- [ ] Passwords hashed in database (not plain text)
  - Result: ⬜ Pass ⬜ Fail
- [ ] Minimum password length enforced
  - Result: ⬜ Pass ⬜ Fail

### Session Security

- [ ] Cannot access protected routes without login
  - Result: ⬜ Pass ⬜ Fail
- [ ] Session expires after logout
  - Result: ⬜ Pass ⬜ Fail

### Authorization

- [ ] Users can only edit/delete own events
  - Result: ⬜ Pass ⬜ Fail
- [ ] Host dashboard only shows own events
  - Result: ⬜ Pass ⬜ Fail
- [ ] Admin routes protected from regular users
  - Result: ⬜ Pass ⬜ Fail

---

## 10. Edge Cases

### Empty States

- [ ] **Test 28**: New user with no events → Helpful message shown
  - Result: ⬜ Pass ⬜ Fail
- [ ] Event with no registrations → Shows "0 registered"
  - Result: ⬜ Pass ⬜ Fail
- [ ] Filter with no results → "No events found" message
  - Result: ⬜ Pass ⬜ Fail

### Date/Time Handling

- [ ] Past events displayed correctly
  - Result: ⬜ Pass ⬜ Fail
- [ ] Future events displayed correctly
  - Result: ⬜ Pass ⬜ Fail
- [ ] Timezone handled consistently
  - Result: ⬜ Pass ⬜ Fail

### Special Characters

- [ ] **Test 29**: Event title with special chars (e.g., "Art & Design")
  - Result: ⬜ Pass ⬜ Fail
- [ ] Event description with line breaks
  - Result: ⬜ Pass ⬜ Fail

---

## Summary

**Total Tests**: 29+  
**Tests Passed**: **\_\_\_\_**  
**Tests Failed**: **\_\_\_\_**  
**Pass Rate**: **\_\_\_\_**%

### Critical Issues Found

1. ***
2. ***
3. ***

### Minor Issues Found

1. ***
2. ***
3. ***

### Recommendations

1. ***
2. ***
3. ***

---

**Tester Signature**: ******\_\_\_\_******  
**Date**: ******\_\_\_\_******  
**Version Tested**: ******\_\_\_\_******
