import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center md:pb-28 fade-in">
      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>New account</h1>
      <RegisterForm />
    </div>
  );
}