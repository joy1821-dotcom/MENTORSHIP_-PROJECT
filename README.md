# Mentorship Matching Platform

A web application designed for incubators and accelerator programs to efficiently match mentors with mentees. The platform facilitates user registration, mentor discovery, session scheduling, and post-session feedback — all built with role-based access control.

---

## 🚀 Project Summary

The platform supports three roles:

- **Admins** – Manage users, oversee matches, and view all sessions.
- **Mentors** – Set availability, accept/reject mentee requests, and host mentorship sessions.
- **Mentees** – Browse mentors, send match requests, and book sessions.

---

## 👤 User Roles and Capabilities

| Role    | Capabilities |
|---------|--------------|
| Admin   | Manage users, assign roles, view/assign all sessions |
| Mentor  | Set availability, manage requests, host sessions |
| Mentee  | Browse mentors, request mentorship, book sessions |

Users can only access pages and actions based on their assigned role.

---

## 🔑 Key Features

### 1. Authentication & Authorization
- Email/password login with JWT authentication
- Role-based access control (Admin, Mentor, Mentee)

### 2. User Profiles
- Required profile fields after login:
  - Name
  - Short bio
  - Skills (multi-select)
  - Goals (e.g., *"Improve product design skills"*)

### 3. Mentor Discovery & Matching
- Filter mentors by:
  - Skill (e.g., *Marketing, UI/UX*)
  - Industry (optional tag)
- Mentors can **accept** or **reject** mentorship requests
- Once accepted, a match is formed and session booking becomes available

### 4. Availability & Session Booking
- Mentors set weekly availability blocks
- Mentees book sessions from available slots
- Upcoming sessions are viewable by both parties
- (Optional) Email reminders for sessions

### 5. Session Feedback
- Mentees rate sessions (1–5 stars) and leave comments
- Mentors can optionally provide feedback

### 6. Admin Dashboard
- Manage all users
- View and manage all matches
- Track session data
- Manually assign mentors to mentees

---

## 🧭 Frontend Routes (By Role)

### Common
- `/login`
- `/profile/edit`

### Admin
- `/admin/users`
- `/admin/matches`
- `/admin/sessions`

### Mentor
- `/dashboard`
- `/availability`
- `/requests`
- `/sessions`

### Mentee
- `/dashboard`
- `/mentors`
- `/my-requests`
- `/my-sessions`

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint        | Description                        |
|--------|-----------------|------------------------------------|
| POST   | `/auth/register`| Register a new user                |
| POST   | `/auth/login`   | Login and receive JWT              |
| POST   | `/auth/logout`  | Logout user (optional)             |
| GET    | `/auth/me`      | Get authenticated user info        |

### Users & Profiles

| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| GET    | `/users/me`          | Get current user profile        |
| GET    | `/users/:id`         | Get another user's profile      |
| PUT    | `/users/me/profile`  | Update own profile              |

### Mentorship Requests

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/requests`          | Mentee sends mentorship request      |
| GET    | `/requests/sent`     | Mentee views sent requests           |
| GET    | `/requests/received` | Mentor views received requests       |
| PUT    | `/requests/:id`      | Mentor accepts/rejects a request     |

### Mentorship Sessions

| Method | Endpoint                  | Description                         |
|--------|---------------------------|-------------------------------------|
| POST   | `/sessions`               | Book a session                      |
| GET    | `/sessions/mentor`        | Mentor's upcoming sessions          |
| GET    | `/sessions/mentee`        | Mentee's upcoming sessions          |
| PUT    | `/sessions/:id/feedback`  | Submit session feedback             |

### Admin Tools

| Method | Endpoint                 | Description                         |
|--------|--------------------------|-------------------------------------|
| GET    | `/admin/users`          | View all users                      |
| PUT    | `/admin/users/:id/role` | Update user role                    |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dan-codeit/mentorship_project.git
cd mentorshipApp



