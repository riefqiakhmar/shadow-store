import React, { useState } from 'react';
import { Cpu, Zap, RotateCcw, Plus, Check, CheckCircle2, ShieldAlert, CpuIcon, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { productsData } from '../data/products';

interface PcBuilderProps {
  onAddCustomRigToCart: (selections: {
    cpu?: Product;
    gpu?: Product;
    ram?: Product;
    storage?: Product;
    cooler?: Product;
    motherboard?: Product;
  }) => void;
}

export default function PcBuilder({ onAddCustomRigToCart }: PcBuilderProps) {
  // Configured selections
  const [selectedCpu, setSelectedCpu] = useState<Product | undefined>(productsData.find(p => p.id === 'cpu-r7'));
  const [selectedGpu, setSelectedGpu] = useState<Product | undefined>(productsData.find(p => p.id === 'gpu-rtx4070ts'));
  const [selectedRam, setSelectedRam] = useState<Product | undefined>(productsData.find(p => p.id === 'ram-ddr5-32'));
  const [selectedStorage, setSelectedStorage] = useState<Product | undefined>(productsData.find(p => p.id === 'storage-ssd-2tb'));
  const [selectedCooler, setSelectedCooler] = useState<Product | undefined>(productsData.find(p => p.id === 'cooler-360'));
  const [selectedMobo, setSelectedMobo] = useState<Product | undefined>(productsData.find(p => p.id === 'mobo-z790'));

  const [activeTab, setActiveTab] = useState<'CPU' | 'GPU' | 'RAM' | 'STORAGE' | 'COOLER' | 'MOTHERBOARD'>('CPU');
  const [addSuccess, setAddSuccess] = useState(false);

  // Filter components according to categorization
  const cpus = productsData.filter(p => p.category === 'CPU');
  const gpus = productsData.filter(p => p.category === 'GPU');
  const rams = productsData.filter(p => p.category === 'RAM');
  const storages = productsData.filter(p => p.category === 'STORAGE');
  const coolers = productsData.filter(p => p.category === 'COOLER');
  const mobos = productsData.filter(p => p.category === 'MOTHERBOARD');

  const getProductsForTab = () => {
    switch (activeTab) {
      case 'CPU': return cpus;
      case 'GPU': return gpus;
      case 'RAM': return rams;
      case 'STORAGE': return storages;
      case 'COOLER': return coolers;
      case 'MOTHERBOARD': return mobos;
    }
  };

  const getSelectedForTab = () => {
    switch (activeTab) {
      case 'CPU': return selectedCpu;
      case 'GPU': return selectedGpu;
      case 'RAM': return selectedRam;
      case 'STORAGE': return selectedStorage;
      case 'COOLER': return selectedCooler;
      case 'MOTHERBOARD': return selectedMobo;
    }
  };

  const handleSelectProduct = (product: Product) => {
    switch (activeTab) {
      case 'CPU': setSelectedCpu(product); break;
      case 'GPU': setSelectedGpu(product); break;
      case 'RAM': setSelectedRam(product); break;
      case 'STORAGE': setSelectedStorage(product); break;
      case 'COOLER': setSelectedCooler(product); break;
      case 'MOTHERBOARD': setSelectedMobo(product); break;
    }
  };

  // Preset configuration setups
  const applyPresetUltimate = () => {
    setSelectedCpu(productsData.find(p => p.id === 'cpu-i9'));
    setSelectedGpu(productsData.find(p => p.id === 'gpu-rtx4090'));
    setSelectedRam(productsData.find(p => p.id === 'ram-ddr5-32'));
    setSelectedStorage(productsData.find(p => p.id === 'storage-ssd-2tb'));
    setSelectedCooler(productsData.find(p => p.id === 'cooler-360'));
    setSelectedMobo(productsData.find(p => p.id === 'mobo-z790'));
    setActiveTab('GPU');
  };

  const applyPresetBalanced = () => {
    setSelectedCpu(productsData.find(p => p.id === 'cpu-r7'));
    setSelectedGpu(productsData.find(p => p.id === 'gpu-rtx4080s'));
    setSelectedRam(productsData.find(p => p.id === 'ram-ddr5-32'));
    setSelectedStorage(productsData.find(p => p.id === 'storage-ssd-2tb'));
    setSelectedCooler(productsData.find(p => p.id === 'cooler-360'));
    setSelectedMobo(productsData.find(p => p.id === 'mobo-z790'));
    setActiveTab('CPU');
  };

  const resetSelections = () => {
    setSelectedCpu(undefined);
    setSelectedGpu(undefined);
    setSelectedRam(undefined);
    setSelectedStorage(undefined);
    setSelectedCooler(undefined);
    setSelectedMobo(undefined);
  };

  // Calculate total config cost
  const totalPrice = 
    (selectedCpu?.price || 0) + 
    (selectedGpu?.price || 0) + 
    (selectedRam?.price || 0) + 
    (selectedStorage?.price || 0) + 
    (selectedCooler?.price || 0) + 
    (selectedMobo?.price || 0);

  // Formatting currency IDR
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Smart Compatibility engine & Bottleneck evaluator
  const analyzeCompatibility = () => {
    if (!selectedCpu || !selectedGpu) {
      return { status: 'warning', message: 'Silahkan lengkapi CPU dan GPU untuk analisis kecocokan sistem rakitan Anda.' };
    }

    const cpuIsLow = selectedCpu.id === 'cpu-r7' && selectedGpu.id === 'gpu-rtx4090';
    if (cpuIsLow) {
      return { 
        status: 'bottleneck', 
        message: 'Bottleneck Terdeteksi: GPU RTX 4099 Anda terlalu bertenaga untuk CPU ini pada resolusi 1080p. Disarankan upgrade ke Intel i9 Supreme.' 
      };
    }

    const moboCpuSocketWarning = selectedCpu.brand === 'AMD' && selectedMobo?.id === 'mobo-z790';
    if (moboCpuSocketWarning) {
      return {
        status: 'incompatible',
        message: 'Peringatan Socket: Motherboard Intel Z790 tidak cocok untuk AMD AM5 Zen4 CPU. Silahkan sesuaikan ulang.'
      };
    }

    return { 
      status: 'optimal', 
      message: 'Performa Optimal: Konfigurasi seimbang! PCIe Gen 5 penuh, siap melibas resolusi 4K Ray Tracing 120 FPS+.' 
    };
  };

  const diagnostic = analyzeCompatibility();

  const handleAddRigToCart = () => {
    onAddCustomRigToCart({
      cpu: selectedCpu,
      gpu: selectedGpu,
      ram: selectedRam,
      storage: selectedStorage,
      cooler: selectedCooler,
      motherboard: selectedMobo
    });
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 3000);
  };

  return (
    <section id="builder-section" className="py-24 bg-[#020202] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Title block */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-[#00f2ff] uppercase tracking-[0.2em] block mb-2 font-bold">// Configure Your Beast</span>
          <h2 className="text-3xl sm:text-5xl font-black italic uppercase leading-none tracking-tighter text-white">
            PC CUSTOM <span className="text-[#00f2ff] text-glow">RIG BUILDER</span>
          </h2>
          <p className="mt-3 text-white/50 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Rakit spesifikasi komputer kustom idaman Anda secara presisi dengan jaminan komponen bergaransi resmi, teruji benchmark, serta tanpa bottleneck konyol.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <button 
              onClick={applyPresetUltimate}
              className="text-[9px] font-mono font-bold tracking-widest border border-white/10 hover:border-[#00f2ff] hover:text-[#00f2ff] text-white/80 bg-black px-4 py-2.5 rounded-none transition"
            >
              🚀 PRESET: ULTIMATE 4K KING
            </button>
            <button 
              onClick={applyPresetBalanced}
              className="text-[9px] font-mono font-bold tracking-widest border border-white/10 hover:border-[#00f2ff] hover:text-[#00f2ff] text-white/80 bg-black px-4 py-2.5 rounded-none transition"
            >
              🎮 PRESET: ESPORTS DOMINATOR
            </button>
          </div>
        </div>

        {/* Builder Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel (Selection Area) - 7 cols */}
          <div className="lg:col-span-7 bg-black border border-white/10 rounded-none overflow-hidden p-6">
            
            {/* Category horizontal scrolling tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/10 mb-6">
              {(['CPU', 'GPU', 'RAM', 'STORAGE', 'COOLER', 'MOTHERBOARD'] as const).map((tab) => {
                const getLabelIcon = () => {
                  if (tab === 'CPU' || tab === 'GPU') return <Cpu className="w-3.5 h-3.5 mr-1" />;
                  return <Zap className="w-3.5 h-3.5 mr-1" />;
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center px-4 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest shrink-0 transition-all ${
                      activeTab === tab
                        ? 'bg-[#00f2ff] text-black font-black'
                        : 'bg-black text-white/50 hover:text-white border border-white/5'
                    }`}
                  >
                    {getLabelIcon()}
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Product selection card stack list */}
            <div className="space-y-4">
              <span className="text-[10px] text-white/40 font-mono tracking-widest block uppercase">// Katalog Pilihan: {activeTab}</span>
              
              {getProductsForTab().length === 0 ? (
                <div className="py-12 text-center text-white/30 text-xs uppercase tracking-widest">Pilihan hardware untuk tipe ini sedang tidak tersedia.</div>
              ) : (
                getProductsForTab().map((product) => {
                  const isSelected = getSelectedForTab()?.id === product.id;
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className={`group p-4 rounded-none border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-center gap-4 ${
                        isSelected
                          ? 'border-[#00f2ff] bg-[#00f2ff]/5'
                          : 'border-white/5 bg-black hover:border-white/20'
                      }`}
                    >
                      <div className="w-16 h-16 bg-zinc-950 rounded-none p-1.5 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                        <img src={product.image} alt={product.name} className="max-h-full object-contain rounded-none" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider group-hover:text-[#00f2ff] transition-colors">{product.name}</h4>
                        <span className="text-[9px] font-mono text-white/40 block mt-1 uppercase tracking-wider">{product.brand} &bull; Stabilitas Tinggi</span>
                        <div className="flex justify-center sm:justify-start gap-1 mt-2">
                          {product.features.slice(0, 2).map((feat, i) => (
                            <span key={i} className="text-[8px] bg-zinc-900 text-white/40 px-2 py-0.5 rounded-none border border-white/5 uppercase tracking-wider">{feat}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-center sm:text-right mt-3 sm:mt-0">
                        <span className="block text-[#00f2ff] font-bold font-mono text-xs sm:text-sm">{formatIDR(product.price)}</span>
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 mt-1 text-[8px] text-[#00f2ff] font-bold bg-[#00f2ff]/10 px-2.5 py-0.5 rounded-none border border-[#00f2ff]/30 uppercase tracking-widest">
                            <Check className="w-3" /> Selected
                          </span>
                        ) : (
                          <span className="inline-block mt-2.5 px-3 py-1 bg-black text-white/60 hover:text-white rounded-none text-[8px] font-bold uppercase tracking-widest border border-white/10 transition">Select</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right panel (Selected Rig Invoice & AI Diagnostic) - 5 cols */}
          <div className="lg:col-span-5 bg-black border border-white/10 rounded-none p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#00f2ff] cursor-pointer hover:rotate-180 transition-transform duration-500" onClick={resetSelections} />
                  Kombinasi Rig Kustom
                </h3>
                <span className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Real-time Setup</span>
              </div>

              {/* Stack items summary */}
              <div className="space-y-3.5 mb-6">
                {[
                  { label: 'Prosesor CPU', product: selectedCpu, cat: 'CPU' },
                  { label: 'Kartu Grafis GPU', product: selectedGpu, cat: 'GPU' },
                  { label: 'RAM Memory', product: selectedRam, cat: 'RAM' },
                  { label: 'SSD NVMe Storage', product: selectedStorage, cat: 'STORAGE' },
                  { label: 'Liquid AIO Cooler', product: selectedCooler, cat: 'COOLER' },
                  { label: 'Motherboard Core', product: selectedMobo, cat: 'MOTHERBOARD' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <span className="block text-[8px] text-white/40 font-mono uppercase font-bold tracking-widest">{item.label}</span>
                      {item.product ? (
                        <span className="text-xs text-white font-bold uppercase tracking-wide truncate hover:text-[#00f2ff] transition-colors block max-w-xs">{item.product.name}</span>
                      ) : (
                        <span 
                          onClick={() => { setActiveTab(item.cat as any); }}
                          className="text-xs text-rose-500 hover:text-rose-400 font-bold tracking-widest uppercase italic cursor-pointer animate-pulse"
                        >
                          + CHOOSE {item.cat} NOW
                        </span>
                      )}
                    </div>
                    {item.product && (
                      <span className="text-xs font-bold text-white/60 font-mono shrink-0">{formatIDR(item.product.price)}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Dynamic Compatibility notification board */}
              <div className={`p-4 rounded-none border mb-6 ${
                diagnostic.status === 'optimal' 
                  ? 'bg-[#00f2ff]/5 border-[#00f2ff]/25 text-[#00f2ff]' 
                  : diagnostic.status === 'bottleneck'
                  ? 'bg-amber-500/5 border-amber-500/25 text-amber-400'
                  : diagnostic.status === 'incompatible'
                  ? 'bg-rose-500/5 border-rose-500/25 text-rose-400'
                  : 'bg-zinc-900 border-white/5 text-white/70'
              }`}>
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[8px] font-mono font-bold tracking-[0.25em] uppercase">DIAGNOSTIK TEKNIK VORTEX</span>
                    <p className="text-xs mt-1 leading-relaxed font-light">{diagnostic.message}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing checkout total block */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-[8px] text-white/40 font-mono uppercase block tracking-widest">Total Biaya Rakitan</span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-[#00f2ff] text-glow-teal">{formatIDR(totalPrice)}</span>
                </div>
                <div className="text-right text-[10px] text-white/40 font-light leading-snug uppercase tracking-wider">
                  <span>Sudah termasuk ongkos rakit &</span>
                  <span className="block">stress test 24 jam premium.</span>
                </div>
              </div>

              <button
                disabled={!selectedCpu || !selectedGpu || !selectedRam || !selectedStorage || !selectedMobo || !selectedCooler}
                onClick={handleAddRigToCart}
                className="w-full py-4 bg-[#00f2ff] hover:bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-none transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.2)] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {addSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-bounce text-black" />
                    RIG DIMASUKKAN KE KERANJANG!
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    KIRIM RAKITAN KUSTOM INI KE KERANJANG
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
