export default function Wrapper(params: { children: React.ReactNode, className?: string, positionX?: string, positionY?: string }) {

  const horizontalAlignment = params.positionX === 'center' ? 'justify-center' : params.positionX === 'left' ? 'justify-start' : 'justify-end';
  const verticalAlignment = params.positionY === 'center' ? 'items-center' : params.positionY === 'top' ? 'items-start' : 'items-end';

  return (
    <div className={`fixed left-0 top-0 flex ${horizontalAlignment} ${verticalAlignment} z-[98234] w-full h-full overflow-y-auto p-4`}>
      <div className={params.className}>
        {params.children}
      </div>
    </div>
  );
}
