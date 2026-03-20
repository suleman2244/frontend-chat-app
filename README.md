# Doodle Team Chat

Frontend for the [Doodle chat challenge](https://github.com/DoodleScheduling/hiring-challenges/tree/master/frontend-engineer). Built with Next.js 15, TypeScript, and React Query.

## Setup

Make sure the [chat API backend](https://github.com/DoodleScheduling/frontend-challenge-chat-api) is running on `localhost:3000` first.

```bash
npm install
PORT=3001 npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## How it works

The app fetches messages from the API and displays them in a chat layout. Your messages show up on the right, everyone else's on the left. Messages are polled every second so new ones appear in near real-time.

Sending a message hits `POST /api/v1/messages` — an optimistic update shows it immediately while the request goes through.

## Stack

- **Next.js 15** with App Router
- **TypeScript**
- **React Query** for data fetching and caching
- **Axios** as HTTP client
- **CSS Modules** for scoped styling

## Project structure

```
src/
├── app/              → layout, page, global styles
├── components/
│   ├── Chat/         → ChatHeader, ChatLayout, MessageBubble,
│   │                   MessageInput, MessageList
│   └── Providers.tsx → React Query setup
├── hooks/
│   └── useMessages.ts → data fetching + send mutation
└── lib/
    └── api.ts         → axios config + types
```

## Key decisions

- **Polling over WebSocket**: the API doesn't expose a socket, so 1s polling keeps things responsive
- **`useInfiniteQuery`**: supports cursor-based pagination through the `before` param
- **Optimistic updates**: messages appear instantly, then sync with the server on settle
- **CSS Modules**: keeps styles scoped without needing a utility framework

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # eslint
npx tsc --noEmit  # type check
```
