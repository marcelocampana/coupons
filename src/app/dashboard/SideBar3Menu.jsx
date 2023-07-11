"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";

export default function SideBar3Menu({ setSidebarOpen }) {
  return (
    <>
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-custom-fuchsia-07e px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-white lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          Dashboard
        </div>
      </div>
    </>
  );
}
