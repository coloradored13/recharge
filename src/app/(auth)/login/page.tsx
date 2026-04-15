'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { validateEmail, sanitizeString } from '@/lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const cleanEmail = sanitizeString(email);

    if (!cleanEmail || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    const { error: signInError } = await signIn(cleanEmail, password);

    if (signInError) {
      setError(signInError);
      setSubmitting(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold text-sage-800">
        Welcome back
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-sage-200 px-3 py-2 text-sage-900 placeholder-sage-400 focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-400"
            placeholder="Your password"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-sage-500">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-medium text-calm-600 hover:text-calm-700"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
