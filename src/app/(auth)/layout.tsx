import { AuthProvider } from '@/contexts/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen items-center justify-center bg-calm-50">
        <div className="w-full max-w-md px-4">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold text-sage-800">
              Recharge
            </h1>
            <p className="mt-1 text-sm text-sage-500">
              Focus better. Recover smarter.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
