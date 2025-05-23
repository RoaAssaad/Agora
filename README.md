# **Agora Community Platform**

## **Project Description**

Agora is a modern discussion platform where users can create communities, share posts, upvote or downvote content, and comment — all within a sleek, responsive interface. Inspired by the ancient Greek “Agora,” it provides a space for open dialogue, meaningful conversations, and community-driven engagement. Built with a NestJS backend and a React + Vite frontend, Agora prioritizes vibrant design, real-time interaction, and a seamless user experience across communities.

---

##  Features

-  JWT-based authentication and protected routes
-  Community creation, editing, and deletion
-  Post creation (text + image) and sorting (Popular, Recent, Top)
-  Voting system with real-time count updates
-  Commenting system with comment count tracking
-  Profile management and profile photo upload
-  Live fuzzy search for communities
-  Redux global state management for posts, user, and comments

---
##  Libraries Used

### Frontend
- React + Vite
- Redux Toolkit
- React Router DOM
- React Bootstrap
- Axios + JWT Interceptor
- React Icons

### Backend
- NestJS + TypeORM
- PostgreSQL
- Swagger (`@nestjs/swagger`)
- Passport + JWT
- Class-validator + Bcrypt

---


##  Redux Toolkit Integration

Agora uses Redux Toolkit for shared application state. It replaces local and context-based state using:
- `userSlice`: for user authentication and profile state
- `postSlice`: for managing post data, votes, and fetching
- `setCommentCount` reducer to update comments per post
- `createAsyncThunk` for async fetches and vote logic

UI components use `useAppSelector` and `useAppDispatch` to connect to the Redux store.

---

##  API Endpoints Overview

>  Full Swagger UI: [http://localhost:3000/api](http://localhost:3000/api)

| Resource     | Method | Endpoint                         | Description                            |
|--------------|--------|----------------------------------|----------------------------------------|
| **Auth**     | POST   | `/auth/register`                 | Register a new user                    |
|              | POST   | `/auth/login`                    | Log in and receive JWT                 |
| **Users**    | GET    | `/users`                         | List all users (protected)            |
|              | GET    | `/users/me`                      | Get current authenticated user         |
|              | PATCH  | `/users/profile-photo`           | Update profile image                   |
| **Posts**    | GET    | `/posts?sort=`                   | Get posts sorted (Popular, Recent...)  |
|              | GET    | `/posts/:id`                     | View a single post                     |
|              | POST   | `/posts`                         | Create post (protected)                |
|              | PATCH  | `/posts/:id`                     | Update post (creator only)             |
|              | DELETE | `/posts/:id`                     | Delete post (creator only)             |
| **Comments** | GET    | `/comments/post/:postId`         | Get comments under a post              |
|              | POST   | `/comments`                      | Add a comment (protected)              |
| **Votes**    | POST   | `/votes`                         | Upvote/downvote post (protected)       |
|              | DELETE | `/votes/:id`                     | Remove a vote (protected)              |
| **Communities** | GET | `/communities`                   | View all communities                   |
|              | GET    | `/communities/:id`               | View specific community                |
|              | POST   | `/communities`                   | Create community (protected)           |
|              | PATCH  | `/communities/:id`               | Update community (creator only)        |
|              | DELETE | `/communities/:id`               | Delete community (creator only)        |

---

##  Database Schema

### `users`
- `id`, `username`, `email`, `password`, `aura`, `profileImage`, `created_at`

### `posts`
- `id`, `title`, `content`, `image`, `votes`, `creatorId`, `communityId`, `created_at`

### `comments`
- `id`, `content`, `postId`, `userId`, `created_at`

### `votes`
- `id`, `value (-1, 0, 1)`, `postId`, `userId`, `created_at`

### `communities`
- `id`, `name`, `title`, `description`, `creatorId`, `created_at`



---

##  Setup Instructions

### Backend

```bash
cd api
npm install
```

Create `.env` file:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/agora
JWT_SECRET=your_jwt_secret
```

Run backend:
```bash
npm run start:dev
```

### Frontend

```bash
cd app
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

##  How to Run & Test

- Use frontend UI for all user workflows
- Use Swagger UI (`http://localhost:3000/api`) to test endpoints interactively
- Use DevTools for Redux state tracking (optional)

---
##  User Journey

1. New user registers via `/auth/register`
2. Logs in via `/auth/login`
3. Creates a new community
4. Creates a post in that community
5. Other users view, upvote, and comment on the post
6. Users upload a profile photo from the profile page
7. Posts begin to rise in "Popular" or "Top" tabs based on votes
8. Users visit profiles to see authored posts and uploaded image
9. Communities are browsed using the search bar or sidebar


##  Context Diagram

```plaintext
+-------------+          +--------------+         +------------------+
|   Frontend  | <--->    |   Backend    | <--->   |   PostgreSQL DB  |
| (React/Vite)|          | (NestJS API) |         | (TypeORM Models) |
+-------------+          +--------------+         +------------------+
      |                         |                        |
      |-- Axios API Calls ----->                        |
      |                         |-- Queries/Mutations -->|
```

---

##  Swagger Export

Go to [http://localhost:3000/api](http://localhost:3000/api), then press `Ctrl + P` → Save as PDF.
