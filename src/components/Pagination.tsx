'use client';
import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight, FirstPage, LastPage, KeyboardArrowDown } from '@mui/icons-material';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange }: PaginationProps) {
  const NavBtn = ({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center rounded-lg transition-all',
        disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-accent-bg hover:text-accent'
      )}
      style={{
        width: 34, height: 34,
        background: 'transparent',
        border: '1px solid #E8E3DC',
        color: '#9E9994',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 mt-8"
      style={{ borderTop: '1px solid #E8E3DC' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest" style={{ color: '#C8C4BF', fontWeight: 700 }}>
          Rows / page
        </span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            className="light-select"
            style={{ minWidth: 68 }}
          >
            {[5, 10, 20, 50].map(s => (
              <option key={s} value={s}>{s < 10 ? `0${s}` : s}</option>
            ))}
          </select>
          <KeyboardArrowDown sx={{ fontSize: 13 }} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9E9994' }} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[11px] uppercase tracking-widest tabular-nums" style={{ color: '#C8C4BF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          <span style={{ color: '#C84B1F' }}>{String(currentPage).padStart(2, '0')}</span>
          <span className="mx-2" style={{ color: '#E8E3DC' }}>/</span>
          {String(totalPages).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-1.5">
          <NavBtn onClick={() => onPageChange(1)} disabled={currentPage === 1}><FirstPage sx={{ fontSize: 17 }} /></NavBtn>
          <NavBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}><KeyboardArrowLeft sx={{ fontSize: 17 }} /></NavBtn>
          <NavBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}><KeyboardArrowRight sx={{ fontSize: 17 }} /></NavBtn>
          <NavBtn onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}><LastPage sx={{ fontSize: 17 }} /></NavBtn>
        </div>
      </div>
    </div>
  );
}
