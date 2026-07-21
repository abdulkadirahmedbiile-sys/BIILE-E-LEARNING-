# BIILE E-Learning Backend API

Node.js Express backend for the BIILE E-Learning platform.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/biile_elearning
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (teacher)
- `PUT /api/courses/:id` - Update course (teacher)
- `POST /api/courses/:courseId/enroll` - Enroll in course

### Lessons
- `GET /api/lessons/course/:courseId` - Get lessons
- `POST /api/lessons` - Create lesson (teacher)
- `POST /api/lessons/:lessonId/complete` - Mark complete

### Assignments
- `GET /api/assignments/course/:courseId` - Get assignments
- `POST /api/assignments` - Create assignment (teacher)
- `POST /api/assignments/:assignmentId/submit` - Submit
- `PUT /api/assignments/submission/:submissionId/grade` - Grade

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/courses` - Get enrolled courses
