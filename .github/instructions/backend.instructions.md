---
applyTo: '/server/**'
---

# Backend Development Instructions

## Architecture Overview

**Full-Stack Structure**: Express.js backend + Angular frontend, deployed together. The server serves both API endpoints (`/api/*`) and static Angular files in production.

**Migration Context**: This backend was migrated from Genezio infrastructure to self-hosted Express.js. The `server/src/*_interface.ts` files are legacy Genezio files; new code uses the Service/Controller/Route pattern.

### Core Architecture Pattern: Service → Controller → Route

```
Request → Route → Middleware → Controller → Service → Database
```

**Example Flow**:
```typescript
// 1. Route (auth.routes.ts)
router.post('/login', authController.login);

// 2. Controller (auth.controller.ts) - handles req/res
async login(req: Request, res: Response) {
  const result = await authService.login(req.body);
  res.json(result);
}

// 3. Service (auth.service.ts) - business logic
async login(loginData: LoginRequest): Promise<AuthResponse> {
  const user = await this.pool.query('SELECT ...');
  return { success: true, token: jwt.sign(...) };
}
```

## Directory Structure

```
server/src/
├── server.ts              # Express app entry point
├── config/
│   ├── db.ts             # PostgreSQL pool singleton
│   └── logger.ts         # Winston logging configuration
├── middleware/
│   └── auth.middleware.ts # JWT validation (authMiddleware, adminMiddleware)
├── routes/               # Express routers, mounted at /api/*
├── controllers/          # Request/response handlers
├── services/             # Business logic, database queries
├── *_interface.ts        # Legacy Genezio files (DO NOT MODIFY)
└── email_templates.ts    # Email HTML templates
```

## Database Access Pattern

**Singleton Pool Injection**: All services receive the database pool via constructor.

```typescript
// config/db.ts exports a singleton
const pool = new Pool({ connectionString: process.env.RACEFORFEDERICA_DB_DATABASE_URL });

// Services accept pool via constructor
export class AuthService {
  constructor(private pool: pg.Pool) {}
  
  async getUsers(): Promise<User[]> {
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows;
  }
}

// Controllers instantiate services with shared pool
import pool from '../config/db.js';
const authService = new AuthService(pool);
```

**Database Schema**: Entry-based result tables (`race_result_entries`, `sprint_result_entries`, etc.) store positions as rows, not columns. See `.github/instructions/db.instructions.md` for schema details.

## Authentication & Authorization

### Two-Level Middleware Chain

**authMiddleware** (JWT validation):
- Extracts `Authorization: Bearer <token>` header
- Verifies JWT signature with `process.env.JWT_SECRET`
- Decodes token payload: `{ userId, username, isAdmin }`
- Attaches `req.user` for downstream use
- Returns 401 if token missing/invalid/expired

**adminMiddleware** (admin check):
- Requires `authMiddleware` to run first
- Checks `req.user.isAdmin === true`
- Returns 403 if user not admin

### Route Protection Patterns

```typescript
// Public - no auth
router.post('/login', authController.login);

// Protected - requires valid JWT
router.post('/profile', authMiddleware, authController.getProfile);

// Admin only - requires JWT + admin flag
router.post('/users', authMiddleware, adminMiddleware, authController.getUsers);
```

**CRITICAL**: Always use both middleware for admin routes: `authMiddleware, adminMiddleware` (in that order).

### JWT Token Structure

```typescript
// Token created in auth.service.ts generateJWTToken()
jwt.sign({
  userId: user.id,
  username: user.username,
  isAdmin: user.is_admin  // From database
}, process.env.JWT_SECRET, { expiresIn: '24h' });
```

Session management: Tokens stored in `user_sessions` table with expiration tracking.

## Logging with Winston

**Logger Location**: `server/src/config/logger.ts`

### Log Levels (priority order)
1. **error**: Critical errors (database failures, authentication errors)
2. **warn**: Potentially harmful situations (rate limits, deprecated usage)
3. **info**: Application state (server start, successful operations)
4. **http**: HTTP requests (handled by Morgan middleware)
5. **debug**: Detailed debugging info

### Usage Pattern

```typescript
import logger from '../config/logger.js';

// Structured logging with metadata
logger.error('Database query failed', { 
  error: err.message, 
  stack: err.stack,
  userId: req.user?.userId
});

logger.info('User logged in', { userId: user.id, username: user.username });

// HTTP logging - automatic via Morgan in server.ts
// No manual HTTP logging needed
```

**Environment Behavior**:
- **Development**: Colorized console logs, level=debug
- **Production**: JSON files in `server/logs/` (error.log, combined.log), level=info

**Configuration**: Set `LOG_LEVEL` in `.env` (error|warn|info|http|debug)

## Error Handling Pattern

**Controllers**: Always wrap service calls in try-catch

```typescript
async someMethod(req: Request, res: Response): Promise<void> {
  try {
    const result = await service.doSomething(req.body);
    res.json(result);
  } catch (error) {
    logger.error('Operation failed', { error: error.message });
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Operation failed'
    });
  }
}
```

**Services**: Return structured responses with `success` boolean

```typescript
return {
  success: false,
  message: 'User not found'
};
```

## Development Commands

```bash
# Development with hot reload
npm run dev              # Uses tsx watch

# Build TypeScript
npm run build            # Outputs to dist/

# Production
npm start                # Runs compiled dist/server.js

# Environment setup
cp .env.example .env     # Then edit with actual credentials
```

**Required Environment Variables** (`.env`):
```env
RACEFORFEDERICA_DB_DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
MAIL_USER=email@example.com
MAIL_PASS=email-password
RACEFORFEDERICA_DREANDOS_SECRET=twitch-secret
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
```

## API Endpoint Conventions

**Base Path**: All API routes mounted under `/api/*`

**HTTP Method**: Use correct HTTP methods (GET, POST, PUT, DELETE) according to REST conventions.

**Request Body**: Optional parameters handled with optional chaining
```typescript
const seasonId = req.body?.seasonId ? parseInt(req.body.seasonId) : undefined;
```

**Response Format**: Always include `success` boolean
```typescript
{ success: true, data: [...] }
{ success: false, message: 'Error description' }
```
## Unit Testing
When implementing a new feature or fixing/refactoring, create unit tests for all possible scenarios, including edge cases.
tests must mock database interactions and external resources to ensure isolation and reliability.
**Testing Framework**: vitest
**Test Files**: server/tests/*.test.ts


## Testing with Postman

Pre-configured collections in `server/`:
- `F123Dashboard.postman_collection.json` - All API endpoints
- `F123Dashboard.postman_environment.json` - Local env
- `F123Dashboard.postman_environment.prod.json` - Production env

Auto-authentication flow implemented (see `server/POSTMAN_README.md`)

## Common Patterns

### Adding a New API Endpoint

1. **Service** (`services/*.service.ts`):
```typescript
async getNewData(param: string): Promise<DataType[]> {
  const result = await this.pool.query('SELECT * FROM table WHERE id = $1', [param]);
  return result.rows;
}
```

2. **Controller** (`controllers/*.controller.ts`):
```typescript
async getNewData(req: Request, res: Response): Promise<void> {
  try {
    const data = await service.getNewData(req.body.param);
    res.json(data);
  } catch (error) {
    logger.error('Error getting data:', error);
    res.status(500).json({ success: false, message: 'Failed to get data' });
  }
}
```

3. **Route** (`routes/*.routes.ts`):
```typescript
router.post('/new-data', (req, res) => controller.getNewData(req, res));
// Add authMiddleware if protected
```

4. **Import in server.ts**: Route already mounted if using existing router

### Database Query Pattern

Use parameterized queries to prevent SQL injection:
```typescript
// ✅ Correct
await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

// ❌ Wrong - SQL injection risk
await pool.query(`SELECT * FROM users WHERE id = ${userId}`);
```

## ES Modules Configuration

**Important**: This project uses ES modules (`"type": "module"` in package.json)

- Use `.js` extensions in imports: `import x from './file.js'`
- Use `import` syntax, not `require()`
- Get `__dirname` via:
```typescript
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## Key Files Reference

- **Architecture**: `server/src/server.ts` - Express app setup, middleware chain
- **Auth Flow**: `server/docs/authentication-flow.md` - Complete auth documentation
- **Database Schema**: `.github/instructions/db.instructions.md` - Entry-based result tables
- **Logging Guide**: `server/docs/winston-logging.md` - Winston usage and best practices

## Production Deployment

**Static Files**: Express serves Angular build from `client/dist/browser/` in production
**Fallback**: All non-API routes return `index.html` for Angular routing
**Environment**: Set `NODE_ENV=production` for file logging and optimizations
