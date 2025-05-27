"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from "lucide-react";
// import Button from "./Button";
import youtubeLogo from "@/app/assets/vecteezy_youtube-logo-png-youtube-logo-transparent-png-youtube-icon_23986704.png";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between items-center pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />

      <form
        className={`md:flex  gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden"
        }`}
      >
        {showFullWidthSearch && (
          <ArrowLeft
            onClick={() => setShowFullWidthSearch(false)}
            className="px-3 w-13 h-13 flex items-center justify-center p-2.5 bg-neutral-200  hover:bg-neutral-300 rounded-full cursor-pointer  "
          />
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border-neutral-300 shadow-inner outline-none focus:border-blue-500 border-1 shadow-neutral-200 py-1 px-4 text-lg w-full"
          />
          <Search
            // onClick={() => setShowFullWidthSearch(true)}
            className=" flex-shrink-0  border-1 border-neutral-300 border-l-0 py-2 px-3 rounded-r-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer w-13 h-13 flex items-center justify-center p-2.5"
          />
        </div>
        <Mic className="w-13 h-13  px-3 flex items-center justify-center p-2.5 bg-neutral-200  hover:bg-neutral-300 rounded-full cursor-pointer" />
      </form>
      <div
        className={`flex flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Search
          onClick={() => setShowFullWidthSearch(true)}
          className={`px-3 w-13 h-13 flex items-center justify-center p-2.5 md:hidden cursor-pointer  `}
        />
        <Mic className="px-3 w-13 h-13 flex items-center justify-center p-2.5 md:hidden cursor-pointer" />
        <Upload className="px-3 w-13 h-13 flex items-center justify-center p-2.5 cursor-pointer" />

        <Bell className=" px-3 w-13 h-13 flex items-center justify-center p-2.5 cursor-pointer" />

        <User className=" px-3 w-13 h-13 flex items-center justify-center p-2.5 cursor-pointer" />
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`flex gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Menu
        onClick={toggle}
        className="  w-13 h-13 flex items-center justify-center p-2.5 cursor-pointer"
      />
      <Link className="flex justify-center items-center" href={"/"}>
        <Image
          className="h-10 w-10 text-center flex justify-center items-center"
          alt="logo"
          src={youtubeLogo}
        />
        <span className="font-semibold text-xl">YouTube</span>
      </Link>
    </div>
  );
}
