export default function PageHeader({title}: {title: string}) {
  return (
    <h1 className="font-bold text-2xl border-0 border-black border-b-2">{title}</h1>
  );
}