'use client';

import { paginationNumbers } from "@/utils/paginationNumbers";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
            return `${pathname}`; //   href="/kid";
        }

        if (+pageNumber > totalPages) { // Next > 
            return `${pathname}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;

    }

    return (
        <div className="flex  text-center justify-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>
                            <ChevronLeft size={30} />
                        </Link>
                    </li>
                    {
                        allPages.map((page, index) => (

                            <li key={index} className="page-item lg:w-12 md:w-12 sm:w-12 w-6">
                                <Link
                                    className={
                                        clsx(
                                            "flex justify-center items-center md:text-md text-sm page-link relative block py-1.5 px-3 border-0 outline-none transition-all animation duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {
                                                'bg-cyan-600 shadow-sm text-white hover:text-white hover:bg-cyan-700': page === currentPage
                                            }
                                        )}
                                    href={createPageUrl(page)} >
                                    {page}
                                </Link>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <Link 
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <ChevronRight size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}