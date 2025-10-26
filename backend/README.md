# Todo List Backend API

A RESTful API for managing todo tasks built with Node.js, Express, and MongoDB.

## Features

- ✅ CRUD operations for tasks
- ✅ Task completion status management
- ✅ Task statistics
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ Security headers

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `DELETE /api/tasks/:id` - Delete a task

### Statistics
- `GET /api/tasks/stats` - Get task statistics

### Health Check
- `GET /api/health` - API health status

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the production server:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todo-list
FRONTEND_URL=http://localhost:5173
```

## Database

Make sure MongoDB is running on your system. The application will connect to `mongodb://localhost:27017/todo-list` by default.

## API Usage Examples

### Create a task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Complete the Node.js tutorial"}'
```

### Get all tasks
```bash
curl http://localhost:5000/api/tasks
```

### Update a task
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated title", "completed": true}'
```

### Delete a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```
