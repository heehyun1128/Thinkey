"use client";

import { LayoutPanelLeft,MessagesSquare,Palette,AudioWaveform,PlaySquare,Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

import {cn} from "@/lib/utils"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutPanelLeft,
    href: "/dashboard",
    color: "text-pink-500",
  },
  {
    label: "Chat",
    icon: MessagesSquare,
    href: "/chat",
    color: "text-orange-500",
  },
  {
    label: "AI Image",
    icon: Palette,
    href: "/image",
    color: "text-green-500",
  },
  {
    label: "AI Audio",
    icon: AudioWaveform,
    href: "/audio",
    color: "text-sky-500",
  },
  {
    label: "AI Video",
    icon: PlaySquare,
    href: "/video",
    color: "text-purple-500",
  },
  // {
  //   label: "Settings",
  //   icon: Settings,
  //   href: "/settings",
  //   color: "text-gray-500",
  // },
];


const Sidebar = () => {
    const pathname=usePathname()
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#f6e399] text-gray">
      <div className="px-6 py-4 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-xl">
            <div className="relative w-36 h-8 p-5 ml-8">
            <Image fill src="/logo.jpg" alt="logo" />
            </div>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn("text-base group flex w-full p-5 justify-start cursor-pointer hover:text-white hover:bg-gray-500/30",
              pathname===route.href? "text-white bg-gray-500/30": "text-gray"
              )}
            >
              <div className="flex">
                <route.icon className={route.color} />
                <p className="px-3">{route.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
