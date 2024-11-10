import Avatar from "@/components/Avatar";
import { fetchVideoById } from "@/services/videoService";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const video = await fetchVideoById(id);

  return (
    <>
      <div
        className="relative w-full max-w-screen h-0"
        style={{ paddingTop: "45%" }}
      >
        <video
          className="absolute top-0 left-0 w-full h-full"
          controls
          autoPlay
          controlsList="nodownload"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold">{video.title}</h1>
        <div className="flex gap-2 mt-2">
          <Avatar />
          <div>
            <p>Channel name</p>
            <p>100 subscribers</p>
          </div>
        </div>
      </div>
    </>
  );
}
