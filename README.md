# TaskMate AI - Productivity Dashboard

A modern, AI-powered productivity dashboard built with React, TypeScript, and Tailwind CSS, featuring dark mode design, smooth animations, and intelligent task management.

## Features

- ✨ **AI-First Onboarding** - Tell the AI your tasks and it organizes everything
- 🎯 **Smart Task Management** - Drag-and-drop Kanban board with 3 status columns
- 📊 **Analytics & Insights** - Track productivity with beautiful charts and graphs
- 🧠 **AI Predictions** - Get intelligent suggestions and behavior analysis
- 🌓 **Dark Mode UI** - Clean, modern developer-friendly aesthetic
- 🔐 **User Authentication** - Secure login and signup system
- ⚡ **Spectacular Animations** - Smooth Motion (Framer Motion) transitions
- 💫 **Thanos Snap Effect** - Particle disintegration on task completion

## Tech Stack

- **React** with TypeScript
- **Motion (Framer Motion)** for animations
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **React DnD** for drag-and-drop
- **Recharts** for data visualization
- **Lucide React** for icons

## File Structure

```
├── App.tsx                          # Main application component
├── components/
│   ├── LoginPage.tsx               # Authentication - Login
│   ├── SignUpPage.tsx              # Authentication - Sign Up
│   ├── TopBar.tsx                  # Navigation bar with profile
│   ├── StatsOverview.tsx           # Task statistics cards
│   ├── CompletedTaskCard.tsx       # Completed task component
│   ├── InProgressTaskCard.tsx      # In-progress task component
│   ├── PendingTaskCard.tsx         # Pending task component
│   ├── EnhancedAIChatButton.tsx    # AI chat interface
│   ├── SoloModeGraphs.tsx          # Analytics charts
│   ├── BehaviorStudyAdvices.tsx    # AI behavior analysis
│   ├── ThanosSnapOverlay.tsx       # Task completion animation
│   ├── WelcomeBanner.tsx           # Dismissible welcome banner
│   └── ui/                         # Shadcn UI components
└── styles/
    └── globals.css                 # Global styles and tokens

```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd taskmate-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### First Time Users
1. Click "Sign up" on the login page
2. Create your account with name, email, username, and password
3. Sign in with your credentials
4. Use the AI chat to describe your tasks or manually add them
5. Drag and drop tasks between columns to update status

### Key Features Guide

- **Add Task**: Click the "+ Add Task" button in the top bar
- **AI Chat**: Click the AI button in the bottom right to interact with the AI assistant
- **Profile**: Click your avatar in the top right to view your account details
- **Drag & Drop**: Drag tasks between Pending, In Progress, and Completed columns
- **Task Details**: Click any task card to view full details
- **Thanos Snap**: Watch the spectacular particle effect when completing tasks

## User Data Storage

Currently uses localStorage for user authentication. For production use, consider upgrading to:
- Supabase for backend authentication
- Firebase Auth
- Auth0 or similar authentication service

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is private and proprietary.

## Acknowledgments

- Design inspired by Linear, Notion, and Replit
- Icons from Lucide React
- UI components from Shadcn/ui
- Images from Unsplash
