# HTI Child Safety Backend

This is a minimal Spring Boot backend scaffold for the HTI Child Safety project.

Run with:
```
mvn spring-boot:run
```

The app uses an in-memory H2 database for quick testing. API endpoints:
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/children
- POST /api/children
- GET /api/alerts
- POST /api/alerts

CORS is enabled for http://localhost:5173 (Vite dev server).
