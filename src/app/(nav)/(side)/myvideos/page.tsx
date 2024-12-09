"use client";

import { LoginButton } from "@/components/LoginButton";
import { useUser } from "@/context/userContext";
import { formatDate } from "@/lib/dateUtils";
import { VideoType } from "@/lib/definitions";
import { fetchByUserIds } from "@/services/publicVideoService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useUser();
  const [videos, setVideos] = useState<VideoType[]>([]);
  const pathname = usePathname();

  async function init() {
    if (user) {
      const res = fetchByUserIds([user.id]);
      setVideos(await res);
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  const notLoggedMyVideos = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold mb-5">My Videos</h1>
        <p className="mb-7">Please login to see your videos.</p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  const renderMyVideos = () => {
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
  };

  return <>{user ? renderMyVideos() : notLoggedMyVideos()}</>;
}
