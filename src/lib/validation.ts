/**
 * Input sanitization and validation utilities.
 */

/**
 * Sanitize a string by trimming whitespace and removing HTML tags.
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/<[^>]*>/g, '');
}

/**
 * Validate that a string is a well-formed email address.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password strength.
 * Requirements: minimum 8 characters, at least one letter, at least one number.
 */
export function validatePassword(password: string): {
  valid: boolean;
  message: string;
} {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' };
  }

  if (!/[a-zA-Z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one letter.',
    };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one number.',
    };
  }

  return { valid: true, message: '' };
}

/**
 * Escape HTML entities to prevent XSS when rendering user-provided text.
 */
export function sanitizeForDisplay(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return input.replace(/[&<>"']/g, (char) => map[char]);
}
