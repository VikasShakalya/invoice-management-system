# IMS Frontend - Invoice Management System

A modern React-based frontend application for managing invoices, built with Material-UI and connected to a Django REST API backend.

## Features

- **User Authentication**: JWT-based authentication with automatic token refresh
- **Invoice Management**: Create, read, update, and delete invoices
- **User Management**: View and manage system users
- **Dashboard**: Overview with statistics and recent invoices
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface using Material-UI

## Tech Stack

- **React 18** - Frontend framework
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Dayjs** - Date manipulation and formatting
- **React Scripts** - Build tooling

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:8000`

## Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd ims-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The application will open at [http://localhost:3000](http://localhost:3000).

## Backend Configuration

### Django Backend Setup

1. **Ensure your Django backend is running on port 8000**

2. **Install required packages:**
   ```bash
   pip install djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

3. **Update Django settings.py:**
   ```python
   INSTALLED_APPS = [
       ...
       'rest_framework',
       'corsheaders',
       ...
   ]

   MIDDLEWARE = [
       'corsheaders.middleware.CorsMiddleware',
       'django.middleware.common.CommonMiddleware',
       ...
   ]

   REST_FRAMEWORK = {
       'DEFAULT_AUTHENTICATION_CLASSES': [
           'rest_framework_simplejwt.authentication.JWTAuthentication',
       ],
       'DEFAULT_PERMISSION_CLASSES': [
           'rest_framework.permissions.IsAuthenticated',
       ],
   }

   CORS_ALLOWED_ORIGINS = [
       "http://localhost:3000",
       "http://127.0.0.1:3000",
   ]

   CORS_ALLOW_CREDENTIALS = True
   ```

4. **Configure JWT settings:**
   ```python
   from datetime import timedelta

   SIMPLE_JWT = {
       'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
       'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
       'ROTATE_REFRESH_TOKENS': True,
       'BLACKLIST_AFTER_ROTATION': True,
   }
   ```

5. **Add URLs:**
   ```python
   # urls.py
   from django.urls import path, include
   from rest_framework_simplejwt.views import (
       TokenObtainPairView,
       TokenRefreshView,
   )

   urlpatterns = [
       path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
       path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
       path('api/', include('invoices.urls')),
   ]
   ```

## API Endpoints

The frontend expects the following API endpoints:

### Authentication
- `POST /api/token/` - Obtain access and refresh tokens
- `POST /api/token/refresh/` - Refresh access token

### Invoices
- `GET /api/invoices/` - List all invoices
- `GET /api/invoices/:id/` - Get specific invoice
- `POST /api/invoices/` - Create new invoice
- `PUT /api/invoices/:id/` - Update invoice
- `DELETE /api/invoices/:id/` - Delete invoice
- `GET /api/invoices/stats/` - Get invoice statistics

### Users
- `GET /api/users/` - List all users
- `GET /api/users/me/` - Get current user info

## Environment Variables

Create a `.env` file in the root directory (optional):

```bash
REACT_APP_API_URL=http://localhost:8000/api/
```

## Project Structure

```
ims-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── api/
│   │   ├── auth.js          # Authentication API
│   │   ├── axiosInstance.js # Axios configuration
│   │   ├── invoice.js       # Invoice API
│   │   └── user.js          # User API
│   ├── components/
│   │   ├── Auth/
│   │   │   └── Login.js     # Login component
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js # Dashboard with invoice list
│   │   ├── Invoices/
│   │   │   └── InvoiceForm.js # Create/Edit invoice
│   │   ├── Users/
│   │   │   └── UserList.js  # User management
│   │   └── Layout/
│   │       └── Layout.js    # Main layout with sidebar
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## Common Issues and Solutions

### CORS Issues
If you see CORS errors:
1. Ensure Django CORS is properly configured
2. Check that the backend URL matches the frontend configuration
3. Verify both frontend and backend are running

### Authentication Issues
If login fails:
1. Check browser console for detailed error messages
2. Verify backend token endpoints are accessible
3. Ensure backend has proper user credentials

### Database Connection
If data doesn't load:
1. Check backend logs for database errors
2. Ensure database migrations are applied
3. Verify backend API endpoints return expected data

## Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Serve the build:**
   ```bash
   serve -s build
   ```

3. **Configure production backend URL:**
   Update `src/api/axiosInstance.js` baseURL to your production backend URL.
