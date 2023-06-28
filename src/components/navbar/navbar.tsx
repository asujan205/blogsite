import React, { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const handleCreate = () => {
    try {
      router.push("/dashboard/post/create");
    } catch (error) {
      console.error("Create error:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {!session ? (
        <nav className="white:bg-gray-900 fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <span
              className="cursor-pointer self-center whitespace-nowrap text-2xl font-semibold dark:text-black"
              onClick={() => router.push("/")}
            >
              Home
            </span>

            <div className="flex justify-between gap-3 md:order-2">
              <button
                type="button"
                className="mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
                onClick={handleCreate}
              >
                Create Article
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => router.push("/signin")}
              >
                Login
              </button>

              <button
                type="button"
                className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => router.push("/signup")}
              >
                Signup
              </button>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="white:bg-gray-900 fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <span
              className="cursor-pointer self-center whitespace-nowrap text-2xl font-semibold dark:text-black"
              onClick={() => router.push("/")}
            >
              Home
            </span>

            <div className="flex justify-between gap-3 md:order-2">
              <button
                type="button"
                className="mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
                onClick={handleCreate}
              >
                Create Article
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => router.push("/dashboard/post")}
              >
                My Articles
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
