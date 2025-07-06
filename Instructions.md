# 📘 TaskTracker Lite – AI Assistant Prompt Set

A structured MERN full-stack task management app with authentication, CRUD, filters, responsive design, and theming.

---

## 🧱 Core Functionalities

0. [Project Check & Initialization](#prompt-0)
1. [User Registration and Login (Auth System)](#prompt-1)
2. [JWT Token Handling and Protected Routes](#prompt-2)
3. [Task Creation and Display](#prompt-3)
4. [Task Editing and Deletion](#prompt-4)
5. [Task Completion Toggle](#prompt-5)
6. [Filtering, Sorting, and Search](#prompt-6)
7. [Responsive Layout and Navigation](#prompt-7)
8. [Dark Mode and Theming](#prompt-8)
9. [Forgot Password Flow (Stretch)](#prompt-9)

---

## 📌 Prompt 0 – Project Check & Initialization

**Description:**  
Set up the project folder structure, dependencies, and development environment for both the client and server.

**Features:**

- Monorepo or dual-folder structure: `client/` and `server/`
- Node.js + Express + Mongoose on backend
- React + Tailwind CSS + Axios on frontend
- ESLint, Prettier, Git initialized

**Actions:**

- Initialize Git repo
- Scaffold server and client folders
- Install required dependencies
- Add environment files and basic README

**Steps:**

1. Create a root folder for the project.
2. Inside it, create `client/` and `server/` directories.
3. In `server/`:
   - Run `npm init -y`
   - Install: `express`, `mongoose`, `cors`, `dotenv`, `bcrypt`, `jsonwebtoken`, `express-validator`, `nodemon`
   - Create starter files: `index.js`, `routes/`, `models/`, `controllers/`
4. In `client/`:
   - Initialize React with Create React App or Next.js App Router
   - Install: `axios`, `react-router-dom`, `tailwindcss`, `clsx`, `@headlessui/react`
   - Set up Tailwind with PostCSS
5. Create shared `.eslintrc.js` and `.prettierrc`
6. Add `.env` files for each project
7. Create `.gitignore` and initial README

**Implementation Notes:**

- Choose Create React App for simplicity or Next.js (App Router) for advanced routing features.
- Use nodemon for hot-reloading in the backend.
- Prepare for future deployment by setting up folders like `/public`, `/config`, `/scripts`.

---

## 📌 Prompt 1 – User Registration and Login (Auth System)

**Description:**  
Set up backend and frontend for secure user authentication via email and password.

**Features:**

- Sign Up with username, email, and password
- Sign In using email and password
- Input validation on client and server

**Actions:**

- POST `/api/auth/register`
- POST `/api/auth/login`

**Steps:**

1. Create `User` model with fields: `username`, `email`, `hashedPassword`.
2. Add registration and login endpoints with validation.
3. Build UI pages for Sign Up and Sign In with controlled input fields.
4. Connect to backend via `axios`.

**Implementation Notes:**

- Use `bcrypt` for password hashing.
- Use `express-validator` to ensure input validity.
- Return appropriate error messages for feedback.

---

## 📌 Prompt 2 – JWT Token Handling and Protected Routes

**Description:**  
Secure user sessions using access and refresh tokens.

**Features:**

- Access token in memory or HTTP-only cookie
- Middleware to protect private API routes
- Logout functionality

**Actions:**

- Verify JWT in middleware
- Access token management
- Frontend state persistence

**Steps:**

1. On login, issue JWT and store in cookie or memory.
2. Add middleware to authenticate protected routes.
3. Manage auth state in Context or Redux.
4. Build logout functionality that clears tokens.

**Implementation Notes:**

- HTTP-only cookies preferred for security.
- Add route guards on the client for protected views.
- Refresh token flow is optional for this version.

---

## 📌 Prompt 3 – Task Creation and Display

**Description:**  
Allow authenticated users to create and view tasks.

**Features:**

- Create task with title, description, due date, priority
- Read task list grouped or paginated
- Client and server-side validation

**Actions:**

- POST `/api/tasks`
- GET `/api/tasks`

**Steps:**

1. Define `Task` model: `title`, `description`, `dueDate`, `priority`, `completed`, `owner`.
2. Add task creation and list routes with token auth.
3. Build `TaskForm` component/modal.
4. Fetch and display tasks in a grid or list format.

**Implementation Notes:**

- Use loading states and error boundaries.
- Add createdAt/updatedAt fields for sorting if needed.

---

## 📌 Prompt 4 – Task Editing and Deletion

**Description:**  
Support task updates and deletions with confirmation UI.

**Features:**

- Edit task fields
- Delete task (soft/hard)
- Edit UI pre-fills data

**Actions:**

- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

**Steps:**

1. Add update and delete routes with validations.
2. Reuse `TaskForm` for both create and edit modes.
3. Add a delete confirmation modal/dialog in the UI.
4. Trigger updates in task list after mutation.

**Implementation Notes:**

- Consider using modal context to control visibility.
- Handle optimistic UI updates for responsiveness.

---

## 📌 Prompt 5 – Task Completion Toggle

**Description:**  
Enable users to toggle task completion with instant UI feedback.

**Features:**

- Checkbox toggle per task
- Visual style for completed tasks

**Actions:**

- PUT `/api/tasks/:id/toggle-complete` to toggle `completed`

**Steps:**

1. Add checkbox or icon in `TaskItem`.
2. On toggle, send PUT request to update `completed`.
3. Update local state optimistically.

**Implementation Notes:**

- Use conditional styling like opacity or line-through.
- Handle network errors with rollback if necessary.

---

## 📌 Prompt 6 – Filtering, Sorting, and Search

**Description:**  
Add tools for narrowing and organizing task views.

**Features:**

- Filter by priority, status
- Sort by due date or priority
- Keyword search in title or description

**Actions:**

- GET `/api/tasks?priority=High&search=report`

**Steps:**

1. Add support for query params in backend.
2. Build dropdowns, radio buttons, and search input on UI.
3. Sync filter/sort state with requests.

**Implementation Notes:**

- Debounce search input for performance.
- Optionally sync filters to URL for shareable state.

---

## 📌 Prompt 7 – Responsive Layout and Navigation

**Description:**  
Create mobile-friendly layouts and intuitive navigation.

**Features:**

- Top navbar and side drawer
- Responsive layout with Tailwind
- Conditional rendering for mobile/desktop

**Actions:**

- Route-based navigation logic
- Responsive utilities for drawer toggle

**Steps:**

1. Build `Navbar` with theme toggle, logout, title.
2. Add mobile drawer menu with `hamburger` icon.
3. Use Tailwind `flex`, `grid`, and breakpoints to layout pages.

**Implementation Notes:**

- Use `headlessui` or `radix-ui` for menu transitions.
- Keep layout consistent across all pages.

---

## 📌 Prompt 8 – Dark Mode and Theming

**Description:**  
Provide a theme toggle between light and dark modes.

**Features:**

- Toggle stored in localStorage
- Tailwind `dark` class support

**Actions:**

- Switch theme in UI and apply classes globally

**Steps:**

1. Enable `class`-based dark mode in Tailwind config.
2. Add toggle in `Navbar` that updates state and localStorage.
3. Apply `dark` class on `html` tag.

**Implementation Notes:**

- Use Tailwind utility classes to theme all UI elements.
- Animate transitions using `transition-colors`.

---

## 📌 Prompt 9 – Forgot Password Flow (Stretch)

**Description:**  
Enable password recovery via email token and reset form.

**Features:**

- Request reset via email
- Secure one-time token
- New password form

**Actions:**

- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password`

**Steps:**

1. Backend: generate secure token and send email with link.
2. Frontend: build “Forgot Password?” form and reset page.
3. Validate token and update password.

**Implementation Notes:**

- Use `nodemailer` for emails.
- Set token to expire after 10–15 minutes.

---
