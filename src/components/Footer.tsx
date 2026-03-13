import React from 'react';
import { GitHub, LinkedIn, Twitter, Facebook } from '@mui/icons-material';

export default function Footer() {
  return (
    <footer className="w-full mt-20" style={{ borderTop: '1px solid #E8E3DC', background: '#F3F0EB' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-xs">
            <a href="/" className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden"
                style={{ background: '#FEF0EB', border: '1px solid #F5CBBA' }}
              >
                <img
                  src="https://api.datakeep.civicdays.in/public/files/public/organizations/CivicDataLab/png/CDL_Primary_Logo_1.png"
                  alt="Logo" className="h-full w-full object-contain p-1" referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[15px]" style={{ fontWeight: 700, color: '#1A1714' }}>
                CivicData <span style={{ color: '#C84B1F' }}>Space</span>
              </span>
            </a>
            <p className="text-[13px] leading-relaxed" style={{ color: '#9E9994', fontWeight: 500 }}>
              Empowering communities through open civic data. Discover, analyze, and share datasets that drive real change.
            </p>
            <div className="flex items-center gap-2">
              {[GitHub, LinkedIn, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i} href="#"
                  className="flex items-center justify-center rounded-lg transition-all"
                  style={{ width: 34, height: 34, background: '#fff', border: '1px solid #E8E3DC', color: '#C8C4BF' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#C84B1F';
                    el.style.borderColor = '#F5CBBA';
                    el.style.background = '#FEF0EB';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#C8C4BF';
                    el.style.borderColor = '#E8E3DC';
                    el.style.background = '#fff';
                  }}
                >
                  <Icon sx={{ fontSize: 16 }} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {[
              { title: 'Platform', links: ['All Datasets', 'API Reference', 'Data Standards', 'Open Source'] },
              { title: 'Company',  links: ['About Us', 'Blog', 'Contact', 'Privacy Policy'] },
            ].map(({ title, links }) => (
              <div key={title} className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#C8C4BF', fontWeight: 700 }}>
                  {title}
                </h4>
                <nav className="flex flex-col gap-2.5">
                  {links.map(link => (
                    <a
                      key={link} href="#"
                      className="text-[13px] transition-colors"
                      style={{ color: '#9E9994', fontWeight: 500 }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C84B1F')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = '#9E9994')}
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #E8E3DC' }}>
          <p className="text-[11px]" style={{ color: '#C8C4BF', fontWeight: 600 }}>
            © {new Date().getFullYear()} CivicDataSpace. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: '#D9D3CB', fontWeight: 700 }}>
            Data · Tech · Design 
          </p>
        </div>
      </div>
    </footer>
  );
}
