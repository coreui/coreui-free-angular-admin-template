---
applyTo: '**'
---

# Project Code Generation Instructions

## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements
- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file
- Place view components in `src/app/views/<feature>/`
- Place reusable UI components in `src/components/`
- Use `templateUrl` and `styleUrl` for external HTML and SCSS files, named after the component
- Use `OnInit` lifecycle hook for initialization logic
- Use `RouterLink` for navigation
- Use PascalCase for component class names and kebab-case for filenames
- Import all required modules and directives explicitly in the `imports` array
- Name event handlers for what they do, not for the triggering event
- Keep lifecycle methods simple

## State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available
- Do not write arrow functions in templates (they are not supported)

## Services
- Place new services in `src/app/service/`
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- Use `ApiService` for all API calls to the Express backend (never use `HttpClient` directly)
- Use RxJS for asynchronous operations and state management
- Name services with the `Service` suffix (e.g., `UserService`)
- Import shared types for API from `@f123dashboard/shared` package

## Routing
- Add new routes in `src/app/app.routes.ts` and/or feature-specific `routes.ts` files
- Use lazy loading for feature modules/components
- Use route `data` for titles and metadata
- Define routes in a `routes.ts` file within the feature folder
- Use lazy loading with `loadComponent: () => import('./feature.component').then(m => m.FeatureComponent)`
- Add route metadata (e.g., `data: { title: $localize`Feature` }`)

## Testing
- Place unit tests alongside the code, using the `.spec.ts` suffix
- Use Angular's `TestBed` for setting up tests
- Test creation and basic logic for all components and services
- Mock dependencies and services as needed

## Folder Structure
- Follow the existing structure:
  - `src/app/views/` for main app views
  - `src/app/service/` for services
  - `src/components/` for reusable components
  - `src/app/icons/` for icon sets
  - `src/assets/` for images and static assets
  - `src/scss/` for global styles

## Style
- Use SCSS for all styles
- Use CoreUI and project SCSS variables and mixins
- Keep styles modular and component-scoped
- Use the `app-` prefix for selectors

## General
- Use CoreUI components and directives where possible (see imports in existing components)
- Use Angular CLI commands for scaffolding (e.g., `ng generate component`, `ng generate service`)
- Use `ApiService` for all HTTP API calls to the Express backend
- Import types from `@f123dashboard/shared` package for type definitions
- Use constants and do not repeat yourself
- Make the code simple to read with clear variable and method names
- Comments should be avoided and used only to explain public class/method/variable with TSDoc standard
- Use Guard Clause to reduce nesting and improve readability

## Naming Conventions
- Use English for all code, comments, and documentation
- Use descriptive, self-explanatory names for variables, methods, and classes
- Use PascalCase for class names
- Use camelCase for variables and methods
- Use kebab-case for file and folder names (e.g., `leaderboard.component.ts`)

## Internationalization
- Use Angular `$localize` for all user-facing strings

## Example CLI Commands
- Generate a component: `ng generate component app/views/example --standalone --style=scss`
- Generate a service: `ng generate service app/service/example`

## References
- [CoreUI Angular Docs](https://coreui.io/angular/docs/)
- [Angular CLI Docs](https://angular.io/cli)

## Backend Architecture
- **Express Backend**: `server/` contains the Express.js backend
  - `server/src/services/` - Business logic services
  - `server/src/controllers/` - Request/response handlers
  - `server/src/routes/` - API route definitions
  - `server/src/middleware/` - Authentication and other middleware
  - `server/src/config/` - Database and configuration files
- **Shared Types**: `shared/` contains TypeScript type definitions
  - `shared/src/models/` - Type definitions (auth, database, fanta, playground, twitch)
  - `shared/src/index.ts` - Barrel export for all types
  - Both client and server import from `@f123dashboard/shared`
- **Angular Client**: `client/` contains the Angular application
  - Uses `ApiService` for all HTTP calls to Express backend
  - Imports types from `@f123dashboard/shared`
  
## API Communication
- **Development**: Angular dev server proxies `/api/*` requests to `http://localhost:3000`
- **Production**: Express serves the built Angular app and handles `/api/*` routes
- **Endpoints**: All API routes are prefixed with `/api/` (e.g., `/api/database/drivers`, `/api/auth/login`)
- **Authentication**: JWT tokens passed via `Authorization: Bearer <token>` header
- Use `ApiService.post<T>()`, `ApiService.get<T>()`, etc. for type-safe API calls

## Type Definitions
- **Never** define types inline in services or components
- **Always** import types from `@f123dashboard/shared`
- Example: `import type { User, DriverData, FantaVote } from '@f123dashboard/shared';`
- Use `type` imports for better tree-shaking and clarity

## Development Workflow
- **Shared Package**: Run `npm run build` in `shared/` after modifying types
- **Server**: Run `npm run dev` in `server/` for development with auto-reload
- **Client**: Run `npm start` in `client/` for Angular dev server with proxy
- **Full Build**: Run `npm run build` from root to build all packages in order

## Commit Message Convention
- Follow the conventional commit message format as described in `.github/COMMIT_CONVENTION.md`
- Use a clear header with type, optional scope, and subject: `<type>(<scope>): <subject>`
- Types include: `feat`, `fix`, `perf`, `docs`, `chore`, `style`, `refactor`, `test`, and `revert`
- Use the imperative, present tense in the subject (e.g., "add feature" not "added feature")
- Reference issues and breaking changes in the footer as needed
- See the `.github/COMMIT_CONVENTION.md` file for detailed examples and rules

---
