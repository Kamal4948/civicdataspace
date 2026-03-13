'use client';
import React, { useState } from 'react';
import { TuneRounded, RestartAlt } from '@mui/icons-material';
import { FilterGroup, FilterItem } from '@/components/Filters';
import { SearchResponse, SearchParams } from '@/types';

interface FilterSidebarProps {
  allAggregations: SearchResponse['aggregations'] | null;
  data: SearchResponse | null;
  params: SearchParams;
  activeCount: number;
  hasActiveFilters: boolean;
  onFilterChange: (key: keyof SearchParams, value: string) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  allAggregations,
  data,
  params,
  activeCount,
  hasActiveFilters,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {

  const [openGroups, setOpenGroups] = useState({
    sectors: true,
    formats: true,
    tags: false,
    geographies: false,
  });

  const toggle = (key: keyof typeof openGroups) =>
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-1" style={{ borderBottom: '1px solid #E8E3DC' }}>
        <div className="flex items-center gap-2">
          <TuneRounded sx={{ fontSize: 15 }} style={{ color: '#C84B1F' }} />
          <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: '#9E9994', fontWeight: 800 }}>
            Filters
          </span>
          {activeCount > 0 && (
            <span
              className="flex items-center justify-center text-[9px] rounded"
              style={{ background: '#C84B1F', color: '#fff', width: 17, height: 17, fontWeight: 800, fontFamily: 'var(--font-mono)' }}
            >
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="btn-ghost flex items-center gap-1"
          style={{ padding: '3px 9px', opacity: hasActiveFilters ? 1 : 0.35, cursor: hasActiveFilters ? 'pointer' : 'not-allowed' }}
        >
          <RestartAlt sx={{ fontSize: 12 }} />
          Reset
        </button>
      </div>

      {allAggregations && (
        <>
          <FilterGroup
            title="Sectors"
            count={Object.keys(allAggregations.sectors ?? {}).length}
            isOpen={openGroups.sectors}
            onToggle={() => toggle('sectors')}
          >
            <div className="max-h-60 overflow-y-auto custom-scroll space-y-0.5 pr-1">
              {Object.entries(allAggregations.sectors ?? {}).map(([label]) => (
                <FilterItem
                  key={label} label={label}
                  count={data?.aggregations.sectors?.[label] ?? 0}
                  checked={params.sectors?.split(',').includes(label)}
                  onChange={() => onFilterChange('sectors', label)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup
            title="Data Format"
            count={Object.keys(allAggregations.formats ?? {}).length}
            isOpen={openGroups.formats}
            onToggle={() => toggle('formats')}
          >
            <div className="space-y-0.5">
              {Object.entries(allAggregations.formats ?? {}).map(([label]) => (
                <FilterItem
                  key={label} label={label}
                  count={data?.aggregations.formats?.[label] ?? 0}
                  checked={params.formats?.split(',').includes(label)}
                  onChange={() => onFilterChange('formats', label)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup
            title="Tags"
            count={Object.keys(allAggregations.tags ?? {}).length}
            isOpen={openGroups.tags}
            onToggle={() => toggle('tags')}
          >
            <div className="max-h-60 overflow-y-auto custom-scroll space-y-0.5 pr-1">
              {Object.entries(allAggregations.tags ?? {}).map(([label]) => (
                <FilterItem
                  key={label} label={label}
                  count={data?.aggregations.tags?.[label] ?? 0}
                  checked={params.tags?.split(',').includes(label)}
                  onChange={() => onFilterChange('tags', label)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup
            title="Geographies"
            count={Object.keys(allAggregations.geographies ?? {}).length}
            isOpen={openGroups.geographies}
            onToggle={() => toggle('geographies')}
          >
            <div className="max-h-60 overflow-y-auto custom-scroll space-y-0.5 pr-1">
              {Object.entries(allAggregations.geographies ?? {}).map(([label]) => (
                <FilterItem
                  key={label} label={label}
                  count={data?.aggregations.geographies?.[label] ?? 0}
                  checked={params.geographies?.split(',').includes(label)}
                  onChange={() => onFilterChange('geographies', label)}
                />
              ))}
            </div>
          </FilterGroup>
        </>
      )}
    </aside>
  );
}
