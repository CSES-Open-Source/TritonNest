# 🏡 TritonNest

A trusted housing and roommate matching platform, gated by verified UCSD email accounts, for secure sublease discovery and reliable roommate compatibility.

Off-campus housing is chaotic. Students deal with unvetted social media groups, scam risks, and blind negotiations over habits. TritonNest is a student-governed network tied to verified university emails, so anonymous bad actors are shut out.

## Features

| Feature                    | Description                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| **Sublease Marketplace**   | Post and discover subleases with verified student profiles and lease terms.  |
| **Housing Filters**        | Compare commute times to campus, nearby grocery/dining options, and rent.    |
| **In-App Messaging**       | Coordinate property walkthroughs and discuss logistics in real time.         |
| **Compatibility Matching** | Match on sleep schedules, cleanliness, study habits, and pet/guest policies. |
| **UCSD SSO Verification**  | Campus identity verification that builds mutual trust and safety.            |

## Tech Stack

| Layer               | Tools                                                                          |
| ------------------- | ------------------------------------------------------------------------------ |
| Frontend            | React 19, Vite, TailwindCSS v4, React Router                                   |
| Backend             | Node.js 24, Express 5, Socket.io (real-time chat)                              |
| Database & Storage  | MongoDB (Mongoose), Firebase Storage (AWS S3 as an alternative)                |
| Auth & Integrations | Firebase Auth (UCSD SSO through the Microsoft provider), Google Maps API       |
| Tooling             | npm workspaces, ESLint, Prettier, Node test runner + Supertest, GitHub Actions |

## Repository Structure

```
TritonNest/
├── client/                    # React + Vite + Tailwind frontend
│   └── src/
│       ├── components/        # Shared UI (Layout, ProtectedRoute, ...)
│       ├── context/           # AuthProvider + useAuth hook
│       ├── features/          # One folder per workstream (see below)
│       │   ├── auth/          #   profile + verification UI
│       │   ├── listings/      #   sublease marketplace
│       │   ├── filters/       #   housing filters + maps
│       │   ├── messaging/     #   real-time chat
│       │   └── matching/      #   roommate compatibility
│       ├── lib/               # firebase.js, api.js (fetch + token), socket.js
│       └── pages/             # Top-level pages (Home, Login, NotFound)
├── server/                    # Express + Socket.io API
│   ├── src/
│   │   ├── config/            # env, MongoDB, Firebase Admin
│   │   ├── middleware/        # requireAuth (UCSD check), error handling
│   │   ├── models/            # User, Listing, Conversation, Message
│   │   ├── routes/            # /api/health, /api/users, /api/listings
│   │   ├── services/          # maps.js (Google Maps), storage.js (Firebase Storage)
│   │   ├── socket/            # Socket.io chat handlers
│   │   ├── app.js             # Express app (imported by tests)
│   │   └── index.js           # Entry: DB connect + HTTP + sockets
│   └── test/
├── .github/                   # CI workflow, PR + issue templates
└── docker-compose.yml         # Local MongoDB
```

## Getting Started

### Prerequisites

- **Node.js 24+** (`nvm install && nvm use` reads `.nvmrc`). Firebase v13 requires Node 24.12 or later.
- **Git**
- **MongoDB**: either [Docker Desktop](https://www.docker.com/products/docker-desktop/) for a local instance, or a connection string for the team's MongoDB Atlas cluster
- Access to the team **Firebase project** and **Google Maps API keys** (ask the EM)

### Setup

```bash
git clone https://github.com/CSES-Open-Source/TritonNest.git
cd TritonNest
nvm use
npm install                                  # installs client + server (npm workspaces)

cp server/.env.example server/.env           # then fill in values
cp client/.env.example client/.env.local     # then fill in values

npm run db:up                                # start local MongoDB (or set MONGODB_URI to Atlas)
npm run dev                                  # starts server :4000 and client :5173
```

Open http://localhost:5173. Check the API at http://localhost:4000/api/health.

### Environment Variables

Each env file is documented inline. See [`server/.env.example`](server/.env.example) and [`client/.env.example`](client/.env.example).

| Where  | Variable                        | Purpose                                            |
| ------ | ------------------------------- | -------------------------------------------------- |
| server | `MONGODB_URI`                   | Mongo connection string                            |
| server | `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase Admin credentials for verifying ID tokens |
| server | `ALLOWED_EMAIL_DOMAIN`          | Defaults to `ucsd.edu`                             |
| server | `GOOGLE_MAPS_API_KEY`           | Server-side Distance Matrix / Places               |
| client | `VITE_FIREBASE_*`               | Firebase web app config                            |
| client | `VITE_MICROSOFT_TENANT_ID`      | UCSD's Azure AD tenant for SSO                     |
| client | `VITE_GOOGLE_MAPS_API_KEY`      | Browser Maps key (referrer-restricted)             |

> [!CAUTION]
> Never commit `.env` files or service-account JSON. Both are gitignored. Share secrets through the team's password manager, not Slack.

### Scripts (run from the repo root)

| Command                                     | What it does                                   |
| ------------------------------------------- | ---------------------------------------------- |
| `npm run dev`                               | Run client and server together with hot reload |
| `npm run dev:client` / `npm run dev:server` | Run one side only                              |
| `npm test`                                  | Server tests (Node test runner + Supertest)    |
| `npm run lint` / `npm run lint:fix`         | ESLint across the monorepo                     |
| `npm run format` / `npm run format:check`   | Prettier                                       |
| `npm run build`                             | Production build of the client                 |
| `npm run db:up` / `npm run db:down`         | Start/stop local MongoDB                       |
| `npm install <pkg> -w client`               | Add a dependency to one workspace              |

## How Auth Works

1. The client signs in with Firebase Auth through the **Microsoft provider** (UCSD accounts are Microsoft 365), restricted to UCSD's tenant.
2. Every API request sends `Authorization: Bearer <Firebase ID token>`. This is handled automatically by `client/src/lib/api.js`.
3. The server's `requireAuth` middleware verifies the token with Firebase Admin and **rejects any email not ending in `@ucsd.edu`**. The client-side check is for UX only. The server is the source of truth.
4. Socket.io connections pass the same token in `auth.token` and are verified the same way.

## API Overview

| Method         | Route                | Auth | Status                          |
| -------------- | -------------------- | ---- | ------------------------------- |
| GET            | `/api/health`        | No   | ✅                              |
| GET / PATCH    | `/api/users/me`      | Yes  | ✅ basic                        |
| GET            | `/api/listings`      | Yes  | ✅ basic (rent/bedroom filters) |
| GET            | `/api/listings/:id`  | Yes  | ✅                              |
| POST           | `/api/listings`      | Yes  | ✅ basic                        |
| PATCH / DELETE | `/api/listings/:id`  | Yes  | 🚧 TODO                         |
| `*`            | `/api/conversations` | Yes  | 🚧 TODO                         |
| `*`            | `/api/matches`       | Yes  | 🚧 TODO                         |

Socket events: `conversation:join`, `message:send` → `message:new`.

## Workstreams

The codebase is split so each developer owns one vertical slice, frontend through backend. Search the code for `TODO(<workstream>)` to find starter tasks.

| #   | Workstream                 | Owner | Client                                | Server                                                           | First milestones                                                                     |
| --- | -------------------------- | ----- | ------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | **Auth & Profiles**        | _TBD_ | `features/auth`, `context/`           | `middleware/auth.js`, `routes/users.js`, `models/User.js`        | Firebase project + Microsoft provider configured, profile edit form, onboarding flow |
| 2   | **Sublease Marketplace**   | _TBD_ | `features/listings`                   | `routes/listings.js`, `models/Listing.js`, `services/storage.js` | Create-listing form, photo uploads, listing detail page, edit/delete                 |
| 3   | **Housing Filters & Maps** | _TBD_ | `features/filters`                    | `services/maps.js`                                               | Rent/date filters UI, commute times to campus, nearby grocery/dining, map view       |
| 4   | **In-App Messaging**       | _TBD_ | `features/messaging`, `lib/socket.js` | `socket/`, `models/Conversation.js`, `models/Message.js`         | Conversations API, persist messages, chat UI, unread counts                          |
| 5   | **Compatibility Matching** | _TBD_ | `features/matching`                   | `models/User.js` (preferences), new `routes/matches.js`          | Preferences questionnaire, scoring algorithm, ranked matches page                    |

Shared files (`App.jsx`, `Layout.jsx`, `routes/index.js`, `models/User.js`) are touched by several workstreams. Keep changes to them small and call them out in your PR.

## Open Decisions

- **Storage:** Firebase Storage is wired up by default. Switch to S3 only if needed. `services/storage.js` is the single swap point.
- **Hosting:** not chosen yet (e.g. Vercel for the client, Render/Railway/Fly for the server, MongoDB Atlas).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branching, commit, and PR workflow.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For issues or questions, open a GitHub issue, reach out to the engineering manager, or contact the UC San Diego CSES Open Source Society.
