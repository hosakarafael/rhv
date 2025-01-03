import { EditVideoForm } from "@/ui/edit/EditVideoForm";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return <EditVideoForm id={id} />;
}
