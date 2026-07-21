# BIILE E-LEARNING PORTAL

A comprehensive, scalable e-learning platform built with React, Node.js, and PostgreSQL.

## 🎯 Features

### For Students
- User authentication with JWT
- Browse and enroll in courses
- Watch video lessons
- Complete assignments and quizzes
- Track learning progress
- Participate in discussions
- Download course materials

### For Teachers
- Create and manage courses
- Upload lessons and resources
- Create assignments and quizzes
- Grade submissions
- Track student progress
- Analytics and reporting

### Platform Features
- Scalable to 1000+ users
- Real-time notifications
- Discussion forums
- Payment integration ready
- Mobile responsive
- Docker deployment ready

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express, PostgreSQL, JWT
- **DevOps**: Docker, Docker Compose
- **Testing**: Jest, React Testing Library

## 📁 Project Structure

```
BIILE-E-LEARNING-/
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── config/       # Database & environment config
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── services/     # Business logic
│   │   └── app.ts        # Express app
│   ├── migrations/       # Database migrations
│   ├── Dockerfile
│   └── package.json
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API client
│   │   ├── store/        # Redux store
│   │   ├── hooks/        # Custom hooks
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml    # Docker services
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/abdulkadirahmedbiile-sys/BIILE-E-LEARNING-.git
cd BIILE-E-LEARNING-

# Start all services
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
```

## 📚 API Documentation

See [Backend README](./backend/README.md) for detailed API documentation.

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication:
- Register a new account
- Login to get access token
- Use token in Authorization header: `Bearer <token>`

## 📊 Database Schema

See [Database Schema](./backend/DATABASE.md) for details.

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 📦 Deployment

### Heroku

```bash
git push heroku main
```

### AWS / DigitalOcean

Use Docker images or deploy directly.

## 🤝 Contributing

Contributions are welcome! Please:
1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📄 License

MIT License

## 👨‍💻 Authors

- Abdul Kadir Ahmed Biile

## 📧 Support

For issues and questions, please create an issue on GitHub.
