import React from "react";

import Link from "next/link";
const Header: React.FC = () => {
  return (
    <>
      <nav className="white:bg-gray-900 fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-black">
            Home
          </span>

          <div className="flex justify-between gap-3 md:order-2">
            <button
              type="button"
              className="mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
            >
              Create Article
            </button>
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>

            <button
              type="button"
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Signup
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
