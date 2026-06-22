import React from 'react';
import { X, CheckCircle, Info, ShoppingCart, Activity } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product || !isOpen) return null;

  // Format IDR Currency helper
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glassmorphism */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal content cardboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none bg-[#020202] border border-white/10 p-6 md:p-8 text-white z-10 no-scrollbar"
          id={`product-modal-${product.id}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-black border border-white/10 rounded-none text-white/50 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-4">
            
            {/* Left: Product Visual Assets & Benchmarks */}
            <div>
              <div className="relative rounded-none overflow-hidden bg-black border border-white/5 p-4 flex items-center justify-center aspect-square group shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[300px] object-contain rounded-none group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Popularity Badge */}
                {product.isPopular && (
                  <span className="absolute top-4 left-4 bg-[#00f2ff] text-black font-black text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-none italic">
                    ULTIMATE DEMAND
                  </span>
                )}
                
                <span className="absolute bottom-4 left-4 text-[9px] text-white/30 font-mono tracking-widest uppercase">
                  Series ID: {product.id}
                </span>
              </div>

              {/* Dynamic Neural Benchmark score */}
              {product.benchmarkScore && (
                <div className="mt-6 p-4 bg-[#00f2ff]/5 rounded-none border border-[#00f2ff]/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#00f2ff] animate-pulse" />
                      <span className="text-[9px] text-[#00f2ff] font-bold uppercase tracking-widest font-mono">Performance Metric</span>
                    </div>
                    <span className="text-lg font-black font-mono text-white">{product.benchmarkScore.value} {product.benchmarkScore.unit}</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-900 rounded-none overflow-hidden border border-white/5">
                    <div 
                      className="bg-[#00f2ff] h-full rounded-none shadow-[0_0_10px_rgba(0,242,255,0.4)]"
                      style={{ width: `${Math.min(100, (product.benchmarkScore.value / 400) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-white/30 mt-2 font-mono leading-relaxed uppercase tracking-wider">
                    Uji Real-time: {product.benchmarkScore.label}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Spec Info & Action checkout */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#00f2ff] font-mono tracking-widest uppercase font-bold block mb-2">
                  // {product.category} &bull; {product.brand}
                </span>
                <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white leading-tight tracking-tight">
                  {product.name}
                </h3>
                
                <p className="text-2xl font-black text-[#00f2ff] mt-4 font-mono">
                  {formatIDR(product.price)}
                </p>

                <p className="text-xs text-white/50 mt-4 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Exquisite Features list */}
                <div className="mt-6">
                  <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase block mb-3">// Fitur Unggulan</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00f2ff] shrink-0" />
                        <span className="text-xs text-white/70 truncate font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Spec matrix table */}
                <div className="mt-6 border-t border-white/5 pt-6">
                  <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase block mb-3">// Spesifikasi Detail</span>
                  <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2 border-r border-[#020202]">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-1.5 border-b border-white/5 text-xs">
                        <span className="text-white/40 font-mono uppercase tracking-wider text-[10px]">{key}</span>
                        <span className="text-white/80 font-mono font-medium text-right text-[11px]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart & Stock actions */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-auto">
                  <span className="text-[9px] text-white/30 font-mono block uppercase tracking-wider">Status Distribusi</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className={`w-2 h-2 rounded-none ${product.stock > 0 ? 'bg-[#00f2ff] animate-pulse' : 'bg-rose-500'}`} />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">
                      {product.stock > 0 ? `Tersedia (${product.stock} Unit di Gudang)` : 'Habis Terjual'}
                    </span>
                  </div>
                </div>

                <button
                  disabled={product.stock <= 0}
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full sm:flex-1 py-4 bg-[#00f2ff] text-black hover:bg-white disabled:bg-neutral-800 disabled:text-white/35 font-black text-[10px] uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,242,255,0.15)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  Tambahkan ke Keranjang
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
