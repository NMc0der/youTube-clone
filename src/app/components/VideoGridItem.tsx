import React from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const viewFormatter = Intl.NumberFormat(undefined, {
  notation: "compact",
});

function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="block w-full h-full object-cover rounded-xl"
        />
        <div className="absolute bottom-1 right-1 bg-neutral-700 text-white text-sm px-.5 rounded">
          {formatDuration(duration)}
        </div>
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0"></a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-neutral-400 text-sm">
            {channel.name}
          </a>
          <div className="text-neutral-400 text-sm">
            {viewFormatter.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGridItem;
