# Authentication Services

This directory contains the authentication-related services for the Angular application.

## Services

### AuthService (`auth.service.ts`)
Main authentication service that handles:
- User login with API integration
- Token management (storage, retrieval, expiration)
- User session management
- Role-based access control
- Logout functionality

**API Endpoint**: `https://localhost:44309/api/Account/login`

**Features**:
- Automatic token storage in localStorage
- Token expiration handling
- Current user observable
- Role-based permissions
- Error handling for various HTTP status codes

### AuthGuard (`auth.guard.ts`)
Route guard that protects routes requiring authentication:
- Checks if user is authenticated
- Redirects to login page if not authenticated
- Can be applied to any route that requires authentication

### AuthInterceptor (`auth.interceptor.ts`)
HTTP interceptor that:
- Automatically adds Authorization header with Bearer token
- Handles 401 Unauthorized responses
- Automatically logs out user on token expiration
- Redirects to login page on authentication failures

## Usage

### Login Component
The login component is already integrated with the AuthService and will:
- Handle form validation
- Show loading states
- Display error messages
- Redirect to dashboard on successful login

### Protected Routes
Routes are protected by adding the AuthGuard:
```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
```

### Manual Authentication Check
```typescript
// Check if user is authenticated
if (this.authService.isAuthenticated()) {
  // User is logged in
}

// Get current user
const user = this.authService.getCurrentUser();

// Check user roles
if (this.authService.hasRole('admin')) {
  // User has admin role
}
```

### Logout
```typescript
// Logout user
this.authService.logout();
```

## API Integration

The authentication system expects the following API response format:

```typescript
interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
  };
}
```

## Configuration

The API endpoint can be modified in `auth.service.ts`:
```typescript
private readonly API_URL = 'https://localhost:44309/api/Account/login';
``` 