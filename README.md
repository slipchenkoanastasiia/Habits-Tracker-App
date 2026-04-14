<h1 align="center">🧠 Habits Tracker App</h1>

<p align="center">
  A modern habit tracking application built with Vue 3 + Vite
</p>

<p align="center">
  <a href="https://habits-tracker-app-oojn.onrender.com">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=for-the-badge" />
  </a>
  <img src="https://img.shields.io/badge/Vue-3-brightgreen?style=for-the-badge&logo=vue.js" />
  <img src="https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Render-Deployed-blue?style=for-the-badge" />
</p>




##  Live Demo

👉 https://habits-tracker-app-oojn.onrender.com

>  Track habits, visualize progress, and stay consistent every day



##  Features

-  Create and track daily habits
-  Progress statistics & analytics
-  Monthly calendar view
-  Drag & drop habit management
-  Email report system (Nodemailer + Gmail SMTP)
-  Persistent state management
-  Responsive design (mobile + desktop)



##  Tech Stack

### Frontend
- Vue 3
- Vite
- Vue Router
- Vue Cal
- Vuedraggable

### UI
- FontAwesome Icons

### Backend (Email Service)
- Node.js
- Express
- Nodemailer
- CORS
- dotenv



##  App Preview

| Main Page | Calendar | Email Report |
|-----------|----------|--------------|
| ![Main](./preview-home.png) | ![Calendar](./preview-calendar.png) | ![Email](./preview-email.png) |

*Main dashboard, monthly calendar and email report modal*



## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/habits-tracker-app.git
```

### 2. Navigate to project folder
```bash
cd habits-tracker-app
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run development server
```bash
npm run dev
```

The app will be available at:
http://localhost:5173

### 5. Build for production
```bash
npm run build
```

### 6. Preview production build
```bash
npm run preview
```



##  Deployment

- Frontend deployed on Render (Static Site)
- Production build served from `/dist`
- Backend email service powered by Node.js + Nodemailer



## ⚠️ Notes

- The app uses hash-based routing (`/#/`) for deployment compatibility
- Backend service should be deployed separately for full production usage



## 🚀 Future Improvements

- Authentication system (login/register)
- Database integration (MongoDB / Firebase)
- Advanced analytics dashboard
- PWA support
- Multi-user functionality


