import clsx from "clsx";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "placeholder-gray-900 placeholder-opacity-75 autofill-text flex h-10 w-full font-normal rounded-md box-shadow-input bg-[rgb(251, 251, 251)]  px-3 py-2 text-sm text-zinc-950 shadow-sm shadow-black/5 ring-offset-background transition-shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "placeholder-gray-900 placeholder-opacity-75 p-0 pr-3 italic text-zinc-950 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:px-3 file:text-sm file:font-medium file:not-italic file:text-zinc-950 ",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };