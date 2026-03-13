'use client';
import React from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface FilterGroupProps {
  title: string;
  count?: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function FilterGroup({ title, count, isOpen, onToggle, children }: FilterGroupProps) {
  return (
    <div className="py-3" style={{ borderBottom: '1px solid #E8E3DC' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <span
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ fontWeight: 700, color: '#9e9994' }}
        >
          {title}
          {count !== undefined && (
            <span className="ml-1.5" style={{ color: '#9e9994', fontFamily: 'var(--font-mono)' }}>
              [{count}]
            </span>
          )}
        </span>
        <span style={{ color: '#9e9994' }}>
          {isOpen
            ? <KeyboardArrowUp sx={{ fontSize: 16 }} />
            : <KeyboardArrowDown sx={{ fontSize: 16 }} />}
        </span>
      </button>
      {isOpen && <div className="mt-3 space-y-0.5">{children}</div>}
    </div>
  );
}

interface FilterItemProps {
  label: string;
  count?: number;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function FilterItem({ label, count, checked = false, onChange }: FilterItemProps) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        className="filter-cb"
      />
      <span
        className="text-[12px] flex-1 transition-colors"
        style={{
          color: checked ? '#C84B1F' : '#6B6460',
          fontWeight: checked ? 600 : 500,
        }}
      >
        {label}
      </span>
      {count !== undefined && (
        <span
          className="text-[10px] tabular-nums"
          style={{ color: '#C8C4BF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
        >
          {count}
        </span>
      )}
    </label>
  );
}
