# Contributing to TritonNest

Thanks for contributing to TritonNest! This guide covers local setup, our workflow, and how to get a PR merged.

## Installation

### Prerequisites

- [Node.js 24+](https://nodejs.org/). We recommend [nvm](https://github.com/nvm-sh/nvm): `nvm install && nvm use`
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) for local MongoDB, or the team Atlas URI

### Install

```bash
git clone https://github.com/CSES-Open-Source/TritonNest.git
cd TritonNest
nvm use
npm install
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

Ask the EM for Firebase and Google Maps credentials, then fill in both env files.

## Development Setup

### Run the app

```bash
npm run db:up   # local MongoDB
npm run dev     # client on :5173, server on :4000
```

### Pre-commit hooks

`npm install` sets up [Husky](https://typicode.github.io/husky/) automatically. On every commit, [lint-staged](https://github.com/lint-staged/lint-staged) runs ESLint (`--fix`) and Prettier on your staged files. If ESLint finds errors it can't fix, the commit is blocked. Fix them and commit again. Don't bypass the hook with `--no-verify`, because CI runs the same checks.

### Run the linter and formatter

```bash
npm run lint
npm run format
```

### Run tests

```bash
npm test
```

### Build

```bash
npm run build
```

> [!IMPORTANT]
> CI runs `lint`, `format:check`, `test`, and `build` on every PR. Run them locally before pushing.

## Workflow

1. **Pick or open an issue** using the issue template. Assign yourself.
2. **Branch from `main`**: `<type>/<short-description>`, e.g. `feat/listing-photo-upload`, `fix/chat-reconnect`.
3. **Commit** with [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`. An optional scope helps, e.g. `feat(messaging): persist messages`.
4. **Keep PRs small**, ideally under ~400 lines and focused on one issue.
5. **Open a PR** using the template. Link the issue (`Closes #12`), request a reviewer, and ping them on Slack.
6. **Get 1 approval and green CI**, then **squash and merge**. Delete your branch afterward.

## Code Guidelines

- Put feature code in its workstream folder (`client/src/features/<name>`, plus the matching server route/model). See the Workstreams table in the [README](README.md#workstreams).
- **Never trust the client for auth.** Every non-public route uses `requireAuth`, and authorization checks (e.g. "is this my listing?") happen on the server.
- Validate request bodies on the server. Only accept fields you expect (see `routes/users.js` for the allowlist pattern).
- Never commit secrets. GitHub secret scanning with push protection will block pushes containing known key formats.
- New server env vars go in **both** `server/src/config/env.js` (validated with [envalid](https://github.com/af/envalid), so the server fails fast with a clear message) and `server/.env.example`.
- Add a server test in `server/test/` for each new route.
- Use Tailwind utility classes. UCSD brand colors are available as `triton-navy`, `triton-blue`, and `triton-gold`.

## Issue Labels

When opening issues or reviewing pull requests, apply the most relevant label(s) to help with triage:

| Label              | When to Use                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `bug`              | A reproducible error, crash, or incorrect behavior in TritonNest.        |
| `feature`          | A new capability that does not exist yet.                                |
| `enhancement`      | Improvements to existing features, performance, or developer experience. |
| `docs`             | Documentation updates, typos, or README/CONTRIBUTING changes.            |
| `refactor`         | Code cleanup or restructuring without changing behavior.                 |
| `ci`               | Issues related to GitHub Actions, testing, or build pipelines.           |
| `good first issue` | Small, well-scoped issues suitable for new contributors.                 |

Workstream labels (`area:auth`, `area:listings`, `area:filters`, `area:messaging`, `area:matching`) show which slice an issue belongs to.

**Tips:**

- Most issues should have **one primary label** plus one `area:` label.
- PRs should ideally match the labels of the issue they close.
