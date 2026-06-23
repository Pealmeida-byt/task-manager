# 📋 Task Manager

A full-stack task management application built with modern web technologies. Create, complete, and organize your tasks with a clean, elegant interface and real-time database persistence.

🔗 **Live Demo:** [task-manager-theta-ruddy.vercel.app](https://task-manager-theta-ruddy.vercel.app)

## ✨ Features

- ✅ Create, complete, and delete tasks
- 📊 Real-time progress tracking
- 💾 Persistent storage with PostgreSQL
- 🎨 Modern UI with glassmorphism design
- ⚡ Fast and responsive

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Deployment:** Vercel

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Pealmeida-byt/task-manager.git

# Install dependencies
npm install

# Set up your environment variables
# Create a .env file with your DATABASE_URL

# Run database migrations
npx prisma generate
npx prisma db push

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📝 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tarefas` | List all tasks |
| POST | `/api/tarefas` | Create a new task |
| PATCH | `/api/tarefas/[id]` | Update a task |
| DELETE | `/api/tarefas/[id]` | Delete a task |

## 👨‍💻 Author

**Pedro Almeida**
- GitHub: [@Pealmeida-byt](https://github.com/Pealmeida-byt)