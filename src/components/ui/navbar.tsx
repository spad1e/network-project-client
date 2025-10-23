"use client"
import { redirect } from "next/navigation"
import { usePathname } from "next/navigation"
export function NavBar(){
    const pathname = usePathname();
    if(pathname !== "/login") return (
    <div className="bg-secondary-blue fixed top-0 left-0 flex h-[70px] w-full items-center justify-between px-6 text-2xl font-bold text-white">
            <h1 className="text-shadow-red-custom">Game Network</h1>
            <h1
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => redirect("/login")}
            >
              Logout
            </h1>
    </div>
    );

    return;
}