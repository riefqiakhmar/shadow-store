import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartItemsCount: number;
  onOpenCart: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Navbar({ cartItemsCount, onOpenCart, onNavigate, currentSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'home', label: 'Eternity Hero' },
    { id: 'rtx', label: 'RTX Experience' },
    { id: 'shop', label: 'Spesifikasi Produk' },
    { id: 'builder', label: 'Custom Rig Builder' },
    { id: 'games', label: 'RTX Certified Games' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <Cpu className="w-5 h-5 text-[#00f2ff] group-hover:rotate-12 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-xl font-black italic tracking-tighter text-[#00f2ff] uppercase">
                VORTEX<span className="text-white ml-0.5">PC</span>
              </span>
              <span className="text-[7px] text-white/50 tracking-[0.3em] font-mono uppercase leading-none">PREMIUM LABS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                    isActive 
                      ? 'text-[#00f2ff] border-b-2 border-[#00f2ff] bg-[#00f2ff]/5' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Guarantee Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 border border-white/10 rounded-none bg-black/45">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[9px] text-white/60 tracking-wider font-mono uppercase">GUARANTEED HIGH-END</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative px-4 py-2 border border-[#00f2ff] text-[#00f2ff] text-[10px] font-bold uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition-all bg-transparent cursor-pointer"
              id="cart-button"
            >
              CART
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-none bg-[#00f2ff] text-[9px] font-bold text-black border border-black shadow-[0_0_10px_rgba(0,242,255,0.5)]">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu, cart, and toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative p-3 bg-zinc-900 text-zinc-300 rounded-lg border border-zinc-800"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black ring-2 ring-zinc-950">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg border border-zinc-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-zinc-800/80 bg-zinc-950/95"
          >
            <div className="px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest ${
                      isActive 
                        ? 'text-emerald-400 bg-zinc-900 border border-zinc-800/60' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-zinc-850 mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">100% Genuine Partner</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
