# FitAI - Adaptive Fitness Intelligence Platform

A full-stack adaptive fitness planning and coaching platform built with React, Express, and MongoDB. The platform intelligently generates personalized workout and diet plans, tracks adherence, analyzes behavioral patterns, and dynamically adjusts recommendations using a closed-loop adaptive engine.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Available Features](#available-features)
3. [Tech Stack](#tech-stack)
4. [Missing/Required Features](#missingrequired-features)
5. [Installation & Setup](#installation--setup)
6. [API Endpoints](#api-endpoints)

---

## 🎯 Project Overview

**FitAI** is a web-based Adaptive Fitness Intelligence System that operates on a closed-loop model:

> **Profile → Plan → Execute → Track → Analyze → Adjust → Coach → Repeat**

It is not a static template generator.  
It is a habit-driven adaptive system designed to build sustainable fitness habits.

### 👤 User Roles

- **User (Primary Role)**  
  - Create health profile  
  - Generate workout & diet plans  
  - Track progress  
  - View analytics  
  - Receive adaptive coaching  

- **Admin (Secondary Role)**  
  - Manage templates  
  - View analytics  
  - Monitor platform usage  

**Base URL**: `http://localhost:5000` (Backend) | `http://localhost:5173` (Frontend)

---

## ✨ Available Features

### 🔐 Authentication & Security

| Feature | Details | Status |
|---------|---------|--------|
| User Registration | Email/password registration | ✅ Working |
| User Login | JWT-based login system | ✅ Working |
| Password Hashing | BCrypt/Argon2 hashing | ✅ Working |
| Session Management | Secure JWT session handling | ✅ Working |
| Session Timeout | Automatic expiration | ⏳ Planned |
| Medical Disclaimer | Displayed on plan pages | ✅ Working |
| Calorie Safety Floor | Enforces minimum calorie intake | ✅ Working |

---

### 🧬 Health & Goal Profile Setup

| Feature | Details | Status |
|---------|---------|--------|
| Health Inputs | Age, sex, height, weight, activity level | ✅ Working |
| Goal Selection | Weight Loss, Muscle Gain, Recomposition, Maintain, Endurance | ✅ Working |
| BMI Calculation | Automatic BMI calculation | ✅ Working |
| Maintenance Calories | Mifflin-St Jeor formula | ✅ Working |
| Calorie Target Suggestion | Smart target based on goal | ✅ Working |
| Calorie Floor Enforcement | Women: 1200–1400 kcal / Men: 1500–1800 kcal | ✅ Working |

---

### 🏋️ Weekly Workout Plan Generator

| Feature | Details | Status |
|---------|---------|--------|
| 7-Day Plan Structure | Structured weekly split | ✅ Working |
| Exercise Allocation | Based on goal & experience | ✅ Working |
| Sets × Reps | Defined volume structure | ✅ Working |
| Rest Intervals | Smart rest timing | ✅ Working |
| Progressive Structure | Beginner → Intermediate scaling | ✅ Working |
| Form Guidance | Basic instruction guidance | ⏳ Planned |

---

### 🥗 Weekly Diet Plan Generator

| Feature | Details | Status |
|---------|---------|--------|
| Macro Template System | Protein/Carb/Fat splits | ✅ Working |
| Calorie Distribution | Meal-wise calorie allocation | ✅ Working |
| Goal-based Macros | Loss: 40/30/30, Gain: 30/50/20 | ✅ Working |
| Daily Total Calculation | Auto-calculated totals | ✅ Working |

---

### 📊 Progress Tracking Module

| Feature | Details | Status |
|---------|---------|--------|
| Weekly Weight Logging | Track body weight | ✅ Working |
| Workout Completion Logging | Completed/Partial/Skipped | ✅ Working |
| Diet Adherence Logging | Followed/Mostly/Deviated | ✅ Working |
| Weight Trend Graph | 4–12 week trend | ✅ Working |
| Adherence % Tracking | Workout & diet stats | ✅ Working |

---

### 📏 Body Measurement Tracking

| Feature | Details | Status |
|---------|---------|--------|
| Measurement Tracking | Waist, chest, hips, arms, thighs | ✅ Working |
| Monthly Comparison | Change over time | ✅ Working |
| Line Graph Visualization | Measurement trend graph | ✅ Working |

---

### 🔥 Habit Intelligence Engine

| Feature | Details | Status |
|---------|---------|--------|
| Habit Score Formula | (Workout × 0.60) + (Diet × 0.40) | ✅ Working |
| Weekly Habit Score | Score display (0–100) | ✅ Working |
| Monthly Average | Monthly performance | ✅ Working |
| Streak Tracking | Current streak | ✅ Working |
| Drop-off Detection | 3 missed workouts / 14-day inactivity | ✅ Working |
| Adaptive Suggestion | Lighter plan or reset suggestion | ⏳ In Progress |

---

### ⚡ Energy & Recovery Intelligence

| Feature | Details | Status |
|---------|---------|--------|
| Daily Energy Check-in | Energized → Very Tired | ✅ Working |
| Auto Intensity Adjustment | Reduce intensity when fatigued | ✅ Working |
| Forced Recovery Day | Trigger after 3 fatigue flags | ⏳ Planned |

---

### 📈 Progressive Overload Engine

| Feature | Details | Status |
|---------|---------|--------|
| Volume Adjustment | +5–10% if ≥90% completion | ✅ Working |
| Intensity Reduction | If <50% completion | ✅ Working |
| Goal-specific Adjustment | Gain → Load increase, Loss → Cardio increase | ✅ Working |

---

### 🎯 Goal Timeline Forecast Engine

| Feature | Details | Status |
|---------|---------|--------|
| Forecast Formula | Based on avg weekly weight change | ✅ Working |
| Estimated Completion Date | Dynamic calculation | ✅ Working |
| Confidence Band | Range-based estimation | ⏳ Planned |

---

### 🤖 AI Chat Fitness Assistant

| Feature | Details | Status |
|---------|---------|--------|
| Rule-Based Coaching | Based on logs & adherence | ✅ Working |
| Data-backed Explanations | Insight-driven responses | ✅ Working |
| Actionable Suggestions | 1–2 improvement steps | ✅ Working |
| LLM Upgrade (Future) | Contextual AI coaching | ⏳ Future Enhancement |

---

## 📦 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Chart.js / Recharts
- React Context API

### Backend
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- BCrypt
- Nodemailer (if required)
- Morgan
- CORS
- Dotenv

---

## ⚠️ Missing/Required Features

### 💳 Payment & Premium Features
- [ ] Subscription model (Premium coaching)
- [ ] Payment gateway integration
- [ ] Premium analytics unlock

### 📱 Notifications
- [ ] Email reminders
- [ ] Push notifications
- [ ] Weekly summary email

### 📊 Advanced Analytics
- [ ] Advanced transformation analytics
- [ ] AI pattern detection
- [ ] Habit risk probability score

### 🧠 AI Enhancements
- [ ] LLM-based contextual assistant
- [ ] Behavior prediction model
- [ ] Smart macro rebalancing

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB running locally or cloud

### Backend Setup

```bash
cd backend
npm install

# Create .env file
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication Routes (`/auth`)
```
POST   /auth/register
POST   /auth/login
GET    /auth/logout
```

### Profile Routes (`/profile`)
```
POST   /profile/create
GET    /profile/get
PUT    /profile/update
```

### Workout Routes (`/workout`)
```
GET    /workout/generate
GET    /workout/current
POST   /workout/log
```

### Diet Routes (`/diet`)
```
GET    /diet/generate
POST   /diet/log
```

### Progress Routes (`/progress`)
```
POST   /progress/weight
GET    /progress/weight-trend
POST   /progress/measurement
GET    /progress/measurement-trend
```

### Habit & Analytics (`/analytics`)
```
GET    /analytics/habit-score
GET    /analytics/forecast
```

### AI Assistant (`/ai`)
```
POST   /ai/chat
```

---

## 📋 Database Models

### User Model
- name, email, password
- role (user/admin)
- createdAt

### HealthProfile Model
- age, sex, height, weight
- activityLevel, experienceLevel
- goal
- bmi, maintenanceCalories, targetCalories

### WorkoutPlan Model
- userId
- weeklyStructure
- progressionLevel

### DietPlan Model
- userId
- macroSplit
- mealDistribution

### Progress Model
- weightLogs
- workoutAdherence
- dietAdherence
- fatigueLogs

### Measurement Model
- waist, chest, hips, arms, thighs
- date

---

## 🎨 Project Structure

```
FitAI/
├── frontend/
├── backend/
├── docs/
│   ├── problem-statement.pdf
│   ├── architecture-diagram.png
│   ├── api-documentation.md
│   └── presentation.pptx
└── README.md
```

---

## 🤝 Contributing

1. Create feature branch  
2. Follow commit best practices  
3. Write clear commit messages  
4. Merge into main after review  
5. Update documentation  

---

## 📝 License

MIT License – Free to use

---

## 👨‍💻 Author

Team FitAI

---

## 📞 Support

Contact through the platform help section or official communication channel.

---

**Last Updated**: February 19, 2026  
**Version**: 1.0.0 (Core Adaptive Engine Implemented)

---

### Summary of Implementation Status

| Category | Total Features | Implemented | Missing | Status |
|----------|---|---|---|---|
| Authentication | 6 | 5 | 1 | ✅ Almost Complete |
| Profile Engine | 6 | 6 | 0 | ✅ Complete |
| Workout Engine | 6 | 5 | 1 | ✅ Almost Complete |
| Diet Engine | 4 | 4 | 0 | ✅ Complete |
| Progress Tracking | 6 | 6 | 0 | ✅ Complete |
| Habit Intelligence | 6 | 5 | 1 | ⏳ Improving |
| AI Assistant | 4 | 3 | 1 | ⏳ Expanding |
| Premium Features | 4 | 0 | 4 | ⏳ Not Started |
| | **42** | **34** | **8** | **81% Complete** |
