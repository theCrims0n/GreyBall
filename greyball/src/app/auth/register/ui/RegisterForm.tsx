"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { login } from '@/actions/auth/login';
import { registerUser } from '@/actions/auth/register';
import { Input } from '@/components/ui/input/Input';
import { Spinner } from '@/components/ui/spinner/Spinner';

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors, isLoading, isSubmitting } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;

    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace('/');

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8 w-full h-full md:w-[500px] md:h-[450px] box-shadow">

      <label className='text-sm' htmlFor="email">Complete Name</label>
      <Input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            { 'border-red-500': errors.name }
          )
        }
        type="text"
        autoFocus
        {...register('name', { required: true })}
      />

      <label className='text-sm' htmlFor="email">Email</label>
      <Input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.email
            }
          )
        }
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label className='text-sm' htmlFor="email">Password</label>
      <Input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            { 'border-red-500': errors.password }
          )
        }
        type="password"
        {...register('password', { required: true, minLength: 6 })}
      />

      <span className="text-red-500 text-sm">{errorMessage} </span>

      <button className="btn-primary">{isSubmitting ? <Spinner /> : 'Submit'}</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};
