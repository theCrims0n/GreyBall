import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link
        href='/'
        className="mx-3"
      >
        Greyball Test
      </Link>

      <Link
        href='/'
        className="mx-3"
      >
        {`Miguel Angel Salomon Villegas ` + new Date(Date.now()).getFullYear()} 
      </Link>
      <Link
        href='https://github.com/theCrims0n?tab=repositories' rel="noopener noreferrer" target="_blank"
        className="mx-3"
      >
        GitHub Account
      </Link>
    </div>
  )
}