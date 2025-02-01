'use client';

import { paginationNumbers } from "@/utils/paginationNumbers";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;
    const allPages = paginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`
        }

        if (+pageNumber <= 0) {
            return `${pathname}`;
        }

        if (+pageNumber > totalPages) {
            return `${pathname}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;

    }

    return (
        <div className="flex justify-center items-center space-x-1 mt-10 mb-32 pr-2">
            <Link href={createPageUrl(currentPage - 1)} className="rounded-md border border-zinc-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-zinc-600 hover:text-white hover:bg-zinc-800 hover:border-zinc-800 focus:text-white focus:bg-zinc-800 focus:border-zinc-800 active:border-zinc-800 active:text-white active:bg-zinc-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Prev
            </Link>
            {
                allPages.map((page, index) => (
                    <Link key={index} href={createPageUrl(page)} className={clsx("animation duration-300 ease-in-out min-w-9 rounded-md bg-zinc-800 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-zinc-700 focus:shadow-none active:bg-zinc-700 hover:bg-zinc-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2", currentPage == page && 'bg-zinc-600')}>
                        {page}
                    </Link>
                ))
            }
            <Link href={createPageUrl(currentPage + 1)} className="min-w-9 rounded-md border border-zinc-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-zinc-600 hover:text-white hover:bg-zinc-800 hover:border-zinc-800 focus:text-white focus:bg-zinc-800 focus:border-zinc-800 active:border-zinc-800 active:text-white active:bg-zinc-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Next
            </Link>
        </div >

    );
}