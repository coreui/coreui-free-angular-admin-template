export const AUTH_CONSTANTS = {
  COOKIE_NAME: 'authToken',
  COOKIE_PATH: '/',
  COOKIE_MAX_AGE: 7 * 24 * 60 * 60, // 7 days in seconds
  
  STORAGE_KEYS: {
    USER: 'user',
    IS_LOGGED_IN: 'isLoggedIn'
  }
} as const;
