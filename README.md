# Academy Program - Frontend

Progressive Web Apps (PWAs) for the Academy Program attendance and allowance management system.

## 🎓 Applications

| App | Description | Entry Point |
|-----|-------------|-------------|
| **Student** | View attendance QR, check balance, generate store QR | [/student/](./student/) |
| **Teacher** | Manage attendance sessions, scan student QR codes | [/teacher/](./teacher/) |
| **Store** | Process student purchases, view balances | [/store/](./store/) |

## 🚀 Deployment

### Static Site Hosting (Render, GitHub Pages, Netlify, etc.)

The frontend is a static site with no build step required:

1. **Entry Point**: `index.html` (root)
2. **Publish Directory**: `/` (entire repository)

### Backend API

All apps connect to the production backend:
```
https://kacadpocp1.onrender.com
```

## 📱 PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Service workers cache app shell
- **Responsive**: Mobile-first design
- **Touch-optimized**: Large touch targets, swipe gestures

## 🔧 Configuration

API URL is automatically detected:
- **Development** (localhost): `http://localhost:8000`
- **Production** (deployed): `https://kacadpocp1.onrender.com`

## 📁 Structure

```
frontend/
├── index.html          # Main entry point (app selector)
├── student/
│   ├── index.html      # Student PWA
│   ├── manifest.json   # PWA manifest
│   ├── sw.js           # Service worker
│   └── icons/          # App icons
├── teacher/
│   ├── index.html      # Teacher PWA
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
└── store/
    ├── index.html      # Store PWA
    ├── manifest.json
    ├── sw.js
    └── icons/
```

## 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | student1@academy.edu | student123 |
| Teacher | teacher1@academy.edu | teacher123 |
| Store | store1@academy.edu | store123 |

## 🌐 CORS

The backend must allow the frontend origin. Update CORS settings in the backend if deploying to a new domain.

## 📄 License

See [LICENSE](./LICENSE) file.
