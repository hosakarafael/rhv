import Avatar from "@/components/Avatar";
import { Video } from "@/components/Video";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return <Video id={id} />;
}
