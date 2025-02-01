"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/ui/ui-store";
import { ListOrdered, LogIn, LogOut, Search, SidebarClose, Store, User, Users } from "lucide-react";
import { logout } from "@/actions/auth/logout";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 "
        />
      )}

      <nav
        className={clsx(
          " fixed p-5 left-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
             !isSideMenuOpen ? "-translate-x-full"  : 'translate-x-0'
        )}
      >
        <SidebarClose
          size={25}
          className="absolute top-5 right-5 cursor-pointer text-sm"
          onClick={() => closeMenu()}
        />

        <div className="relative mt-14 ">
          <Search size={20} className="absolute top-1 left-2 text-sm" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={() => closeMenu()}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <User size={25} />
              <span className="ml-3 text-sm">Profile</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <ListOrdered size={25} />
              <span className="ml-3 text-sm">Orders</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            className="flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => [logout(), closeMenu()]}
          >
            <LogOut size={25} />
            <span className="ml-3 text-sm">Log Out</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <LogIn size={25} />
            <span className="ml-3 text-sm">Log In</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              href="/admin/products"
              onClick={() => closeMenu()}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <Store size={25} />
              <span className="ml-3 text-sm">Products</span>
            </Link>

            <Link
              href="/admin/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <ListOrdered size={25} />
              <span className="ml-3 text-sm">Orders</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={() => closeMenu()}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <Users size={25} />
              <span className="ml-3 text-sm">Users</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
