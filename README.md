# 🧠 Habits Tracker App

A modern and responsive **habit tracking application** built with Vue 3 + Vite.  
The app helps users track daily habits, visualize progress, and send reports via email.



## Live Demo

👉 https://habits-tracker-app-oojn.onrender.com



## Features

- Create and track daily habits
- Progress statistics & analytics
- Monthly calendar view
- Drag & drop habit management
- Email report system (Nodemailer + Gmail SMTP)
- Persistent state management
- Responsive design (mobile + desktop)



## Tech Stack

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



## App Preview

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


## 🚀 Deployment

- Frontend deployed on Render (Static Site)
- Production build served from `/dist`
- Backend email service powered by Node.js + Nodemailer



## ⚠️ Notes

- The app uses hash-based routing (`/#/`) for deployment compatibility.
- Backend service should be deployed separately for full production usage.



## 🚀 Future Improvements

- Authentication system (login/register)
- Database integration (MongoDB / Firebase)
- Advanced analytics dashboard
- PWA support
- Multi-user functionality


