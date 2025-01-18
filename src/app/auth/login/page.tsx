import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[400px]">
        <LoginForm />
      </div>
    </div>
  );
}
