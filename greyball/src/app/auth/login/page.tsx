
import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center md:pb-28 fade-in">
      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Login</h1>
      <LoginForm />
    </div>
  );
}