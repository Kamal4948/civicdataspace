import React from 'react';
import {
  CalendarToday, Download, LocationOn, Share, OpenInNew,
  PictureAsPdf, TableChart, Code, Description,
} from '@mui/icons-material';
import { Dataset } from '@/types';
import { cn } from '@/lib/utils';
import { BASE_URL } from '@/services/api';

interface DatasetCardProps {
  dataset: Dataset;
  view: 'grid' | 'list';
  index?: number;
}

const getFormatIcon = (format: string) => {
  const f = format.toLowerCase();
  if (f === 'pdf') return <PictureAsPdf sx={{ fontSize: 11 }} />;
  if (['csv', 'xlsx', 'xls'].includes(f)) return <TableChart sx={{ fontSize: 11 }} />;
  if (['json', 'xml'].includes(f)) return <Code sx={{ fontSize: 11 }} />;
  return <Description sx={{ fontSize: 11 }} />;
};

const sectorPalette: Record<string, { bg: string; text: string; border: string }> = {
  'Gender':      { bg: '#FCE7F3', text: '#BE185D', border: '#FBCFE8' },
  'Health':      { bg: '#CCFBF1', text: '#0F766E', border: '#99F6E4' },
  'Education':   { bg: '#EDE9FE', text: '#5B21B6', border: '#DDD6FE' },
  'Environment': { bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },
  'Finance':     { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  'Agriculture': { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' },
  'Water':       { bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' },
  'Energy':      { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
};
const getSector = (s: string) => sectorPalette[s] ?? { bg: '#FEF0EB', text: '#C84B1F', border: '#F5CBBA' };

export default function DatasetCard({ dataset, view, index = 0 }: DatasetCardProps) {
  const geography = dataset.geographies
    || dataset.metadata?.find(m => m.metadata_item.label === 'geographies')?.value
    || '—';
  const createdAt = dataset.created
    ? new Date(dataset.created).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';
  const downloads = dataset.download_count ?? '—';
  const orgLogo  = dataset.organization?.logo ? BASE_URL + dataset.organization.logo : null;
  const orgName  = dataset.organization?.name || 'Unknown';
  const sector   = dataset.sectors?.[0] ?? '';
  const sp       = getSector(sector);

  /* ── LIST VIEW ── */
  if (view === 'list') {
    return (
      <div
        className="dataset-card rounded-xl cursor-pointer overflow-hidden anim-fade-up"
        style={{ animationDelay: `${index * 0.04}s` }}
      >
        <div style={{ height: 2, background: `linear-gradient(90deg, ${sp.text}50, transparent)` }} />
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-[15px] leading-snug" style={{ fontWeight: 700, color: '#1A1714', maxWidth: '72%' }}>
                {dataset.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap">
                {dataset.formats.slice(0, 3).map(f => (
                  <span key={f} className="format-badge">{getFormatIcon(f)}{f}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              {[
                { icon: <CalendarToday sx={{ fontSize: 13 }} />, val: createdAt },
                { icon: <Download sx={{ fontSize: 13 }} />,      val: String(downloads) },
                { icon: <LocationOn sx={{ fontSize: 13 }} />,    val: geography },
              ].map(({ icon, val }, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[12px]" style={{ color: '#9E9994' }}>
                  <span style={{ color: '#C8C4BF' }}>{icon}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>

            <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: '#6B6460', fontWeight: 400 }}>
              {dataset.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {dataset.tags.slice(0, 5).map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
              {dataset.tags.length > 5 && (
                <span className="text-[10px]" style={{ color: '#C8C4BF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  +{dataset.tags.length - 5}
                </span>
              )}
            </div>
          </div>

          <div
            className="flex flex-row sm:flex-col justify-between items-center sm:items-end gap-4 sm:pl-5"
            style={{ borderLeft: '1px solid #E8E3DC', minWidth: 130 }}
          >
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: '#C8C4BF', fontWeight: 700 }}>Published by</p>
              <p className="text-[12px]" style={{ color: '#3D3630', fontWeight: 700 }}>{orgName}</p>
            </div>
            {orgLogo ? (
              <div className="h-9 w-9 rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: '#F3F0EB', border: '1px solid #E8E3DC', padding: 3 }}>
                <img src={orgLogo} alt={orgName} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
              </div>
            ) : (
              <div className="h-9 w-9 rounded-lg flex items-center justify-center text-[11px]"
                style={{ background: '#FEF0EB', border: '1px solid #F5CBBA', color: '#C84B1F', fontWeight: 800 }}>
                {orgName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── GRID VIEW ── */
  return (
    <div
      className="dataset-card rounded-xl cursor-pointer flex flex-col overflow-hidden anim-fade-up"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div style={{ height: 2, background: `linear-gradient(90deg, ${sp.text}55, transparent)` }} />
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title + formats */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[14px] leading-snug line-clamp-2 flex-1" style={{ fontWeight: 700, color: '#1A1714', minHeight: 40 }}>
            {dataset.title}
          </h3>
          <div className="flex flex-col gap-1 items-end flex-shrink-0">
            {dataset.formats.slice(0, 2).map(f => (
              <span key={f} className="format-badge">{getFormatIcon(f)}{f}</span>
            ))}
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
          {[
            { icon: <CalendarToday sx={{ fontSize: 12 }} />, val: createdAt },
            { icon: <Download sx={{ fontSize: 12 }} />,      val: String(downloads) },
          ].map(({ icon, val }, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color: '#C8C4BF' }}>
              <span>{icon}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#9E9994', fontWeight: 500 }}>{val}</span>
            </div>
          ))}
          <div className="col-span-2 flex items-center gap-1.5 text-[11px]" style={{ color: '#C8C4BF' }}>
            <LocationOn sx={{ fontSize: 12 }} />
            <span className="truncate" style={{ fontFamily: 'var(--font-mono)', color: '#9E9994', fontWeight: 500 }}>{geography}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[12px] leading-relaxed line-clamp-3 flex-1"
          style={{ color: '#6B6460', fontWeight: 400, minHeight: '3.6rem' }}>
          {dataset.description}
        </p>

        {/* Sector chips */}
        {dataset.sectors?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dataset.sectors.slice(0, 3).map(s => {
              const c = getSector(s);
              return (
                <span key={s} className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {s}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid #F3F0EB', background: '#FAFAF8' }}>
        <div className="flex items-center gap-0.5">
          {[
            { icon: <Share sx={{ fontSize: 15 }} />, label: 'Share dataset' },
            { icon: <OpenInNew sx={{ fontSize: 15 }} />, label: 'Open dataset' },
          ].map(({ icon, label }) => (
            <button key={label} aria-label={label}
              className="flex items-center justify-center rounded-lg transition-all"
              style={{ width: 30, height: 30, background: 'transparent', border: 'none', color: '#C8C4BF', cursor: 'pointer' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#C84B1F'; el.style.background = '#FEF0EB'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#C8C4BF'; el.style.background = 'transparent'; }}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-right truncate max-w-[90px]" style={{ color: '#9E9994', fontWeight: 600 }}>{orgName}</span>
          {orgLogo ? (
            <div className="h-7 w-7 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#F3F0EB', border: '1px solid #E8E3DC', padding: 2 }}>
              <img src={orgLogo} alt={orgName} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className="h-7 w-7 rounded-lg flex items-center justify-center text-[9px] flex-shrink-0"
              style={{ background: '#FEF0EB', border: '1px solid #F5CBBA', color: '#C84B1F', fontWeight: 800 }}>
              {orgName.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
