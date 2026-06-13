# Gamerpedia

Gamerpedia is a gaming news and discovery web app built with React and Vite. It combines trending game data, category browsing, game details, tech news, and simple user authentication backed by an Express and MongoDB API.

## Features

- Trending games carousel on the home page
- Game detail pages with screenshots, genre, platform, publisher, and release info
- Category pages for PC, PS5, Xbox, and Nintendo games
- Latest technology news section
- Login, signup, and profile pages
- Sidebar navigation with quick access to major sections
- Backend user auth and profile update endpoints

## Tech Stack

- Frontend: React 19, React Router, Vite
- Styling: CSS files and component-specific styles
- Icons: React Icons, Lucide React
- Backend: Node.js, Express 5, Mongoose, CORS, dotenv
- Database: MongoDB
- External data: FreeToGame API and NewsAPI

## Project Structure

- `src/` - React app source code
- `src/components/` - Pages and reusable UI components
- `src/assets/` - Images, icons, and media files
- `backend/` - Express server for authentication and user data
- `public/` - Static public assets

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB connection string

## Environment Variables

Create a `.env` file inside `backend/` with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Installation

Install dependencies for both the frontend and backend:

```bash
npm install
cd backend
npm install
```

## Running the App

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend development server from the project root:

```bash
npm run dev
```

The Vite dev server proxies these routes:

- `/api` -> `http://localhost:5000`
- `/gamesapi` -> `https://www.freetogame.com/api`

## Available Scripts

From the project root:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

From `backend/`:

```bash
npm run dev
npm start
```

## Main Routes

- `/` - Home page with trending games and latest news
- `/game/:id` - Game detail page
- `/news` - News feed page
- `/games/pc` - PC games
- `/games/ps5` - PS5 games
- `/games/xbox` - Xbox games
- `/games/nintendo` - Nintendo games
- `/login` - Login form
- `/signup` - Signup form
- `/profile` - User profile page

## Backend API

- `POST /api/signup` - Create a new user
- `POST /api/login` - Authenticate a user
- `GET /api/user/:email` - Fetch a user by email
- `PUT /api/user/:email` - Update username and password

## Notes

- The frontend stores the logged-in user's email and username in local storage.
- Game data is fetched from the FreeToGame API through the Vite proxy.
- The news section depends on an external NewsAPI request configured in the source.
- Passwords are currently stored as plain text in the backend. That should be improved before using this project in production.

## License

No license file is included yet. Add one if you plan to publish or share the project publicly.
