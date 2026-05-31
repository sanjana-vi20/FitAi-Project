# 🏋️‍♀️ FitAI – Adaptive Fitness Intelligence Platform

> A Full-Stack AI-Powered Habit-Based Fitness Planning & Coaching System

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Team Members](#team-members)
3. [Available Features](#available-features)
4. [Tech Stack](#tech-stack)
5. [Missing/Required Features](#missingrequired-features)
6. [Installation & Setup](#installation--setup)
7. [API Endpoints](#api-endpoints)
8. [Database Models](#database-models)
9. [Project Structure](#project-structure)

---

## 🎯 Project Overview

**FitAI** is a web-based adaptive fitness intelligence platform that generates personalized workout and diet plans, tracks adherence, analyzes behavioral patterns, and dynamically adjusts recommendations using a closed-loop adaptive engine.

### 🔁 Closed Loop Model

> **Profile → Plan → Execute → Track → Analyze → Adjust → Coach → Repeat**

FitAI is not a static workout template generator.
It is a habit-driven adaptive fitness intelligence system that evolves with the user.

### 🎯 Problem Statement

Many fitness apps generate static plans that fail to adapt to:
- User fatigue and recovery patterns
- Behavioral drop-offs and consistency
- Goal progress and realistic timelines
- Individual dietary preferences and allergies

This leads to overtraining, early burnout, unrealistic calorie targets, and poor habit formation.

### ✅ FitAI Solves This By:
- Generating safe, calorie-controlled adaptive plans
- Tracking habit consistency with a behavioral scoring engine
- Detecting drop-off risk before abandonment occurs
- Adjusting intensity dynamically based on energy and performance data
- Providing AI-powered, data-backed explainable coaching

**Base URL**: `http://localhost:5000` (Backend) | `http://localhost:5173` (Frontend)

---

## 👥 Team Members & Roles

| Name | Role |
|------|------|
| **Tanishk Sarathe** | Team Leader · Full Stack Developer (Frontend + Backend + MERN) |
| **Sanjana Vishwakarma** | Full Stack Developer · API Design · UI/UX |
| **Yugant Nath** | Frontend Developer · UI/UX |
| **Aryan Sarathe** | Learner · Frontend Contributor |

---

## ✨ Available Features

### 🔐 Authentication & Security

| Feature | Details | Status |
|---------|---------|--------|
| **User Registration** | Register with full name, email, and password | ✅ Working |
| **User Login** | Secure JWT-based authentication | ✅ Working |
| **User Logout** | Clear session and token | ✅ Working |
| **Password Hashing** | BCrypt with salt rounds | ✅ Working |
| **JWT Token Management** | Secure token generation and validation | ✅ Working |
| **Role-Based Access Control** | User and Admin roles with middleware protection | ✅ Working |
| **Calorie Safety Floor** | Women: 1200–1400 kcal / Men: 1500–1800 kcal | ✅ Working |
| **Profile Photo Upload** | Cloudinary-based image storage | ✅ Working |

**Endpoints**:
- `POST /auth/register` – Register new user
- `POST /auth/login` – Login user
- `GET /auth/logout` – Logout user

---

### 🧬 Health & Goal Profile Setup

| Feature | Details | Status |
|---------|---------|--------|
| **Health Profile Creation** | Age, gender, height, weight, activity & experience level | ✅ Working |
| **Goal Selection** | Weight Loss, Muscle Gain, Height Gain, Weight Gain, Stay Fit | ✅ Working |
| **BMI Calculation** | Auto-calculated on profile setup | ✅ Working |
| **Maintenance Calories** | Mifflin-St Jeor Formula engine | ✅ Working |
| **Target Calorie Setting** | Smart calorie target based on goal | ✅ Working |
| **Activity Level Mapping** | Light, Moderate, Extreme | ✅ Working |
| **Experience Level** | Beginner / Intermediate profiling | ✅ Working |
| **Profile Update** | Edit profile details anytime | ✅ Working |

**Endpoints**:
- `PUT /user/user-profile/:id` – Create or update health & goal profile

---

### 🏋️ Workout Plan & Exercise System

| Feature | Details | Status |
|---------|---------|--------|
| **Adaptive Workout Generator** | Plans generated based on goal, activity, and experience | ✅ Working |
| **7-Day Plan Structure** | Structured weekly workout split | ✅ Working |
| **Exercise Database (Admin-Seeded)** | Filterable by goal, activity level, and experience | ✅ Working |
| **Sets × Reps Definition** | Volume structure per exercise | ✅ Working |
| **Exercise Type Categorization** | Strength, Cardio, Mobility, etc. | ✅ Working |
| **Duration Tracking** | Per-exercise duration in minutes | ✅ Working |
| **Workout Session Logging** | Log daily workout completion with detailed metrics | ✅ Working |
| **Completion Percentage Tracking** | Track how much of a session was completed | ✅ Working |
| **Intensity Level Logging** | Rate session intensity (0–5 scale) | ✅ Working |
| **Exercise-Level Logging** | Sets, reps completed, weight used, rest taken | ✅ Working |
| **Admin: Post Exercises** | Admin can seed exercises to the database | ✅ Working |

**Endpoints**:
- `GET /user/get-workouts` – Get workout plans for current user
- `POST /user/workout-log` – Log a completed workout session
- `POST /admin/post-exercises` – Admin: add exercises to database

---

### 🥗 Diet & Nutrition System

| Feature | Details | Status |
|---------|---------|--------|
| **Dietary Preference Setup** | Vegetarian, Non-Vegetarian, Vegan, Eggetarian | ✅ Working |
| **Allergy Management** | Peanuts, Dairy, Gluten, Soy, Shellfish, Eggs, Tree Nuts | ✅ Working |
| **Meal Frequency Setting** | Number of meals per day | ✅ Working |
| **Deficit / Surplus Mode** | Goal-based calorie strategy | ✅ Working |
| **Heavy Meal Timing** | Set peak meal timing (breakfast, lunch, dinner, etc.) | ✅ Working |
| **Flexibility Mode** | No-Free-Day or Free-Sunday schedule | ✅ Working |
| **Diet Chart Generation** | AI-backed meal plan generation | ✅ Working |
| **Macro Calculation Engine** | Protein / Carbs / Fat split by goal | ⏳ In Progress |

**Endpoints**:
- `POST /user/diet-preference` – Save dietary preferences
- `GET /user/get-diet-chart` – Retrieve generated diet plan

---

### 🔥 Habit Intelligence & Adaptive Engine

| Feature | Details | Status |
|---------|---------|--------|
| **Habit Score Formula** | `(Workout Adherence × 0.60) + (Diet Adherence × 0.40)` | ✅ Working |
| **Weekly Habit Score Display** | Score range: 0–100 | ✅ Working |
| **Streak Tracking** | Current active streak | ✅ Working |
| **Drop-Off Risk Detection** | 3 missed workouts / 14-day inactivity / Diet <40% for 2 weeks | ✅ Working |
| **Energy Level Check-In** | Energized / Normal / Slightly Fatigued / Very Tired | ✅ Working |
| **Muscle Soreness Tracking** | Scale 1–10 | ✅ Working |
| **Sleep Hours Logging** | Track recovery quality | ✅ Working |
| **Progressive Overload Engine** | +5–10% volume if ≥90% completion; reduce if <50% | ✅ Working |
| **Adaptive Plan Suggestion** | Lighter plan or schedule reset on drop-off | ⏳ In Progress |

---

### 🤖 AI Chat Fitness Assistant

| Feature | Details | Status |
|---------|---------|--------|
| **AI-Powered Chatbot** | Groq API (OpenAI-compatible) with context-aware fitness coaching | ✅ Working |
| **Personalized Responses** | Answers based on user's profile, goal, and activity data | ✅ Working |
| **Fitness Q&A** | Fatigue, nutrition, workout questions answered intelligently | ✅ Working |
| **Safety-Aware Coaching** | Includes medical disclaimers and safe recommendations | ✅ Working |
| **Structured Response Format** | Data-backed explanation + 1–2 actionable steps | ✅ Working |

**Endpoints**:
- `POST /service/chatbotresponse` – Send message and receive AI coaching response

---

### 🌐 Community Features

| Feature | Details | Status |
|---------|---------|--------|
| **Community Feed** | Browse posts from other users | ✅ UI Ready |
| **Create Post** | Upload image with caption | ✅ Working |
| **Like Posts** | Like/unlike community posts | ✅ Working |
| **Comments** | Comment on posts | ✅ Working |
| **Post Modal** | Dedicated modal UI for adding posts | ✅ Working |

---

### 🎨 Frontend Pages

| Page | Purpose | Status |
|------|---------|--------|
| **Home** | Landing page with hero section and platform intro | ✅ Ready |
| **Login** | User login page | ✅ Ready |
| **Register** | User registration page | ✅ Ready |
| **User Dashboard** | Main dashboard with progress, stats, and plan overview | ✅ Ready |
| **Profile Setup** | Health profile and goal configuration page | ✅ Ready |
| **Profile Page** | View and edit account profile | ✅ Ready |
| **Workouts** | Browse and execute weekly workout plan | ✅ Ready |
| **Diet Setup** | Configure dietary preferences and generate diet chart | ✅ Ready |
| **Community** | Social fitness feed with posts, likes, and comments | ✅ Ready |
| **ChatBot** | AI-powered fitness assistant chat interface | ✅ Ready |

---

### 🛠️ Technical Features

| Feature | Details | Status |
|---------|---------|--------|
| **Database** | MongoDB with Mongoose ORM | ✅ Working |
| **Authentication** | JWT-based with HTTP-only cookies | ✅ Working |
| **Password Security** | BCrypt hashing with salt rounds | ✅ Working |
| **Image Upload** | Cloudinary integration for profile and post images | ✅ Working |
| **AI Integration** | Groq API via OpenAI SDK for chatbot | ✅ Working |
| **Error Handling** | Centralized error handling middleware | ✅ Working |
| **CORS** | Cross-origin request handling configured | ✅ Working |
| **State Management** | React Context API for auth and workout state | ✅ Working |
| **Routing** | React Router v7 for frontend navigation | ✅ Working |
| **Animations** | Framer Motion + AOS for smooth UI transitions | ✅ Working |
| **Notifications** | React Hot Toast for real-time user feedback | ✅ Working |
| **Styling** | Tailwind CSS v4 framework | ✅ Working |
| **Icons** | Lucide React + React Icons library | ✅ Working |
| **Charts** | Recharts for progress visualizations | ✅ Working |

---

## 📦 Tech Stack

### Frontend
- **React 19.2.0** – UI Framework
- **Vite 7.3.1** – Build Tool
- **React Router DOM 7.13.0** – Routing
- **Tailwind CSS 4.2.0** – Styling
- **Axios 1.13.5** – HTTP Client
- **Recharts 3.7.0** – Data Visualization
- **Framer Motion 12.34.3** – Animations
- **AOS 2.3.4** – Scroll Animations
- **Lottie React 2.4.1** – Lottie Animations
- **React Hot Toast 2.6.0** – Notifications
- **Lucide React 0.574.0** – Icon Library
- **React Icons 5.5.0** – Extended Icons

### Backend
- **Express 5.2.1** – Web Framework
- **MongoDB with Mongoose 9.2.1** – Database
- **JWT (jsonwebtoken 9.0.3)** – Authentication
- **BCrypt 6.0.0** – Password Hashing
- **Cloudinary 2.9.0** – Image Storage
- **Multer 2.0.2** – File Upload Handling
- **OpenAI SDK 6.24.0** – Groq AI Integration
- **Nodemailer 8.0.1** – Email Service
- **Cookie Parser 1.4.7** – Cookie Handling
- **CORS 2.8.6** – Cross-Origin Handling
- **Dotenv 17.3.1** – Environment Variables
- **Nodemon 3.1.14** (Dev) – Auto-Reload

---

## ⚠️ Missing/Required Features

The following features are **planned or incomplete** for a fully production-ready platform:

### 🥗 Diet Generator Engine (CRITICAL)
- [ ] **Macro Calculation Engine**: Complete `macrosCalculationEngine()` service with full meal output
- [ ] **Weekly Meal Plan Generation**: Day-by-day meal breakdown with recipes
- [ ] **Calorie-per-Meal Distribution**: Smart meal timing based on heavy meal preference
- [ ] **Allergy-Safe Filtering**: Filter meal suggestions based on user allergies
- [ ] **Diet Plan Persistence**: Save generated diet plans to database

### 📊 Progress & Analytics Dashboard (HIGH PRIORITY)
- [ ] **Weight Trend Visualization**: Line chart for 4–12 week body weight tracking
- [ ] **Workout Adherence Chart**: Weekly/monthly completion percentage graph
- [ ] **Habit Score Dashboard**: Visual display of weekly and monthly habit scores
- [ ] **Goal Timeline Forecast**: Estimated goal completion date with confidence range
- [ ] **Body Measurement Tracking**: Waist, chest, hips, arms, thighs logging

### 🏋️ Advanced Workout Features (HIGH PRIORITY)
- [ ] **Progressive Overload Automation**: Auto-adjust volume based on completion history
- [ ] **Adaptive Plan Replacement**: Replace current plan when drop-off is detected
- [ ] **Forced Recovery Day Trigger**: Insert rest day when 3 fatigue flags occur in 7 days
- [ ] **Week-over-Week Plan Progression**: New plan generated each week with scaled difficulty

### 🔔 Notifications & Reminders (MEDIUM PRIORITY)
- [ ] **Workout Reminder Emails**: Scheduled email reminders via Nodemailer
- [ ] **Weekly Summary Report**: Email summary of habit score and progress
- [ ] **In-App Notification Bell**: Real-time notification center

### 👨‍💼 Admin Panel (MEDIUM PRIORITY)
- [ ] **User Management**: View, filter, and manage all registered users
- [ ] **Platform Analytics**: Total users, sessions, and engagement metrics
- [ ] **Exercise Template Management**: Edit and update exercise database via UI
- [ ] **Content Moderation**: Review and remove community posts

### 🌐 Community Enhancements (MEDIUM PRIORITY)
- [ ] **Post Sharing**: Share posts externally
- [ ] **User Profiles on Posts**: Click to view poster's public profile
- [ ] **Follow System**: Follow other users to personalize feed
- [ ] **Achievement Badges**: Award badges for milestones (streaks, goals)

### 📱 Additional Features (LOW PRIORITY)
- [ ] **Two-Factor Authentication**: OTP-based 2FA via email or SMS
- [ ] **Subscription / Premium Model**: Premium tier with enhanced AI coaching
- [ ] **Mobile App**: Cross-platform mobile version
- [ ] **Wearable Integration**: Smartwatch / fitness band data sync
- [ ] **LLM Upgrade**: Replace rule-based chatbot with full LLM contextual coaching

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)
- Groq API key (for AI chatbot)

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENAI_API_KEY=your_groq_api_key

npm run dev
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication Routes (`/auth`)
```
POST   /auth/register                   – Register new user
POST   /auth/login                      – Login user
GET    /auth/logout                     – Logout user
```

### User Routes (`/user`)
```
PUT    /user/user-profile/:id           – Create / update health & goal profile
GET    /user/get-workouts               – Fetch adaptive workout plan
POST   /user/workout-log                – Log completed workout session
POST   /user/diet-preference            – Save dietary preferences
GET    /user/get-diet-chart             – Retrieve generated diet plan
```

### Admin Routes (`/admin`)
```
POST   /admin/post-exercises            – Seed exercises to database (Admin only)
```

### Service Routes (`/service`)
```
POST   /service/chatbotresponse         – AI fitness coaching chatbot response
```

---

## 📋 Database Models

### User Model
- `fullName`, `email`, `password`, `role` (user/admin)
- `isActive`, `photo` (url, publicID)
- Virtual populate → `profile`

### Profile Model
- `referenceUser` (ref: User)
- `age`, `gender`, `height`, `weight`
- `activityLevel` (light/moderate/extreme)
- `experienceLevel` (beginner/intermediate)
- `activities` (weight-loss/muscle-gain/height-gain/weight-gain/stay-fit)
- `bmi`, `maintainanceCal`
- `target` → `height`, `weight`, `calories`

### Exercise Model
- `exerciseName`, `exerciseType`
- `activities[]`, `experienceLevel[]`, `activityLevel[]`
- `duration`, `reps`, `sets`

### Plan (WorkoutPlan) Model
- `user` (ref: User)
- `start`, `end` dates
- `goal`, `experienceLevel`, `activityLevel`
- `weekNumber`, `weekTemplate[]`
- `analytics` → totalWorkoutDays, totalRestDays, averageIntensity, totalExercises
- `generationMeta` → progressionType, createdFrom
- `status` (active/completed/paused)

### WorkoutSession (DailyWorkout) Model
- `userId`, `planId`, `dayIndex`
- `workoutDetails` → date, planned, completed, completionPercentage, durationMinutes, intensityLevel, exercisesDone, totalExercises, `exerciseLogs[]`
- `exerciseLog` → exerciseName, completed, `sets[]`
- `setSchema` → setNumber, repsCompleted, weightUsed, durationSec, restTakenSec
- `dietDetails` → estimatedCaloriesConsumed, followed, proteinHit
- `recoveryDetails` → energyLevel, muscleSoreness, sleepHours
- `notes`

### Diet Model
- `referenceUser` (ref: User)
- `deficitOrSurplusLevel` (deficit/surplus)
- `mealFrequency`
- `dietaryPreference` (vegetarian/non-vegetarian/vegan/eggetarian)
- `allergies[]` (Peanuts/Dairy/Gluten/Soy/Shellfish/Eggs/Tree Nuts/None)
- `heavyMealTiming`, `flexibilityMode`

### Post Model
- `user` (ref: User)
- `image`, `caption`
- `likes[]` (ref: User)

### Comment Model
- `post` (ref: Post), `user` (ref: User)
- `text` (max 200 chars)

---

## 🎨 Project Structure

```
NavKalpana-FitAI/
│
├── frontend/                          # React Frontend
│   ├── src/
│   │   ├── components/                # Reusable components
│   │   │   ├── Header.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── pages/                     # Page components
│   │   │   ├── dashboards/
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   ├── ProfileSetup.jsx
│   │   │   │   ├── Diet.jsx
│   │   │   │   └── modal/
│   │   │   │       └── AddPostModel.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Workouts.jsx
│   │   │   ├── DietarySetup.jsx
│   │   │   ├── Community.jsx
│   │   │   └── ChatBot.jsx
│   │   ├── config/                    # Context & API config
│   │   │   ├── AuthContext.jsx
│   │   │   ├── WorkoutContext.jsx
│   │   │   └── API.jsx
│   │   ├── assets/
│   │   │   └── Exercise.json          # Exercise seed data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authControllers.js
│   │   │   ├── userController.js
│   │   │   ├── exerciseController.js
│   │   │   ├── adminController.js
│   │   │   └── serviceController.js
│   │   ├── middlewares/
│   │   │   └── authMiddlewares.js     # JWT protect + adminProtect
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── profileModel.js
│   │   │   ├── exerciseModel.js
│   │   │   ├── planSchema.js
│   │   │   ├── dailyWorkoutModel.js
│   │   │   ├── dietModel.js
│   │   │   ├── postModel.js
│   │   │   └── commentsModel.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   └── serviceRoutes.js
│   │   └── util/
│   │       ├── authToken.js
│   │       ├── helpers.js             # BMI & calorie calculators
│   │       ├── dietGeneratorService.js
│   │       └── chatbotService.js      # Groq AI chatbot logic
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🔮 Future Improvements

- LLM-powered contextual AI coaching (GPT-4 / Gemini upgrade)
- Push notifications and weekly email summaries
- Wearable device integration (Smartwatch / Fitness Band)
- Advanced analytics with predictive behavioral insights
- Subscription-based premium model
- Cross-platform mobile app (React Native)
- Community follow system and achievement badges

---

## 🏆 Innovation Highlights

- Closed-loop adaptive fitness engine
- Habit-based behavioral scoring system
- Intelligent drop-off risk prediction before burnout
- Fatigue-aware workout intensity adjustment
- Groq AI-powered explainable fitness coaching
- Safe calorie floor enforcement mechanism
- Scientific progressive overload automation
- Community social layer for motivation and accountability

---

## 📝 License

ISC License – Free to use

---

## 👨‍💻 Authors

**Team FitAI – NavKalpana**

| Name | Role |
|------|------|
| Tanishk Sarathe | Team Leader · Full Stack Developer (MERN) |
| Sanjana Vishwakarma | Full Stack Developer · API · UI/UX |
| Yugant Nath | Frontend Developer · UI/UX |
| Aryan Sarathe | Learner · Frontend Contributor |

---

## 📞 Support

For issues, questions, or feature requests, please open an issue or reach out through the platform's official communication channel.

---

**Last Updated**: February 24, 2026
**Version**: 1.0.0 (Core Adaptive Engine Implemented)

---

### Summary of Implementation Status

| Category | Total Features | Implemented | Missing | Status |
|----------|---|---|---|---|
| Authentication & Security | 8 | 8 | 0 | ✅ Complete |
| Health & Goal Profile | 8 | 8 | 0 | ✅ Complete |
| Workout Plan & Exercise | 11 | 11 | 0 | ✅ Complete |
| Diet & Nutrition Setup | 8 | 7 | 1 | ⏳ In Progress |
| Habit & Adaptive Engine | 9 | 7 | 2 | ⏳ In Progress |
| AI Chat Assistant | 5 | 5 | 0 | ✅ Complete |
| Community Features | 5 | 5 | 0 | ✅ Complete |
| Progress & Analytics | 5 | 0 | 5 | ⏳ Not Started |
| Admin Panel | 4 | 1 | 3 | ⏳ Not Started |
| Notifications | 3 | 0 | 3 | ⏳ Not Started |
| **Total** | **66** | **52** | **14** | **79% Complete** |
