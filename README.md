
# 🎬 Movies Portal — Angular 19 | TMDB API | Signals | Auth

A modern and fully responsive movie browsing application built with **Angular 19**,  
**TMDB API**, **Signals**, **Standalone Components**, **Mock Authentication**, and  
**Facade Architecture**.

This project is designed with clean code standards and scalable architecture for  
real-world applications.


---

# 📦 Features

### 🔐 Authentication
- Login via mock JSON Server  
- Access Token + Refresh Token  
- Persistent session via AuthStorage  
- Auto-redirect on logout  
- Protected routes  
- Signals-based reactive auth state  

### 🎥 Movies
- Popular Movies  
- Movie Search with debounce  
- Infinite Scroll (IntersectionObserver)  
- Cast section  
- Responsive IMDb-style layout  

### ⚡ State Management (Signals + Facade)
- MovieListFacade  
- AuthFacade  
- Global loader interceptor  

### 🎨 UI
- Bootstrap 5  
- Angular Material  
- Responsive Navbar + Mobile Sidebar  
- Toast Notifications (MatSnackBar)  

---

# 🔧 Installation

## 1) Install packages

```sh
npm install
```

## 2) Install Mock Server tools

```sh
npm install json-server json-server-auth
```

---

# 🖥 Run Mock Auth Server

```sh
node mock-server/server.js
```

Backend runs at:

```
http://localhost:3000
```

---

# ▶️ Run Angular App

```sh
npm start
```

Open:

```
http://localhost:4200
```

---

# 🔑 Mock Credentials

Example from `mock-server/db.json`:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
# 🧱 Project Structure

```
src/
 ├── app/
 │   ├── core/
 │   │   ├── auth/
 │   │   │   ├── services/
 │   │   │   ├── interceptors/
 │   │   │   └── state/auth.facade.ts
 │   │   ├── movies/
 │   │   │   ├── movies.service.ts
 │   │   │   └── movie-list.facade.ts
 │   │   └── guards/
 │   ├── features/
 │   │   ├── auth/
 │   │   └── movies/
 │   ├── shared/
 │   │   └── layout/navbar/
 │   └── app.routes.ts
 ├── assets/
 └── environments/
```

### Docs:

https://developer.themoviedb.org/docs/getting-started

---

# ✨ Key Patterns

- **Facade Pattern**
- **Signals**
- **Strategy Pattern (error handling)**
- **Interceptor Pattern**

---

# 📱 Responsive Layout
- Desktop: Full navbar + grid  
- Mobile: Sidebar menu + single column  

---

# 📜 License

MIT

---

# ✨ Author
Your Name  
Movies Portal — Angular 19 Project

