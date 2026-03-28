# 🧾 Invoice Management System

A full-stack Invoice Management System with complete CRUD operations, 
JWT authentication, and a modern React dashboard — built with Django REST 
Framework, PostgreSQL, and Node.js.

## ✨ Features
- 🔐 **JWT Authentication** — Secure login with automatic token refresh
- 📊 **Dashboard** — Overview with invoice statistics & recent activity
- 🧾 **Invoice CRUD** — Create, read, update, and delete invoices
- 👥 **User Management** — View and manage system users
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MaterialUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django%20REST-ff1709?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

## 📁 Project Structure
```
invoice-management-system/
├── ims-frontend/        # React frontend
└── invoice-backend/     # Django REST API backend
```

## 🚀 Run Locally

### Backend
```bash
cd invoice-backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd ims-frontend
npm install
npm start
```

## 🔑 Environment Variables

### Backend `.env`
```env
SECRET_KEY=your_django_secret_key
DATABASE_URL=your_postgresql_url
DEBUG=True
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:8000/api/
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/` | Obtain JWT tokens |
| POST | `/api/token/refresh/` | Refresh access token |
| GET | `/api/invoices/` | List all invoices |
| POST | `/api/invoices/` | Create new invoice |
| PUT | `/api/invoices/:id/` | Update invoice |
| DELETE | `/api/invoices/:id/` | Delete invoice |
| GET | `/api/invoices/stats/` | Invoice statistics |

## 📬 Connect
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/vikasshakalya)
[![GitHub](https://img.shields.io/badge/GitHub-1a1a1a?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VikasShakalya)
[![Email](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shakalyavikas6@gmail.com)
```

---

Commit with message:
```
docs: add optimized README with tech stack and API reference
