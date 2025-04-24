# **Agora**

## **Project Description**

Agora is a modern discussion platform where users can create communities, share posts, upvote or downvote content, and comment — all within a sleek, responsive interface. Inspired by the ancient Greek “Agora,” it provides a space for open dialogue, meaningful conversations, and community-driven engagement. Built with a NestJS backend and a React + Vite frontend, Agora prioritizes vibrant design, real-time interaction, and a seamless user experience across communities.

---

## **Features**

- **Community Creation**: Users can create, manage, and join custom communities
- **Post Creation**: Text + image posts with sorting (Popular, Recent, Top)
- **Voting System**: Upvote and downvote posts, with vote tallies and user vote memory
- **Comment System**: Add and view comments in real-time under posts
- **Profile Management**: View user details, uploaded posts, and update profile picture
- **Image Uploads**: Base64 image storage in PostgreSQL 
- **Search Functionality**: Live community search with fuzzy match
- **Authentication**: JWT-based login and registration system
- **Modern UI**: Purple-themed, responsive layout using Bootstrap + custom styles

---

## **Backend Routes**

### **Auth**

| Method | Endpoint         | Description        | Status Codes |
|--------|------------------|--------------------|--------------|
| POST   | `/auth/register` | Register a user    | 201, 400     |
| POST   | `/auth/login`    | Login and get JWT  | 200, 401     |

### **Users**

| Method | Endpoint           | Description                | Status Codes |
|--------|--------------------|----------------------------|--------------|
| GET    | `/users`           | Get all users              | 200          |
| GET    | `/users/me`        | Get current authenticated user | 200, 401 |
| PATCH  | `/users/profile-photo` | Upload/update profile image | 200, 400     |

### **Posts**

| Method | Endpoint       | Description              | Status Codes |
|--------|----------------|--------------------------|--------------|
| GET    | `/posts`       | Get all posts (sortable) | 200          |
| GET    | `/posts/:id`   | Get a specific post      | 200, 404     |
| POST   | `/posts`       | Create a post (auth)     | 201, 401     |
| PATCH  | `/posts/:id`   | Update a post (auth)     | 200, 403     |
| DELETE | `/posts/:id`   | Delete a post (auth)     | 200, 403     |

### **Comments**

| Method | Endpoint             | Description               | Status Codes |
|--------|----------------------|---------------------------|--------------|
| GET    | `/comments/post/:id`| Get comments by post      | 200, 404     |
| POST   | `/comments`         | Create comment (auth)     | 201, 401     |

### **Votes**

| Method | Endpoint        | Description                | Status Codes |
|--------|-----------------|----------------------------|--------------|
| POST   | `/votes`        | Upvote/downvote a post     | 200, 400     |
| DELETE | `/votes/:id`    | Remove vote (auth)         | 200, 401     |

### **Communities**

| Method | Endpoint          | Description                | Status Codes |
|--------|-------------------|----------------------------|--------------|
| GET    | `/communities`    | Get all communities        | 200          |
| GET    | `/communities/:id`| Get a specific community   | 200, 404     |
| POST   | `/communities`    | Create community (auth)    | 201, 400     |
| PATCH  | `/communities/:id`| Update community (auth)    | 200, 403     |
| DELETE | `/communities/:id`| Delete community (auth)    | 200, 403     |

---

## **Database Tables**

1. **Users**
   - `id`, `username`, `email`, `password`, `aura`, `created_at`, `profileImage`
2. **Posts**
   - `id`, `title`, `content`, `image`, `votes`, `created_at`, `creatorId`, `communityId`
3. **Comments**
   - `id`, `content`, `created_at`, `postId`, `userId`
4. **Communities**
   - `id`, `name`, `title`, `description`, `created_at`, `creatorId`
5. **Votes**
   - `id`, `value`, `created_at`, `postId`, `userId`

---

## **Libraries Used**

### **Frontend**
- **React.js + Vite** – Fast modern frontend setup
- **React Bootstrap** – UI components
- **React Router DOM** – Navigation
- **Axios** – HTTP client with JWT support
- **React Icons** – Icon set
- **Base64 Uploads** – Direct image storage to DB
- **Custom Hooks + Context** – State management

### **Backend**
- **NestJS** – Modular backend framework
- **TypeORM** – PostgreSQL ORM
- **JWT + Passport** – Authentication
- **Bcrypt** – Password encryption
- **Class-Validator** – DTO validation
- **Docker (Postgres only)** – Containerized DB

---

## **How to Start**

### **Backend Setup**
```bash
cd api
npm install
```

Set up `.env`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/agora
JWT_SECRET=your_jwt_secret
```

Start the server:
```bash
npm run start:dev
```

### **Frontend Setup**
```bash
cd app
npm install
npm run dev
```

Open `http://localhost:5173`

---

## **Use Case: User Journey**

1. New user registers via `/register`
2. Creates a post in a community
3. Other users view, upvote, and comment
4. Posts rise in "Popular" or "Top"
5. Users visit profiles to see authored posts
6. Communities are browsed via search + sidebar

---

## **Context Diagram**

```plaintext
  +-------------+          +--------------+         +------------------+
  |   Frontend  | <--->    |   Backend    | <--->   |   PostgreSQL DB  |
  | (React/Vite)|          | (NestJS API) |         | (TypeORM Models) |
  +-------------+          +--------------+         +------------------+
        |                         |                        |
        |-- Axios API Calls ------>                        |
        |                         |-- Queries/Mutations -->|
```
