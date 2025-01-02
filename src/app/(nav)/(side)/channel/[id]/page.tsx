import { Channel } from "@/ui/channel/Channel";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return <Channel id={id} />;
}
