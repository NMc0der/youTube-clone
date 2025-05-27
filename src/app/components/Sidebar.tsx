"use client";

import React, { ElementType, ReactNode, useState } from "react";
import { StaticImageData } from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";

import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="shorts" url="/" />
        <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/" />
        <SmallSidebarItem Icon={Library} title="Library" url="/" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-neutral-700 opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 
      lg:flex  flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${
          isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"
        }`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky-top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/"
          />
        </LargeSidebarSection>
        <hr className="" />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Library}
            title="Library"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={History}
            title="History"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={PlaySquare}
            title="PlaySquare"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              isActive={false}
              key={playlist.id}
              title={playlist.name}
              url="/"
              IconOrImgUrl={ListVideo}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              isActive={false}
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url="/"
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Flame}
            title="Trending"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Music2}
            title="Music"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Radio}
            title="Live"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Newspaper}
            title="News"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className="py-4 px-1 flex flex-col rounded-lg gap-1 items-center"
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title} </div>}
      {visibleChildren}
      {showExpandButton && (
        <button
          className="w-full flex items-center rounded-lg gap-4 p-3 cursor-pointer"
          onClick={() => setIsExpanded((e) => !e)}
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={`w-full flex items-center rounded-lg gap-4 p-3 hover:bg-neutral-200 ${
        isActive ? "font-bold bg-neutral-100 text-black " : undefined
      }`}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} alt="" className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
        // <img src={IconOrImgUrl} alt="" />
        // <div>yo</div>
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

export default Sidebar;
