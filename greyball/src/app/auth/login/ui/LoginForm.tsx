"use client";

import { useActionState, useEffect } from 'react';
import Link from "next/link";
import { useFormStatus } from "react-dom";
import clsx from 'clsx';
import { authenticate } from '@/actions/auth/login';
import { CircleX } from 'lucide-react';
import { Input } from '@/components/ui/input/Input';
import { Spinner } from '@/components/ui/spinner/Spinner';

export const LoginForm = () => {

  const [state, dispatch] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }

  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col p-8 w-full h-full md:w-[500px] md:h-[400px] box-shadow-card">
      <label className='text-sm' htmlFor="email">Email</label>
      <Input
        className="px-5 py-2 mb-5"
        type="email"
        name="email"
      />

      <label className='text-sm' htmlFor="email">Password</label>
      <Input
        className="px-5 py-2 mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <CircleX className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credentials are not correct
            </p>
          </div>
        )}
      </div>

      <LoginButton />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/register" className="btn-secondary text-center">
        Register an account
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={pending}
    >
      {pending ? <Spinner size={20}/> : 'Submit'}
    </button>
  );
}
