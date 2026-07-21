# BIILE E-Learning Frontend

React frontend for the BIILE E-Learning platform.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Features

- User authentication (Login/Register)
- Dashboard with course overview
- Browse and search courses
- Enroll in courses
- View course details and lessons
- Track progress
- User profile management
- Responsive design

## Project Structure

```
src/
├── components/      # Reusable components
├── pages/           # Page components
├── services/        # API client
├── types/           # TypeScript types
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Redux Toolkit
