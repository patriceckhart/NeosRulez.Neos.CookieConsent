export default function Cookie(params: { name: string, description: string, lifetime: string }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="w-32 max-w-32 min-w-32 h-8 text-center bg-primary/20 text-primary/70 text-xs flex items-center justify-center p-2">{params.name}</div>
      <div className="text-sm">
        {params.description}
      </div>
      <div className="text-sm whitespace-nowrap text-end text-primary/70">{params.lifetime}</div>
    </div>
  );
}
