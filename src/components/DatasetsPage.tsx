'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GridView, ViewList, Search, KeyboardArrowDown,
  TuneRounded, Close, ArrowUpward,
} from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import DatasetCard from '@/components/DatasetCard';
import SkeletonCard from '@/components/SkeletonCard';
import Pagination from '@/components/Pagination';
import { fetchDatasets } from '@/services/api';
import { SearchResponse, SearchParams } from '@/types';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

export default function DatasetsPage() {
  const [data, setData]           = useState<SearchResponse | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [view, setView]           = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [params, setParams] = useState<SearchParams>({
    page: 1, size: 10, sort: 'recent', order: 'desc',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 450);

  const [allAggregations, setAllAggregations] = useState<SearchResponse['aggregations'] | null>(null);
  const baseAggRef = useRef<SearchResponse['aggregations'] | null>(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDatasets(params);
      setData(result);
      if (!baseAggRef.current) {
        baseAggRef.current = result.aggregations;
        setAllAggregations(result.aggregations);
      }
    } catch {
      setError('Failed to load datasets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    setParams(prev => ({ ...prev, query: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  const handleFilterChange = (key: keyof SearchParams, value: string) => {
    setParams(prev => {
      const current = prev[key] ? (prev[key] as string).split(',') : [];
      const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [key]: next.join(','), page: 1 };
    });
  };

  const resetFilters = () => {
    setParams({ page: 1, size: 10, sort: 'recent', order: 'desc', query: '', sectors: '', formats: '', tags: '', geographies: '' });
    setSearchQuery('');
  };

  const hasActiveFilters = searchQuery !== '' || Object.entries(params).some(
    ([key, value]) => !['page', 'size', 'sort', 'order'].includes(key) && value && value !== ''
  );
  const activeCount = [params.sectors, params.formats, params.tags, params.geographies, params.query].filter(Boolean).length;
  const totalPages  = data ? Math.ceil(data.total / (params.size || 10)) : 0;

  const sidebarProps = {
    allAggregations,
    data,
    params,
    activeCount,
    hasActiveFilters,
    onFilterChange: handleFilterChange,
    onReset: resetFilters,
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF8F5' }}>
      <Header />
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
          borderBottom: '1px solid #E8E3DC',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #D9D3CB 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute -top-16 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,75,31,0.06) 0%, transparent 65%)', filter: 'blur(30px)' }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 mb-5" aria-label="Breadcrumb">
            <span className="text-[10px] uppercase tracking-widest" style={{ color: '#C8C4BF', fontWeight: 700 }}>Home</span>
            <span style={{ color: '#D9D3CB' }}>›</span>
            <span className="text-[10px] uppercase tracking-widest" style={{ color: '#C84B1F', fontWeight: 700 }}>All Datasets</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: '#C8C4BF', fontWeight: 700 }}>
                Open Civic Data Platform
              </p>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: '#1A1714', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Explore Open
                <em style={{ color: '#C84B1F', fontStyle: 'italic' }}> Datasets</em>
              </h1>
              <p className="text-[14px] leading-relaxed" style={{ color: '#9E9994', fontWeight: 400, maxWidth: 480 }}>
                Access civic datasets from government agencies, research institutions, and community organizations across India.
              </p>
            </div>

            <div className="flex items-stretch gap-5">
               <div
                  className="flex flex-col items-center justify-center text-center rounded-xl px-6 py-4"
                  style={{ background: '#fff', border: '1px solid #E8E3DC', minWidth: 110 }}
                >
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: '#C8C4BF', fontWeight: 700 }}>Total Datasets</p>
                  <p className="text-2xl stat-num">{data?.total?.toLocaleString() ?? '—'}</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/*Desktop sidebar*/}
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar {...sidebarProps} />
            </div>
          </div>
          <section className="flex-1 min-w-0 space-y-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#C8C4BF' }}>
                    <Search sx={{ fontSize: 17 }} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search datasets, organisations, keywords…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ background: 'none', border: 'none', color: '#C8C4BF', cursor: 'pointer' }}
                    >
                      <Close sx={{ fontSize: 15 }} />
                    </button>
                  )}
                </div>

                <div className="flex items-center rounded-lg p-1" style={{ background: '#fff', border: '1px solid #E8E3DC' }}>
                  <button onClick={() => setView('grid')} className={cn('view-btn', view === 'grid' && 'active')} title="Grid view" aria-label="Grid view">
                    <GridView sx={{ fontSize: 18 }} />
                  </button>
                  <button onClick={() => setView('list')} className={cn('view-btn', view === 'list' && 'active')} title="List view" aria-label="List view">
                    <ViewList sx={{ fontSize: 18 }} />
                  </button>
                </div>

                <button
                  className="lg:hidden btn-ghost flex items-center gap-2 justify-center"
                  onClick={() => setSidebarOpen(true)}
                >
                  <TuneRounded sx={{ fontSize: 15 }} />
                  Filters
                  {activeCount > 0 && (
                    <span className="flex items-center justify-center text-[9px] rounded"
                      style={{ background: '#C84B1F', color: '#fff', width: 17, height: 17, fontWeight: 800 }}>
                      {activeCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-[12px]" style={{ color: '#C8C4BF', fontWeight: 500 }} aria-live="polite" aria-atomic="true">
                  Showing{' '}
                  <span style={{ color: '#C84B1F', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {data?.results.length ?? 0}
                  </span>
                  {' '}of{' '}
                  <span style={{ color: '#6B6460', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {data?.total ?? 0}
                  </span>
                  {' '}datasets
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: '#C8C4BF', fontWeight: 700 }}>Sort</span>
                  <div className="relative">
                    <select
                      value={`${params.sort}-${params.order}`}
                      onChange={e => {
                        const [sort, order] = e.target.value.split('-');
                        setParams(prev => ({ ...prev, sort: sort as 'recent' | 'alphabetical', order: order as 'asc' | 'desc' }));
                      }}
                      className="light-select"
                      style={{ minWidth: 165 }}
                    >
                      <option value="recent-desc">Latest Updated</option>
                      <option value="recent-asc">Oldest Updated</option>
                      <option value="alphabetical-asc">A → Z</option>
                      <option value="alphabetical-desc">Z → A</option>
                    </select>
                    <KeyboardArrowDown sx={{ fontSize: 13 }} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9E9994' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-[400px]">
              {loading ? (
                <div className={cn('grid gap-4', view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                  {Array.from({ length: params.size || 10 }).map((_, i) => <SkeletonCard key={i} view={view} />)}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl text-2xl"
                    style={{ background: '#FEF0EB', border: '1px solid #F5CBBA' }}>
                    ⚠️
                  </div>
                  <p className="text-[15px]" style={{ color: '#6B6460', fontWeight: 600 }}>{error}</p>
                  <button onClick={loadData} className="btn-primary">Try Again</button>
                </div>
              ) : data?.results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl text-2xl"
                    style={{ background: '#F3F0EB', border: '1px solid #E8E3DC' }}>
                    🔍
                  </div>
                  <p className="text-[16px]" style={{ color: '#3D3630', fontWeight: 700 }}>No datasets found</p>
                  <p className="text-[13px] max-w-xs" style={{ color: '#9E9994' }}>
                    Try different keywords or reset your filters.
                  </p>
                  <button onClick={resetFilters} className="btn-ghost">Clear all filters</button>
                </div>
              ) : (
                <div className={cn('grid gap-4', view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                  {data?.results.map((dataset, i) => (
                    <DatasetCard key={dataset.id} dataset={dataset} view={view} index={i} />
                  ))}
                </div>
              )}
            </div>

            {!loading && !error && data && data.total > 0 && (
              <Pagination
                currentPage={params.page || 1}
                totalPages={totalPages}
                onPageChange={page => setParams(prev => ({ ...prev, page }))}
                pageSize={params.size || 10}
                onPageSizeChange={size => setParams(prev => ({ ...prev, size, page: 1 }))}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/*Mobile filter*/}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(26,23,20,0.35)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className="fixed right-0 top-0 h-full z-50 overflow-y-auto lg:hidden"
            style={{ width: 290, background: '#FAF8F5', borderLeft: '1px solid #E8E3DC', padding: '24px 20px' }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[13px] uppercase tracking-widest" style={{ color: '#C84B1F', fontWeight: 800 }}>Filters</span>
              <button onClick={() => setSidebarOpen(false)}
                style={{ background: 'none', border: 'none', color: '#C8C4BF', cursor: 'pointer' }}>
                <Close sx={{ fontSize: 20 }} />
              </button>
            </div>
            <FilterSidebar {...sidebarProps} />
          </div>
        </>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-xl transition-all"
          style={{
            width: 42, height: 42, background: '#C84B1F', color: '#fff',
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(200,75,31,0.3)',
          }}
          aria-label="Scroll to top"
        >
          <ArrowUpward sx={{ fontSize: 19 }} />
        </button>
      )}
    </div>
  );
}
