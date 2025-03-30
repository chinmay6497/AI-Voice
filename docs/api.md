# API Documentation

## Authentication API

### Login
```typescript
POST /api/auth/login
```

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

Response:
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "email": "string",
    "name": "string",
    "role": "string"
  }
}
```

### Register
```typescript
POST /api/auth/register
```

Request body:
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

Response:
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "email": "string",
    "name": "string",
    "role": "string"
  }
}
```

### Get Profile
```typescript
GET /api/auth/profile
```

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "id": "number",
  "email": "string",
  "name": "string",
  "role": "string"
}
```

## Interview API

### Get Topics
```typescript
GET /api/interviews/topics
```

Response:
```json
[
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "difficulty": "string"
  }
]
```

### Start Interview
```typescript
POST /api/interviews/start
```

Request body:
```json
{
  "topicId": "number"
}
```

Response:
```json
{
  "id": "number",
  "topicId": "number",
  "status": "string"
}
```

### Submit Answer
```typescript
POST /api/interviews/:interviewId/answer
```

Request body:
```json
{
  "answer": "string"
}
```

Response:
```json
{
  "feedback": "string",
  "score": "number"
}
```

## Learning API

### Get Topics
```typescript
GET /api/learning/topics
```

Response:
```json
[
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "difficulty": "string",
    "modules": [
      {
        "id": "number",
        "title": "string",
        "content": "string"
      }
    ]
  }
]
```

### Get Progress
```typescript
GET /api/learning/progress
```

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "completedModules": "number",
  "totalModules": "number",
  "achievements": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "unlocked": "boolean"
    }
  ]
}
```

### Update Progress
```typescript
PUT /api/learning/topics/:topicId/progress
```

Headers:
```
Authorization: Bearer <token>
```

Request body:
```json
{
  "progress": "number"
}
```

Response:
```json
{
  "progress": "number",
  "completed": "boolean"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "string",
  "errors": {
    "field": ["string"]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## WebSocket Events

### Interview Events
- `interview:start` - Interview session started
- `interview:question` - New question received
- `interview:feedback` - Real-time feedback
- `interview:end` - Interview session ended

### Learning Events
- `learning:progress` - Progress update
- `learning:achievement` - Achievement unlocked
- `learning:module_complete` - Module completed

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user
- Rate limit headers included in response:
  ```
  X-RateLimit-Limit: number
  X-RateLimit-Remaining: number
  X-RateLimit-Reset: timestamp
  ``` 