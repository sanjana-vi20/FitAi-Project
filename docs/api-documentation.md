# 📡 FitAI API Documentation

> Adaptive Fitness Intelligence Platform – Backend API Reference  
> Version: 1.0.0  
> Base URL: http://localhost:5000  

---

# 📑 Table of Contents

1. API Conventions  
2. Authentication Flow  
3. Standard Response Structure  
4. Auth Routes  
5. User Routes  
6. Admin Routes  
7. Service Routes  
8. Data Models  
9. Middleware & Security  
10. HTTP Status Codes  

---

# 1️⃣ API Conventions

## Base URL
```

[http://localhost:5000](http://localhost:5000)

```

## Headers
All requests must include:

```

Content-Type: application/json

````

Protected routes require JWT (stored in HTTP-only cookies).

---

# 2️⃣ Authentication Flow

1. User registers → JWT issued in cookie  
2. User logs in → JWT refreshed  
3. Middleware verifies JWT for protected routes  

Authentication is handled using:
- JSON Web Tokens (JWT)
- HTTP-only cookies
- BCrypt password hashing

---

# 3️⃣ Standard API Response Structure

## ✅ Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
````

## ❌ Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

---

# 🔐 AUTH ROUTES

## 1️⃣ Register User

### POST `/auth/register`

### Request Body

```json
{
  "fullName": "Tanishk Sarathe",
  "email": "tanishk@example.com",
  "password": "StrongPassword123"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "65f1a123abc456"
  }
}
```

---

## 2️⃣ Login User

### POST `/auth/login`

### Request Body

```json
{
  "email": "tanishk@example.com",
  "password": "StrongPassword123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1a123abc456",
      "fullName": "Tanishk Sarathe",
      "role": "user"
    }
  }
}
```

---

## 3️⃣ Logout

### GET `/auth/logout`

Clears JWT cookie and logs out user.

---

# 👤 USER ROUTES (Protected)

---

## 1️⃣ Create / Update Health Profile

### PUT `/user/user-profile/:id`

### Request Body

```json
{
  "age": 22,
  "gender": "male",
  "height": 175,
  "weight": 72,
  "activityLevel": "moderate",
  "experienceLevel": "beginner",
  "activities": "muscle-gain"
}
```

### Response

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "bmi": 23.5,
    "maintenanceCalories": 2500,
    "targetCalories": 2800
  }
}
```

---

## 2️⃣ Get Adaptive Workout Plan

### GET `/user/get-workouts`

### Response

```json
{
  "success": true,
  "data": {
    "planId": "plan123",
    "weekNumber": 1,
    "goal": "muscle-gain",
    "weekTemplate": [
      {
        "day": "Monday",
        "exercises": [
          {
            "exerciseName": "Bench Press",
            "sets": 4,
            "reps": 8,
            "duration": 30
          }
        ]
      }
    ]
  }
}
```

---

## 3️⃣ Log Workout Session

### POST `/user/workout-log`

### Request Body

```json
{
  "planId": "plan123",
  "dayIndex": 1,
  "completionPercentage": 90,
  "durationMinutes": 60,
  "intensityLevel": 4,
  "dietDetails": {
    "estimatedCaloriesConsumed": 2600,
    "followed": true,
    "proteinHit": true
  },
  "recoveryDetails": {
    "energyLevel": "normal",
    "muscleSoreness": 5,
    "sleepHours": 7
  }
}
```

---

## 4️⃣ Save Dietary Preferences

### POST `/user/diet-preference`

```json
{
  "deficitOrSurplusLevel": "surplus",
  "mealFrequency": 4,
  "dietaryPreference": "vegetarian",
  "allergies": ["Peanuts"],
  "heavyMealTiming": "lunch",
  "flexibilityMode": "no-free-day"
}
```

---

## 5️⃣ Get Diet Chart

### GET `/user/get-diet-chart`

Returns AI-generated meal plan based on user preferences.

---

# 👨‍💼 ADMIN ROUTES (Admin Only)

---

## 1️⃣ Post Exercise

### POST `/admin/post-exercises`

```json
{
  "exerciseName": "Squats",
  "exerciseType": "strength",
  "activities": ["muscle-gain"],
  "experienceLevel": ["beginner"],
  "activityLevel": ["moderate"],
  "sets": 4,
  "reps": 10,
  "duration": 20
}
```

---

# 🤖 SERVICE ROUTES

---

## 1️⃣ AI Chatbot Response

### POST `/service/chatbotresponse`

### Request Body

```json
{
  "message": "I feel very tired after workouts"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "reply": "Based on your recent intensity levels and sleep data, you may need a recovery day..."
  }
}
```

---

# 📊 DATA MODELS OVERVIEW

---

## User Model

```js
{
  fullName: String,
  email: String,
  password: String,
  role: "user" | "admin",
  photo: {
    url: String,
    publicID: String
  }
}
```

---

## Profile Model

```js
{
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  activityLevel: String,
  experienceLevel: String,
  activities: String,
  bmi: Number,
  maintainanceCal: Number,
  target: {
    weight: Number,
    calories: Number
  }
}
```

---

## WorkoutSession Model

```js
{
  completionPercentage: Number,
  durationMinutes: Number,
  intensityLevel: Number,
  dietDetails: Object,
  recoveryDetails: Object
}
```

---

# 🔐 Middleware & Security

| Middleware   | Purpose                               |
| ------------ | ------------------------------------- |
| protect      | Verifies JWT authentication           |
| adminProtect | Restricts route access to admin users |

Security Mechanisms:

* BCrypt password hashing
* JWT authentication
* HTTP-only cookies
* Role-based access control
* CORS protection

---

# 📌 HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

# 🚀 Future Endpoints (Planned)

* GET `/analytics/weight-trend`
* GET `/analytics/habit-score`
* GET `/analytics/workout-adherence`
* POST `/notifications/reminders`
* GET `/admin/users`
* GET `/admin/analytics`

---

# 📄 License

Free to use

---

**Last Updated:** February 2026
**Platform:** FitAI – Adaptive Fitness Intelligence Engine
