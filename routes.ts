/**
 * An array of public routes that do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"]

/**
 * An array of protected routes that are used for authentication.
 * These routes will redirect logged-in users to the /settings page.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"]

/**
 * The API prefix for authentication routes.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"

/**
 * The default login redirect route after successful login.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings"
