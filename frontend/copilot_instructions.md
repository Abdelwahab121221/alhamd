# Copilot Instructions

## Project Overview

This project is a Quran Memorization web page for Alhamd Mosque using **Next.js**. It aims to help users track, review, and manage their Quran memorization progress. Users can log in, view Surahs, and mark Ayahs as memorized.

## Technologies Used

-   Frontend: Next.js, React, Tailwind CSS
-   Backend: Django, Django REST Framework (DRF)
-   Authentication: JWT (use httpOnly cookies for tokens), Google/Facebook OAuth
-   Database: [e.g., PostgreSQL or SQLite]
-   Others: Docker (optional), Git

## Coding Style

-   Write clear, concise comments for complex logic
-   Follow PEP8 for Python code
-   Follow ESLint rules for JavaScript

## Frontend Instructions

-   Use React functional components with hooks
-   Use Tailwind CSS utility classes for styling
-   Use `axios` or `fetch` for API requests (always use HTTPS and environment variables for API URLs)
-   Pages are stored in `pages/`, components in `components/`
-   Use error boundaries to catch UI errors (see React docs)
-   Use React context or Redux for authentication state
-   Never log or expose sensitive data (like passwords)
-   Sanitize any user-generated content before rendering
-   Use ESLint and Prettier for code consistency

## Backend Instructions

-   Use class-based views in DRF
-   Use `serializers.py` for all API serializers (validate and sanitize all incoming data)
-   Use JWT for authentication and permissions (short expiry, refresh tokens, httpOnly cookies)
-   Group API endpoints logically in `views.py`
-   Use Django’s built-in password hashing and enforce strong password policies
-   Protect all endpoints with permissions
-   Enable CORS only for trusted domains
-   Use HTTPS in production

## Security Checklist (Frontend & Backend)

-   [x] Form validation for all user input
-   [x] Never log or expose sensitive data
-   [x] Use HTTPS for all API requests
-   [x] Use httpOnly cookies for JWT tokens
-   [x] Sanitize user-generated content
-   [x] Use environment variables for secrets and API URLs
-   [x] Use error boundaries in React
-   [x] Use strong password policies and hashing (backend)
-   [x] Protect endpoints with permissions (backend)
-   [x] Enable CORS for trusted domains only
-   [x] Implement rate limiting and brute-force protection (backend)
-   [x] Add CSRF protection if not using JWT in httpOnly cookies

# Review navigation and naming for consistency

# - Use `/registration` for registration page, not `/register`

# - Use consistent naming for folders and files
