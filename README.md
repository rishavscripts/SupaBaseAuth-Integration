# SupaBaseAuth-Integration
# 🎓 Academic Portal – Supabase Authentication & Role-Based Access Control

A full-stack web application demonstrating how to integrate **Supabase Authentication with a Java Spring Boot backend and React frontend**, implementing secure JWT-based authentication, authorization, and Role-Based Access Control (RBAC).

The project is designed as a practical developer learning guide to understanding how modern authentication systems work when the authentication provider and backend application are maintained separately.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Project Objectives](#-project-objectives)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Authentication & Authorization Flow](#-authentication--authorization-flow)
- [User Roles & Permissions](#-user-roles--permissions)
- [Database Design](#-database-design)
- [Backend API Endpoints](#-backend-api-endpoints)
- [Frontend Application](#-frontend-application)
- [Project Structure](#-project-structure)
- [Environment Configuration](#-environment-configuration)
- [Getting Started](#-getting-started)
- [Security Implementation](#-security-implementation)
- [Testing](#-testing)
- [Learning Outcomes](#-learning-outcomes)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🚀 Overview

The Academic Portal is a role-based academic management application built using React, Spring Boot, and Supabase.

The primary objective is to understand how **authentication and authorization work together in a modern full-stack application**.

Instead of implementing authentication manually in Spring Boot, the application delegates user registration, login, session management, and JWT generation to Supabase Auth.

The Spring Boot backend independently validates the JWT access tokens issued by Supabase and determines what an authenticated user is allowed to access.

The application supports two user roles:

- **STUDENT:** Can submit and view their own academic information and marks.
- **TEACHER:** Can view, add, update, and delete student academic records.

This architecture demonstrates how a dedicated authentication provider can work alongside a separately developed backend application.

### Why This Project?

Authentication and authorization are often confused, especially when working with third-party authentication providers.

This project demonstrates the difference:

| Concept | Responsibility |
|---|---|
| Authentication (AuthN) | Identifies who the user is. |
| Authorization (AuthZ) | Determines what the authenticated user can access. |
| JWT | Carries digitally signed authentication claims. |
| RBAC | Grants permissions according to the user's role. |
| Spring Security | Validates requests and enforces backend authorization. |
| Supabase Auth | Manages user identity, login, sessions, and tokens. |

---

## 🎯 Project Objectives

The project aims to demonstrate:

1. Implementing user registration and login using Supabase Auth.
2. Managing authenticated user sessions.
3. Understanding JWT-based authentication.
4. Integrating Supabase authentication with Spring Boot.
5. Validating Supabase JWT access tokens using Spring Security.
6. Extracting authenticated user information from JWT claims.
7. Implementing Role-Based Access Control.
8. Creating protected frontend routes using React Router.
9. Securing REST APIs based on user roles.
10. Implementing user-specific data access and isolation.
11. Understanding the difference between frontend route protection and backend authorization.

---

## ✨ Key Features

### 1. User Authentication

Supabase Auth handles the authentication process.

- User registration using email and password.
- User login using email and password.
- Session management.
- JWT access-token generation.
- Logout functionality.
- Authentication state management.

### 2. Role-Based Access Control (RBAC)

The application supports two distinct roles.

- STUDENT
- TEACHER

Each role has separate dashboard access and permissions.

The backend uses Spring Security to enforce these permissions.

### 3. JWT-Based Security

Supabase generates a signed JWT after successful authentication.

The React frontend attaches this token to requests sent to Spring Boot.

Spring Security validates the token before allowing access to protected endpoints.

### 4. Student Dashboard

Students can:

- View their dashboard.
- Submit personal academic information.
- Submit their marks.
- View their submitted academic record.
- Access only their own academic information.

Students cannot modify or delete their submitted records through the student interface.

### 5. Teacher Dashboard

Teachers can:

- View all student academic records.
- Add student records manually.
- Update existing student records.
- Delete student records.
- Manage academic information through a dedicated dashboard.

### 6. Protected Routes

React Router protects role-specific frontend routes.

- Unauthenticated users are redirected to login.
- Students cannot access teacher dashboard pages.
- Teachers cannot access student dashboard pages.

**Important:** Frontend route protection improves navigation and user experience. Actual security is enforced independently by Spring Security on the backend.

---

## 🛠 Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development environment |
| Java | Backend programming language |
| Spring Boot | REST API development |
| Spring Web | RESTful services |
| Spring Security | Authentication and authorization enforcement |
| Spring Data JPA | Database interaction |
| OAuth2 Resource Server | JWT validation |
| Supabase Auth | User authentication |
| Supabase PostgreSQL | Relational database |
| React Router | Frontend routing |
| Axios | HTTP communication |
| Lombok | Java boilerplate reduction |
| PostgreSQL Driver | Database connectivity |
| Postman | API testing |

### Development Tools

- Visual Studio Code
- IntelliJ IDEA
- Supabase Dashboard
- Postman
- Git and GitHub

---

## 🏗 System Architecture

The application follows a separated frontend, authentication, backend, and database architecture.

### Architecture Overview

```text
              USER
                |
                v
       REACT FRONTEND (Vite)
                |
        +-------+-------+
        |               |
        v               v
   Supabase Auth    Spring Boot API
        |               |
        |               v
        |         Spring Security
        |               |
        |         JWT Validation
        |               |
        |         Role Verification
        |               |
        |               v
        |         Business Logic
        |               |
        |               v
        +------> PostgreSQL
                      |
               Profiles Table
                      |
               Student Records
```

### Component Responsibilities

**React Frontend**

- Provides the user interface.
- Handles registration and login interactions.
- Maintains authentication state.
- Manages protected routes.
- Sends JWT access tokens with backend requests.

**Supabase Auth**

- Registers users.
- Authenticates users.
- Manages sessions.
- Generates signed JWT access tokens.

**Spring Boot Backend**

- Receives REST API requests.
- Validates JWT access tokens.
- Extracts authenticated user information.
- Determines user roles.
- Enforces access permissions.
- Handles academic business logic.

**Supabase PostgreSQL**

- Stores user profile information.
- Stores application roles.
- Stores student academic records.
- Maintains relationships between users and records.

---

## 🔐 Authentication & Authorization Flow

Understanding this flow is one of the most important learning objectives of the project.

### Step 1: User Registration

1. The user opens the React application.
2. The user selects Student or Teacher.
3. The user enters an email and password.
4. React sends the registration request to Supabase Auth.
5. Supabase creates the authentication user.
6. A PostgreSQL trigger creates the corresponding profile record.

### Step 2: User Login

1. The user enters their credentials.
2. React calls Supabase `signInWithPassword()`.
3. Supabase validates the credentials.
4. Supabase returns an authentication session.
5. The session contains a signed JWT access token.
6. The frontend retrieves the authenticated user's role.

### Step 3: API Request

When the frontend requests protected backend resources, it attaches the access token.

Example:

```http
GET /api/student/record HTTP/1.1
Host: localhost:8080
Authorization: Bearer YOUR_SUPABASE_ACCESS_TOKEN
```

### Step 4: Backend JWT Validation

Spring Security:

1. Extracts the Bearer token.
2. Validates the JWT signature.
3. Checks the token's validity and relevant claims.
4. Extracts the authenticated user's UUID from the `sub` claim.
5. Obtains trusted role information.
6. Converts the role into a Spring Security authority.

Example:

```text
STUDENT  -> ROLE_STUDENT
TEACHER  -> ROLE_TEACHER
```

### Step 5: Authorization

Spring Security checks whether the authenticated user has permission to access the requested endpoint.

For example:

- A STUDENT can access `/api/student/record`.
- A STUDENT cannot access `/api/teacher/records`.
- A TEACHER can access `/api/teacher/records`.

If the user does not have the required permission, the backend rejects the request.

---

## 👥 User Roles & Permissions

| Functionality | STUDENT | TEACHER |
|---|:---:|:---:|
| Register | ✅ | ✅* |
| Login | ✅ | ✅ |
| Access Student Dashboard | ✅ | ❌ |
| Access Teacher Dashboard | ❌ | ✅ |
| Submit Own Academic Record | ✅ | ❌ |
| View Own Academic Record | ✅ | ❌ |
| View All Student Records | ❌ | ✅ |
| Add Student Records | ❌ | ✅ |
| Update Student Records | ❌ | ✅ |
| Delete Student Records | ❌ | ✅ |
| Logout | ✅ | ✅ |

*Teacher account registration must be subject to a trusted role-assignment or approval process before teacher privileges are granted.*

---

## 🗄 Database Design

The application uses Supabase PostgreSQL.

Two primary application tables are planned.

### 1. Profiles Table

**Table:** `public.profiles`

Stores additional application information associated with Supabase authentication users.

| Column | Data Type | Description |
|---|---|---|
| id | UUID | Primary key referencing auth.users.id |
| email | VARCHAR | User email address |
| role | VARCHAR | STUDENT or TEACHER |
| created_at | TIMESTAMP | Profile creation timestamp |

**Relationship:**

Every profile belongs to one Supabase Auth user.

A PostgreSQL trigger automatically creates the corresponding profile when a user registers.

### 2. Student Records Table

**Table:** `public.student_records`

Stores academic information submitted by students and managed by teachers.

| Column | Data Type | Description |
|---|---|---|
| id | BIGSERIAL | Primary key |
| student_id | UUID | References profiles.id |
| full_name | VARCHAR | Student's full name |
| roll_number | VARCHAR | Student roll number |
| department | VARCHAR | Academic department |
| marks | JSONB / Subject Columns | Academic marks |
| updated_at | TIMESTAMP | Last update timestamp |

A unique constraint on `student_id` ensures that a student can have only one academic record.

### Database Relationship

```text
        auth.users
             |
             | 1 : 1
             |
             v
       profiles
             |
             | 1 : 0..1
             |
             v
     student_records
```

The authenticated user's UUID connects the Supabase Auth identity with the corresponding academic record.

---

## 🔌 Backend API Endpoints

The following REST endpoints are planned for the Spring Boot backend.

| HTTP Method | Endpoint | Allowed Role | Description |
|---|---|---|---|
| GET | `/api/me` | STUDENT, TEACHER | Get authenticated user information |
| GET | `/api/student/record` | STUDENT | Get own academic record |
| POST | `/api/student/record` | STUDENT | Submit own academic record |
| GET | `/api/teacher/records` | TEACHER | Get all student records |
| POST | `/api/teacher/records` | TEACHER | Add a student record |
| PUT | `/api/teacher/records/{id}` | TEACHER | Update a student record |
| DELETE | `/api/teacher/records/{id}` | TEACHER | Delete a student record |

### Expected HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 OK | Request completed successfully |
| 201 Created | Resource created successfully |
| 400 Bad Request | Invalid request data |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | Insufficient role permissions |
| 404 Not Found | Requested resource does not exist |
| 409 Conflict | Duplicate submission or conflicting data |
| 500 Internal Server Error | Unexpected backend error |

---

## 💻 Frontend Application

The frontend is built using React and Vite.

### Planned Application Pages

| Route | Page | Access |
|---|---|---|
| `/` | Home / Landing Page | Public |
| `/signup` | Registration | Public |
| `/login` | Login | Public |
| `/student/dashboard` | Student Dashboard | STUDENT |
| `/teacher/dashboard` | Teacher Dashboard | TEACHER |

### Important Frontend Components

**Supabase Client**

`src/services/supabaseClient.js`

Initializes the Supabase client using environment variables.

**Axios API Service**

`src/services/api.js`

Creates a reusable Axios instance and attaches the active Supabase JWT access token to backend requests.

**Authentication Context**

`src/context/AuthContext.jsx`

Manages:

- Current authenticated user.
- Authentication session.
- User role.
- Loading state.
- Login and registration methods.
- Logout functionality.
- Authentication state changes.

**Protected Route**

`src/components/ProtectedRoute.jsx`

Checks authentication status and user roles before allowing access to protected frontend pages.

---

## 📁 Project Structure

The intended application organization is:

```text
SupaBaseAuth-Integration/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── supabaseClient.js
│   │   │   └── api.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── TeacherDashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/academicportal/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── service/
│   │       │       ├── repository/
│   │       │       ├── entity/
│   │       │       ├── dto/
│   │       │       └── security/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── PROJECT_IMPLEMENTATION_PLAN.txt
└── README.md
```

*Note: This represents the planned application structure, not a claim that all these directories and source files are currently present in the repository.*

---

## ⚙️ Environment Configuration

The project requires separate configuration for the React frontend and Spring Boot backend.

### Frontend Environment Variables

Create a `.env` file inside the frontend directory.

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co

VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key

VITE_API_BASE_URL=http://localhost:8080/api
```

**Where to get these values:**

1. Open your Supabase Dashboard.
2. Select your project.
3. Navigate to the API settings.
4. Copy your Project URL and appropriate public client key.

### Backend Configuration

The Spring Boot application requires:

- Supabase PostgreSQL connection details.
- JWT verification configuration.
- Supabase JWT verification/JWKS configuration.
- Server port configuration.

Keep database credentials and other private configuration in environment variables rather than committing them to GitHub.

---

## 🚀 Getting Started

The following steps describe the intended development setup.

### Prerequisites

Install the following tools:

- [Java JDK](https://www.oracle.com/java/technologies/downloads/)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Supabase Account](https://supabase.com/)
- [Postman](https://www.postman.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/rishavscripts/SupaBaseAuth-Integration.git

cd SupaBaseAuth-Integration
```

### Step 2: Configure Supabase

1. Create a new Supabase project.
2. Enable Email Authentication.
3. Configure the required authentication settings.
4. Create the `profiles` table.
5. Create the `student_records` table.
6. Configure the profile creation trigger.
7. Establish a trusted process for assigning teacher privileges.

### Step 3: Configure the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the `.env` file with the Supabase credentials and backend API URL.

Start the frontend:

```bash
npm run dev
```

The default Vite development address is:

```text
http://localhost:5173
```

### Step 4: Configure the Backend

Open the backend project in IntelliJ IDEA.

Configure the PostgreSQL connection and Supabase JWT verification settings.

Ensure the required Spring Boot dependencies are installed:

- Spring Web
- Spring Security
- Spring Data JPA
- OAuth2 Resource Server
- PostgreSQL Driver
- Lombok

Run the Spring Boot application.

Default development address:

```text
http://localhost:8080
```

### Step 5: Test the Integration

1. Register a Student account.
2. Register or provision a Teacher account using the trusted role-assignment process.
3. Log in using Supabase Auth.
4. Verify that the frontend receives the authenticated session.
5. Send a protected API request with the Bearer token.
6. Verify JWT validation in Spring Boot.
7. Test Student and Teacher permissions.
8. Verify that students cannot access other students' academic records.

---

## 🛡 Security Implementation

Security is one of the most important aspects of this project.

The application follows a separation-of-responsibilities approach.

| Layer | Security Responsibility |
|---|---|
| Supabase | User authentication and JWT issuance |
| React | Session management and protected navigation |
| Spring Security | JWT validation and role-based authorization |
| PostgreSQL | Data relationships, constraints and access policies |

### Important Security Principles

**1. Backend Authorization Is Mandatory**

Frontend route protection alone is not sufficient. Every protected backend endpoint must independently validate the user's permissions.

**2. JWT Validation**

Only valid Supabase-issued access tokens should be accepted by protected APIs.

**3. Student Data Isolation**

The backend must obtain the authenticated user's UUID from the verified JWT context instead of trusting a student ID supplied by the frontend.

**4. Trusted Role Assignment**

A user must not be able to grant themselves Teacher privileges simply by changing registration metadata.

Teacher privileges must be assigned through a trusted process.

**5. Secure Environment Variables**

Never commit the following credentials to GitHub:

- Supabase service-role key.
- Database passwords.
- JWT signing secrets.
- Private API credentials.

The frontend must only contain appropriate public Supabase client configuration.

---

## 🧪 Testing

Testing is necessary to verify that authentication and authorization work independently.

### Authentication Testing

- Verify successful registration.
- Verify successful login.
- Verify invalid credentials.
- Verify logout.
- Verify session persistence.
- Verify token expiration and refresh behaviour.

### Authorization Testing

- Verify Student dashboard access.
- Verify Teacher dashboard access.
- Verify role mismatch rejection.
- Verify unauthorized API requests.
- Verify forbidden API requests.

### Data Isolation Testing

- Verify students can access only their own records.
- Verify students cannot submit duplicate records.
- Verify students cannot modify another student's data.
- Verify teachers can manage student records.

### API Testing

Use Postman to test the Spring Boot REST endpoints independently of the React frontend.

This ensures that frontend restrictions cannot be used to bypass backend authorization.

---

## 📚 Learning Outcomes

By developing this project, developers can gain practical experience with:

- Supabase Authentication integration.
- JWT-based authentication.
- OAuth2 Resource Server concepts.
- Spring Security configuration.
- Role-Based Access Control.
- React Context API.
- Protected frontend routes.
- Axios interceptors.
- REST API development.
- PostgreSQL relationships.
- Secure user-specific data access.
- Full-stack application integration.

This project is particularly useful for developers learning Java Spring Boot backend development and modern authentication architecture.

---

## 🔮 Future Improvements

Potential improvements beyond the initial implementation include:

- Admin role and administration dashboard.
- Teacher invitation and approval workflow.
- More detailed academic record management.
- Improved database migrations.
- Automated backend and frontend testing.
- Production deployment.
- Enhanced audit logging.
- More granular permissions.

These are possible extensions and are not part of the initial implementation scope.

---

## 👨‍💻 Author

**Rishav Mitra**

B.Tech Computer Science & Engineering

Interested in Backend Development, Java, Spring Boot, Full-Stack Development and Database Technologies.

- GitHub: [@rishavscripts](https://github.com/rishavscripts)

### Repository

[**SupaBaseAuth-Integration**](https://github.com/rishavscripts/SupaBaseAuth-Integration)

---

## ⭐ Support

If you find this project useful for understanding Supabase Authentication, Spring Boot Security, or Role-Based Access Control, consider giving the repository a star!

**Happy Coding! 🚀**
