import React from 'react';
import { Cpu, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const years = new Date().getFullYear();

  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-8 text-white/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black rounded-none border border-white/10">
                <Cpu className="w-5 h-5 text-[#00f2ff] animate-pulse" />
              </div>
              <span className="font-black italic uppercase text-lg tracking-wider text-white">
                VORTEX<span className="text-[#00f2ff] ml-1">PC</span>
              </span>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed font-light">
              Pusat perakitan Custom PC gaming premium & workstation level antusias nomor satu di Indonesia. Kami menghadirkan kombinasi performa ray-tracing mutakhir dan sasis kokoh tepercaya.
            </p>
            <div className="flex items-center gap-2.5 p-3.5 bg-black rounded-none border border-white/10 w-full">
              <ShieldCheck className="w-4 h-4 text-[#00f2ff] shrink-0" />
              <p className="text-[9px] text-[#00f2ff] font-mono leading-none font-bold uppercase tracking-widest">
                100% ORIGINAL GLOBAL GRAPHICS PARTNER
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 font-mono">// Tautan Navigasi</h4>
            <ul className="space-y-3.5 text-xs">
              {[
                { label: 'Eternity Hero Banner', id: 'home' },
                { label: 'Uji Band RTX On/Off', id: 'rtx' },
                { label: 'Spesifikasi Produk', id: 'shop' },
                { label: 'Custom Rig Builder', id: 'builder' },
                { label: 'Daftar Game Terverifikasi', id: 'games' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-[#00f2ff] transition-colors uppercase font-bold text-[9px] tracking-widest text-white/40 block text-left"
                  >
                    // {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Jam Kerja & Layanan */}
          <div className="space-y-4">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 font-mono">// Jam Kerja & Operasional</h4>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#00f2ff] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block uppercase text-[10px] tracking-wider">Hari Kerja (Senin - Sabtu)</span>
                  <span className="text-[11px] text-white/50 mt-1 block font-light">09.00 WIB - 21.00 WIB</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00f2ff] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block uppercase text-[10px] tracking-wider">Garansi Platinum Labs</span>
                  <span className="text-[11px] text-white/50 mt-1 block font-light">Resmi 3 Tahun Ganti Baru</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Storefront & Marketing contacts */}
          <div className="space-y-4">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 font-mono">// Hubungi Marketing</h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00f2ff] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px] text-white/50 font-light">
                  Ruko Galeri Cyber No. 12B, Lantai 1-2, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12130
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00f2ff] shrink-0" />
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f2ff] transition text-white/60 font-medium">
                  +62 812-3456-7890 (WhatsApp Live)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00f2ff] shrink-0" />
                <span className="hover:text-[#00f2ff] cursor-pointer text-white/60 font-medium font-mono">support@vortexpc.co.id</span>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate bottom legal disclaimers */}
        <div className="pt-8 border-t border-white/5 text-center space-y-4">
          <p className="text-[9px] text-white/30 leading-relaxed max-w-3xl mx-auto uppercase tracking-wider">
            VORTEX PC adalah butik integrator sistem komputer independen. Nama brand, GeForce, RTX, serta aset visual pendukung merupakan hak milik terdaftar Nvidia Corporation. Kami menjual komponen resmi terdistribusi untuk keperluan teknologi inovasi di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-white/40 text-[10px] uppercase tracking-wider font-mono">
              &copy; {years} VORTEX Custom PC Labs Ltd. All Rights Reserved.
            </p>
            <p className="text-white/40 text-[10px] uppercase tracking-wider font-mono flex items-center gap-1">
              Crafted in Indonesia for elite hardware builders.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
