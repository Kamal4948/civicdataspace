export default function SkeletonCard({ view }: { view: 'grid' | 'list' }) {
  if (view === 'list') {
    return (
      <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E8E3DC' }}>
        <div style={{ height: 2 }} className="skeleton" />
        <div className="p-5 flex gap-5">
          <div className="flex-1 space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
            <div className="skeleton h-12 w-full" />
            <div className="flex gap-2">{[1,2,3].map(i => <div key={i} className="skeleton h-5 w-16" />)}</div>
          </div>
          <div className="w-32 flex flex-col gap-3 items-end">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-9 w-9 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E8E3DC' }}>
      <div style={{ height: 2 }} className="skeleton" />
      <div className="p-5 space-y-4">
        <div className="skeleton h-5 w-5/6" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-16 w-full" />
        <div className="flex gap-2">{[1,2].map(i => <div key={i} className="skeleton h-5 w-14" />)}</div>
      </div>
      <div className="px-5 py-4" style={{ borderTop: '1px solid #E8E3DC' }}>
        <div className="skeleton h-4 w-1/3" />
      </div>
    </div>
  );
}
