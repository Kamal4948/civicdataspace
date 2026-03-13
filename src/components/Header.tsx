'use client';
import React, { useState, useEffect } from 'react';
import { Search, Person, Menu, Close } from '@mui/icons-material';

const navLinks = ['All Data', 'Sectors', 'Use Cases', 'Publishers'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: 'rgba(250,248,245,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #E8E3DC' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(26,23,20,0.06)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" style={{ height: 64 }}>
        <a href="/" className="flex items-center gap-2.5 group">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden"
            style={{ background: '#FEF0EB', border: '1px solid #F5CBBA' }}
          >
            <img
              src="https://api.datakeep.civicdays.in/public/files/public/organizations/CivicDataLab/png/CDL_Primary_Logo_1.png"
              alt="CivicData Lab"
              className="h-full w-full object-contain p-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[15px] tracking-tight" style={{ fontWeight: 700, color: '#1A1714' }}>
              CivicData
            </span>
            <span className="text-[15px] tracking-tight" style={{ fontWeight: 700, color: '#C84B1F' }}>
              {' '}Space
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(item => (
            <a
              key={item}
              href="#"
              className="px-3 py-2 rounded-lg text-[12px] uppercase tracking-wider transition-all"
              style={{ fontWeight: 600, color: '#9E9994', letterSpacing: '0.08em' }}
              onMouseEnter={e => {
                const el = e.target as HTMLElement;
                el.style.color = '#C84B1F';
                el.style.background = '#FEF0EB';
              }}
              onMouseLeave={e => {
                const el = e.target as HTMLElement;
                el.style.color = '#9E9994';
                el.style.background = 'transparent';
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-1.5 btn-ghost" aria-label="Search">
            <Search sx={{ fontSize: 15 }} />
            Search
          </button>
          <button className="btn-primary flex items-center gap-1.5" style={{ padding: '8px 16px' }}>
            <Person sx={{ fontSize: 15 }} />
            Sign In
          </button>
          <button
            className="lg:hidden view-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <Close sx={{ fontSize: 20 }} /> : <Menu sx={{ fontSize: 20 }} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 flex flex-col gap-1" style={{ borderTop: '1px solid #E8E3DC' }}>
          {navLinks.map(item => (
            <a
              key={item}
              href="#"
              className="px-4 py-3 rounded-lg text-[13px] uppercase tracking-wider"
              style={{ color: '#6B6460', fontWeight: 600 }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
