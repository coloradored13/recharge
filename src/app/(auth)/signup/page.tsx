'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  validateEmail,
  validatePassword,
  sanitizeString,
} from '@/lib/validation';

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeString(displayName);
    const cleanEmail = sanitizeString(email);

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      setError(passwordCheck.message);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    const { error: signUpError } = await signUp(
      cleanEmail,
      password,
      cleanName
    );

    if (signUpError) {
      setError(signUpError);
      setSubmitting(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold text-sage-800">
        Create your account
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="displayName"
            className="mb-1 block text-sm font-medium text-sage-700"
          >
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-lg border border-sage-200 px-3 py-2 text-sage-900 placeholder-sage-400 focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-400"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-sage-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sage-200 px-3 py-2 text-sage-900 placeholder-sage-400 focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-sage-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-sage-200 px-3 py-2 text-sage-900 placeholder-sage-400 focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-400"
            placeholder="Min. 8 characters"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm font-medium text-sage-700"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-sage-200 px-3 py-2 text-sage-900 placeholder-sage-400 focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-400"
            placeholder="Re-enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-sage-500">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-calm-600 hover:text-calm-700"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
