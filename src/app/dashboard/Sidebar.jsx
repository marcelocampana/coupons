import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import {
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import SidebarTransition from "./SidebarTransition";
import SideBar3Menu from "./SideBar3Menu";
import ProfileButton from "./ProfileButton";

const teams = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default async function Sidebar({ children }) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data: currentUser } = await supabase.auth.getUser();

  let userRole;
  let businessAdmissionRequestId;
  if (currentUser.user !== null) {
    userRole = currentUser.user.user_metadata.role;
    if (currentUser.user.user_metadata.role === "business-admin") {
      let { data: business_admission_requests, error } = await supabase
        .from("business_admission_requests")
        .select("business_admission_request_id")
        .eq("applicant_user_id", currentUser.user.id);

      businessAdmissionRequestId =
        business_admission_requests[0]?.business_admission_request_id;
    } else {
      businessAdmissionRequestId = "";
    }
  }

  const navigation = [
    {
      name: "Inicio",
      href: "#",
      icon: HomeIcon,
      current: true,
      role: "all",
    },
    {
      name: "Solicitudes de ingreso",
      href: "/dashboard/admin/business/list",
      icon: ClipboardDocumentCheckIcon,
      current: false,
      role: "admin",
    },
    {
      name: "Mi registro",
      href: `/dashboard/business-admin/business/detail/${businessAdmissionRequestId}`,
      icon: BuildingOffice2Icon,
      current: true,
      role: "business-admin",
    },
    // {
    //   name: "Mi perfil",
    //   href: "#",
    //   icon: UsersIcon,
    //   current: false,
    //   role: "business-admin",
    // },
  ];

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <SidebarTransition />

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img className="h-10 w-auto" src="/logo.png" alt="Your Company" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) =>
                      item.role === userRole || item.role === "all" ? (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-indigo-700 text-white"
                                : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-indigo-200 group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      ) : null
                    )}
                  </ul>
                </li>
                <li className="hidden">
                  <div className="text-xs font-semibold leading-6 text-indigo-200">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-indigo-700 text-white"
                              : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <ProfileButton />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <SideBar3Menu />

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
