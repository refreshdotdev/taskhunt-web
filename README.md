# TaskHunt.ai Frontend

React frontend for TaskHunt.ai - a platform for exploring Terminal Bench tasks.

## Setup

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (optional, defaults to proxy in development)

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Jotai (state management)
- React Query (data fetching)
- React Router
- Lucide Icons

## Design

The design is based on the t-bench-visualizer project, featuring:

- Warm cream background (#faf9f7)
- Teal primary color (#2d5a5a)
- Gold accent color (#c4a574)
- Glass morphism effects
- Inter font family

## Development

```bash
# Type check
bun run check

# Preview production build
bun run preview
```
