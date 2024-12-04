"use client";

import { useUser } from "@/context/userContext";
import { formatDate } from "@/lib/dateUtils";
import { VideoType } from "@/lib/definitions";
import { fetchByUserIds } from "@/services/publicVideoService";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useUser();
  const [videos, setVideos] = useState<VideoType[]>([]);

  async function init() {
    if (user) {
      const res = fetchByUserIds([user.id]);
      setVideos(await res);
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-4xl font-extrabold my-5">My Videos</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Video</th>
            <th>Visibility</th>
            <th>Date</th>
            <th>Views</th>
            <th>Comments</th>
            <th>Likes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => {
            return (
              <tr key={video.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                      <div className="h-24 w-40">
                        <video className="rounded-xl">
                          <source src="/video.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{video.title}</div>
                      <div className="text-sm opacity-50 text-ellipsis line-clamp-2">
                        {video.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td>Public</td>
                <td className="w-32">{formatDate(video.createdAt)}</td>
                <td>{video.views}</td>
                <td>100</td>
                <td>10</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
