# 📋 Project Management System

A modern, full-stack web application for managing projects and tasks with real-time collaboration features. Built with Node.js, Express, React, and modern web technologies.

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** - Secure account creation and authentication
- **JWT Token-based Authentication** - Secure API access with JWT tokens
- **Role-based Access Control** - Three roles: User, Manager, and Admin
- **Password Management** - Update password and forgot password functionality
- **Profile Management** - Update user details, department, and position
- **Session Management** - Track last login and inactive users

### 📁 Project Management
- **Create/Read/Update/Delete Projects** - Full CRUD operations for projects
- **Project Filtering & Search** - Filter by status, priority, and search by name/description
- **Project Status Tracking** - Status states: planning, active, on-hold, completed, cancelled
- **Priority Levels** - Projects can be marked as low, medium, high, or critical
- **Team Collaboration** - Add team members with different roles (member, lead, viewer)
- **Budget Tracking** - Track project budget and expenses
- **Project Attachments** - Upload and manage project files
- **Progress Tracking** - Monitor project completion percentage
- **Project Analytics** - View task statistics and metrics

### ✅ Task Management
- **Task CRUD Operations** - Create, update, and delete tasks
- **Task Assignment** - Assign tasks to multiple team members
- **Task Status Workflow** - Status workflow: todo → in-progress → review → done
- **Priority System** - Tasks support low, medium, high, and critical priority levels
- **Due Date Tracking** - Set and track task deadlines
- **Time Estimation** - Estimate and track actual hours spent on tasks
- **Task Checklists** - Create subtasks/checklist items within tasks
- **Task Comments** - Collaborate with inline comments on tasks
- **Task Attachments** - Attach files to tasks
- **Task Filtering** - Filter by project, status, priority, and assignee
- **Kanban View** - Organize tasks in a Kanban board view

### 📊 Dashboard & Analytics
- **Executive Dashboard** - Real-time overview of all projects and tasks
- **Statistics Cards** - Quick stats for projects, tasks, team size, and completion rates
- **Project Status Charts** - Pie charts showing project distribution by status
- **Task Status Charts** - Bar charts showing task progress
- **Upcoming Deadlines** - View upcoming task deadlines at a glance
- **My Tasks Overview** - Personalized task list for the current user
- **Performance Metrics** - Task completion rates and project health indicators

### 👥 User Management
- **User Profiles** - Detailed user profiles with avatar, department, and position
- **Team Management** - View all team members (admin/manager only)
- **User Search** - Search and find users to add to projects
- **Role Assignment** - Assign different roles within projects

### 🛡️ Security Features
- **Password Hashing** - Bcrypt encryption for password security
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Prevent brute force attacks (100 requests per 10 minutes)
- **CORS Protection** - Cross-Origin Resource Sharing configured
- **Security Headers** - Helmet.js for HTTP security headers
- **Input Validation** - Express-validator for all inputs
- **Authorization Middleware** - Role-based endpoint protection
- **Error Handling** - Comprehensive error handling with meaningful messages

### 🎨 User Interface
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Tailwind CSS Styling** - Modern, clean UI with Tailwind CSS
- **Lucide React Icons** - Beautiful icon set throughout the app
- **Loading States** - Spinners and loading indicators for better UX
- **Toast Notifications** - Real-time user feedback
- **Error Boundaries** - Graceful error handling in React
- **Protected Routes** - Only authenticated users can access app
- **Modal Dialogs** - Create and manage projects/tasks via modals

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **Bcryptjs** - Password hashing
- **Winston** - Logging utility
- **Nodemailer** - Email sending
- **Cloudinary** - Cloud file storage
- **Redis** - Caching (configured)
- **Socket.IO** - Real-time communication (dependency)
- **Helmet** - Security headers
- **Express-validator** - Input validation
- **Morgan** - HTTP request logger

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **TanStack React Query** - Data fetching and caching
- **Zustand** - State management
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Tailwind CSS** - CSS framework
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **React Toastify** - Toast notifications
- **Socket.IO Client** - Real-time client
- **date-fns** - Date formatting

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager
- Git

### Clone the Repository
```bash
git clone <repository-url>
cd project-management-system
```

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` file with your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/pms
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Server
PORT=5000
CLIENT_URL=http://localhost:5173

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@pms.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

5. **Start the backend server**
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env.local file** (optional)
```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. **Start the development server**
```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173`

5. **Build for production**
```bash
npm run build
```

---

## 🚀 Running the Application

### Development Mode (Both Frontend & Backend)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": { user object }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
```

#### Update Profile
```
PUT /auth/updatedetails
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "department": "Engineering",
  "position": "Senior Developer"
}
```

#### Change Password
```
PUT /auth/updatepassword
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

#### Forgot Password
```
POST /auth/forgotpassword
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Logout
```
GET /auth/logout
Authorization: Bearer <token>
```

### Projects Endpoints

#### Get All Projects
```
GET /projects?status=active&priority=high&search=backend
Authorization: Bearer <token>
```

#### Get Single Project
```
GET /projects/:id
Authorization: Bearer <token>
```

#### Create Project
```
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mobile App Development",
  "description": "Build iOS and Android app",
  "startDate": "2024-02-01",
  "endDate": "2024-06-30",
  "priority": "high",
  "status": "planning",
  "budget": 50000
}
```

#### Update Project
```
PUT /projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "status": "active",
  "progress": 45
}
```

#### Delete Project
```
DELETE /projects/:id
Authorization: Bearer <token>
```

#### Add Team Member
```
POST /projects/:id/team
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "role": "member"
}
```

#### Get Project Analytics
```
GET /projects/:id/analytics
Authorization: Bearer <token>
```

### Tasks Endpoints

#### Get All Tasks
```
GET /tasks?project=project_id&status=todo&priority=high
Authorization: Bearer <token>
```

#### Create Task
```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Implement login form",
  "description": "Create login form component",
  "project": "project_id",
  "assignedTo": ["user_id1", "user_id2"],
  "priority": "high",
  "dueDate": "2024-02-15",
  "estimatedHours": 8
}
```

#### Update Task
```
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "actualHours": 4,
  "progress": 50
}
```

#### Delete Task
```
DELETE /tasks/:id
Authorization: Bearer <token>
```

#### Add Comment to Task
```
POST /tasks/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "This task is blocked by task #123"
}
```

### Users Endpoints

#### Get All Users (Admin/Manager only)
```
GET /users
Authorization: Bearer <token>
```

#### Get Single User
```
GET /users/:id
Authorization: Bearer <token>
```

---

## 📁 Project Structure

```
project-management-system/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── cloudinary.js         # Cloudinary setup
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── projectController.js  # Project logic
│   │   └── taskController.js     # Task logic
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── errorHandler.js       # Error handling
│   │   └── validation.js         # Input validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Project.js            # Project schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── projects.js           # Project routes
│   │   ├── tasks.js              # Task routes
│   │   └── users.js              # User routes
│   ├── utils/
│   │   ├── logger.js             # Winston logger
│   │   ├── sendEmail.js          # Email utility
│   │   └── rateLimiter.js        # Rate limiting
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example env file
│   ├── index.js                  # Server entry point
│   ├── app.js                    # Express app (empty)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Layout.jsx    # Main layout
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── projects/
│   │   │   │   └── CreateProjectModal.jsx
│   │   │   └── tasks/
│   │   │       ├── CreateTaskModal.jsx
│   │   │       └── TaskCard.jsx
│   │   ├── hooks/
│   │   │   ├── useProjects.js    # Projects data
│   │   │   ├── useTasks.js       # Tasks data
│   │   │   └── useSocket.js      # WebSocket
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Dashboard
│   │   │   ├── Projects.jsx      # Projects page
│   │   │   ├── ProjectDetail.jsx # Project detail
│   │   │   ├── Tasks.jsx         # Tasks page
│   │   │   ├── Login.jsx         # Login
│   │   │   ├── Register.jsx      # Register
│   │   │   └── Profile.jsx       # User profile
│   │   ├── services/
│   │   │   ├── api.js            # Axios setup
│   │   │   ├── authService.js    # Auth API
│   │   │   ├── projectService.js # Project API
│   │   │   ├── taskService.js    # Task API
│   │   │   └── socketService.js  # WebSocket
│   │   ├── store/
│   │   │   └── authStore.js      # Zustand auth
│   │   ├── utils/
│   │   │   └── cn.js             # CSS utilities
│   │   ├── App.jsx               # Main app
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env.local                # Frontend env
│   ├── vite.config.js            # Vite config
│   ├── tailwind.config.js        # Tailwind config
│   └── package.json
│
└── README.md                     # This file
```

---

## 🔐 Default Roles & Permissions

### User Roles
1. **User** - Can create projects, tasks, manage own tasks
2. **Manager** - Can create projects, manage teams, view analytics
3. **Admin** - Full system access, user management

### Access Control
- Users can see only projects they own or are assigned to
- Admins can see all projects
- Protected endpoints require valid JWT token

---

## 📝 Usage Guide

### Creating Your First Project

1. **Login** with your credentials
2. **Click "New Project"** button
3. **Fill in project details**:
   - Project name and description
   - Start and end dates
   - Priority level
   - Budget (optional)
4. **Submit** to create

### Adding Team Members

1. **Open a project**
2. **Click "Add Team Member"**
3. **Select a user** from the list
4. **Choose their role** (Member, Lead, Viewer)
5. **Confirm** to add

### Creating Tasks

1. **Navigate to Tasks** or **Project Detail**
2. **Click "New Task"**
3. **Fill task details**:
   - Task title and description
   - Select project
   - Assign to team members
   - Set priority and due date
   - Estimate hours
4. **Submit** to create

### Managing Task Status

1. **Find the task** in Kanban view or list
2. **Click the task** to open
3. **Update status** in dropdown (todo → in-progress → review → done)
4. **Add comments** or attachments if needed
5. **Save changes**

### Viewing Dashboard

1. **Go to home/dashboard**
2. **See at a glance**:
   - Total active projects
   - Your assigned tasks
   - Team members count
   - Overall completion rate
3. **View upcoming deadlines**
4. **Click statistics** to drill down

---

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure MongoDB is running
- Check `.env` variables are correct
- Verify PORT is not in use
- Check CORS origin matches frontend URL

### Frontend Not Loading Data
- Check browser console for errors
- Verify API URL in `.env.local`
- Ensure backend is running
- Check network tab in DevTools

### Authentication Issues
- Clear localStorage: Open DevTools → Application → Local Storage → Clear
- Try logging out and back in
- Verify JWT_SECRET is consistent

### Email Not Sending
- Check SMTP credentials in `.env`
- Enable "Less secure app access" for Gmail
- Verify EMAIL_FROM is correct
- Check console logs for error details

---

## 📊 Supported Statuses & Filters

### Project Status
- `planning` - Project in planning phase
- `active` - Project is active
- `on-hold` - Project is on hold
- `completed` - Project completed
- `cancelled` - Project cancelled

### Task Status
- `todo` - Not started
- `in-progress` - Currently being worked on
- `review` - In code/work review
- `done` - Completed

### Priority Levels
- `low` - Low priority
- `medium` - Medium priority
- `high` - High priority
- `critical` - Critical priority

---

## 🚦 Available Scripts

### Backend Scripts
```bash
npm run dev        # Run with nodemon
npm start          # Run in production
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

### Frontend Scripts
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 📞 Support & Feedback

For issues, feature requests, or feedback:
1. Check existing issues
2. Create detailed bug reports
3. Include steps to reproduce
4. Provide environment details

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 🎯 Future Enhancements

- Real-time collaboration with WebSockets
- File upload and sharing
- Advanced reporting and analytics
- Mobile app (React Native)
- Integration with third-party tools
- Dark mode support
- Notifications and reminders
- Project templates
- Time tracking features
- Export to PDF/Excel

---

## 📞 Contact

For questions or support, reach out to the development team.

---

**Last Updated**: January 22, 2026

