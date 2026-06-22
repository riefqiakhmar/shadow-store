import React, { useState, useRef, useEffect } from 'react';
import { Eye, Gamepad2, Sparkles, Cpu, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ScenePreset {
  id: string;
  name: string;
  rtxOffTitle: string;
  rtxOnTitle: string;
  rtxOffDesc: string;
  rtxOnDesc: string;
  iconBg: string;
  onBgClass: string;
  offBgClass: string;
}

export default function RtxSlider() {
  const [activeScene, setActiveScene] = useState<string>('cyberpunk');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenes: ScenePreset[] = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon Street',
      rtxOffTitle: 'RTX OFF (Rasterized)',
      rtxOnTitle: 'RTX ON (Full Path Tracing)',
      rtxOffDesc: 'Pantulan air di aspal datar tanpa radiasi warna, pencahayaan statis gelap seragam, bayangan kasar.',
      rtxOnDesc: 'Pantulan lampu neon memantul akurat secara real-time pada genangan air basah; emisi cahaya volumetric dinamis.',
      iconBg: 'bg-indigo-500',
      onBgClass: 'from-[#0b0416] via-[#110626] to-[#250d4d]',
      offBgClass: 'from-[#121214] via-[#1c1c21] to-[#2b2b36]'
    },
    {
      id: 'rig',
      name: 'Vortex Custom Rig',
      rtxOffTitle: 'RTX OFF (Flat)',
      rtxOnTitle: 'RTX ON (Hardware Accelerated Refract)',
      rtxOffDesc: 'Kaca tempered case buram tanpa pantulan cahaya sekeliling, efek kipas RGB statis 2D.',
      rtxOnDesc: 'Pantulan akurat komponen RGB di kaca, refraksi pipa pendingin cangkang akrilik, dan spekuler cahaya memukau.',
      iconBg: 'bg-emerald-500',
      onBgClass: 'from-[#051108] via-[#081e11] to-[#124225]',
      offBgClass: 'from-[#111111] via-[#1a1a1a] to-[#2a2a2a]'
    },
    {
      id: 'minecraft',
      name: 'Minecraft Adventure Cave',
      rtxOffTitle: 'RTX OFF (Standard Blocks)',
      rtxOnTitle: 'RTX ON (Path Tracing Lights)',
      rtxOffDesc: 'Pencahayaan statis seragam, tidak ada pendaran cahaya dari balok lava atau glowstone.',
      rtxOnDesc: 'Cahaya lava mengalirkan rona jingga hangat menerangi stalaktit, pantulan cermin air bawah tanah, bayangan soft-shadow.',
      iconBg: 'bg-amber-500',
      onBgClass: 'from-[#170e02] via-[#2d1c05] to-[#59390a]',
      offBgClass: 'from-[#151515] via-[#202020] to-[#2f2f2f]'
    }
  ];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const currentScene = scenes.find((s) => s.id === activeScene) || scenes[0];

  return (
    <section id="rtx-section" className="py-24 bg-[#020202] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/20 rounded-none mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00f2ff]" />
            <span className="text-[9px] text-[#00f2ff] font-bold uppercase tracking-[0.2em] font-mono">Neural Simulation Engine</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black italic uppercase leading-none tracking-tighter text-white">
            RTX <span className="text-[#00f2ff] text-glow">ON</span> VS <span className="text-white/30">OFF</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs sm:text-sm font-light leading-relaxed">
            Geser slider di bawah untuk mensimulasikan visual komputasi masa depan secara langsung pada sasis dan game pendukung.
          </p>
        </div>

        {/* Preset Selectors */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveScene(scene.id);
                setSliderPosition(50);
              }}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-none border text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeScene === scene.id
                  ? 'border-[#00f2ff] bg-[#00f2ff]/10 text-white shadow-[0_0_20px_rgba(0,242,255,0.15)]'
                  : 'border-white/5 bg-black text-white/50 hover:text-white hover:border-white/10'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-none ${scene.id === 'cyberpunk' ? 'bg-[#00f2ff]' : 'bg-white'}`} />
              {scene.name}
            </button>
          ))}
        </div>

        {/* Slider Sandbox */}
        <div 
          ref={containerRef}
          className="relative h-[480px] sm:h-[550px] w-full rounded-none overflow-hidden border border-white/10 shadow-2xl select-none cursor-ew-resize bg-black"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            if (e.touches[0]) handleMove(e.touches[0].clientX);
          }}
          id="rtx-compare-container"
        >
          {/* 1. RTX OFF Layer (Base/Right side element) */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black flex flex-col justify-between p-8 sm:p-12 text-zinc-400">
            {/* RTX OFF Scenery Representation */}
            {activeScene === 'cyberpunk' && (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1a1a24_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
                <div className="w-[85%] h-[80%] rounded-none bg-gradient-to-br from-black to-zinc-950 border border-white/5 p-8 relative overflow-hidden flex flex-col justify-end">
                  <div className="w-56 h-56 rounded-none bg-zinc-900/10 blur-3xl absolute -top-10 -right-10"></div>
                  <div className="space-y-4">
                    <div className="h-6 w-32 bg-zinc-900 rounded-none"></div>
                    <div className="h-4 w-48 bg-zinc-900/60 rounded-none"></div>
                    <div className="flex gap-4">
                      <div className="h-10 w-24 bg-zinc-900 rounded-none"></div>
                      <div className="h-10 w-24 bg-zinc-900 rounded-none"></div>
                    </div>
                  </div>
                  {/* Dull Neon representation */}
                  <div className="absolute left-[30%] top-1/3 text-[2rem] font-black text-zinc-800 select-none text-center">
                    NEON GLOW<br/>
                    <span className="text-xs font-mono text-zinc-700">(NO REFLECTION)</span>
                  </div>
                </div>
              </div>
            )}

            {activeScene === 'rig' && (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#202020_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center">
                <div className="w-[85%] h-[80%] rounded-none bg-black border border-white/5 p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div className="w-16 h-1 w-24 bg-zinc-900 rounded-none"></div>
                    <div className="w-12 h-12 rounded-none border-4 border-zinc-900 border-t-transparent animate-spin"></div>
                  </div>
                  {/* Inside components placeholder */}
                  <div className="border border-white/5 rounded-none p-4 space-y-3 bg-zinc-950/40">
                    <div className="h-3 w-3/4 bg-zinc-900 rounded-none"></div>
                    <div className="h-3 w-1/2 bg-zinc-900 rounded-none"></div>
                  </div>
                  <div className="absolute right-[10%] top-1/2 text-xl font-bold text-zinc-800 uppercase tracking-widest">
                    Chassis Glass Frame
                  </div>
                </div>
              </div>
            )}

            {activeScene === 'minecraft' && (
              <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                <div className="w-[85%] h-[80%] border-4 border-white/5 p-4 grid grid-cols-6 gap-2">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-zinc-950 border border-white/5 rounded-none flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-black"></div>
                    </div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono text-zinc-700 font-bold bg-black px-4 py-2 border border-white/5 uppercase tracking-widest">Cavelight Flat (0.0 Lux)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Content elements overlay */}
            <div className="relative z-10 w-full flex justify-between items-start pointer-events-none">
              <div></div>
              <div className="bg-black/95 backdrop-blur-md px-3 py-2 rounded-none border border-white/10 text-right">
                <span className="block text-[8px] text-white/40 font-mono tracking-widest uppercase mb-0.5">System Rasterization</span>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{currentScene.rtxOffTitle}</span>
              </div>
            </div>

            <div className="relative z-10 max-w-sm ml-auto text-right pointer-events-none">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">62 FPS Avg</span>
              <p className="mt-1 text-[11px] text-white/50 bg-black/95 p-3.5 rounded-none border border-white/10 inline-block max-w-xs leading-relaxed font-light">
                {currentScene.rtxOffDesc}
              </p>
            </div>
          </div>

          {/* 2. RTX ON Layer (Clipped/Left side element) */}
          <div 
            className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br flex flex-col justify-between p-8 sm:p-12 text-zinc-100 transition-shadow duration-300 pointer-events-none border-r border-[#00f2ff]/30 shadow-[5px_0_30px_rgba(0,242,255,0.15)]"
            style={{ width: `${sliderPosition}%`, ...{ '--tw-gradient-from': '#000000', '--tw-gradient-to': '#050505' } as React.CSSProperties }}
            id="rtx-on-slide-pane"
          >
            {/* RTX ON Scenery Representation (We must force content width to match container) */}
            <div 
              className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between"
              style={{ width: containerRef.current?.getBoundingClientRect().width }}
            >
              {/* Vibrant active graphics */}
              {activeScene === 'cyberpunk' && (
                <div className="absolute inset-0 bg-[radial-gradient(#00f2ff_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
                  <div className="w-[85%] h-[80%] rounded-none bg-gradient-to-br from-black to-[#050e14] border border-[#00f2ff]/40 p-8 relative overflow-hidden flex flex-col justify-end shadow-[0_0_40px_rgba(0,242,255,0.1)]">
                    {/* Glowing Light streams */}
                    <div className="w-80 h-80 rounded-none bg-[#00f2ff]/10 blur-[100px] absolute -top-10 -right-10 animate-pulse"></div>
                    <div className="w-72 h-72 rounded-none bg-[#00f2ff]/15 blur-[120px] absolute top-1/3 left-10"></div>
                    
                    <div className="space-y-4">
                      <div className="h-6 w-32 bg-[#00f2ff]/20 border border-[#00f2ff]/30 rounded-none shadow-[0_0_15px_rgba(0,242,255,0.2)]"></div>
                      <div className="h-4 w-48 bg-[#00f2ff]/10 border border-[#00f2ff]/20 rounded-none"></div>
                      <div className="flex gap-4">
                        <div className="h-10 w-24 bg-[#00f2ff] text-black font-black text-[10px] uppercase tracking-widest rounded-none flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)]">RTX ON</div>
                        <div className="h-10 w-24 bg-black border border-[#00f2ff]/30 rounded-none flex items-center justify-center text-[10px] tracking-widest font-bold text-white uppercase text-glow">DLSS 4</div>
                      </div>
                    </div>
                    {/* Glowing neon water reflection */}
                    <div className="absolute left-[30%] top-1/3 text-[2rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-white select-none text-center leading-none animate-pulse">
                      NEON GLOW<br/>
                      <span className="text-[10px] font-mono text-[#00f2ff] tracking-[0.25em] text-glow uppercase block mt-2">Real-Time Light Rays</span>
                    </div>
                  </div>
                </div>
              )}

              {activeScene === 'rig' && (
                <div className="absolute inset-0 bg-[radial-gradient(#00f2ff_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center">
                  <div className="w-[85%] h-[80%] rounded-none bg-black border border-[#00f2ff]/30 p-8 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,242,255,0.1)]">
                    <div className="w-64 h-64 bg-[#00f2ff]/5 blur-[80px] absolute top-10 right-10"></div>
                    <div className="flex justify-between items-center">
                      <div className="w-24 h-2.5 bg-gradient-to-r from-[#00f2ff] to-white rounded-none shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
                      <div className="w-14 h-14 rounded-none border-4 border-[#00f2ff] border-t-white animate-spin flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                        <Cpu className="w-5 h-5 text-[#00f2ff] animate-pulse" />
                      </div>
                    </div>
                    {/* Glowing hardware with path traced reflections */}
                    <div className="border border-[#00f2ff]/20 rounded-none p-4 space-y-3 bg-[#00f2ff]/10 shadow-[0_0_15px_rgba(0,242,255,0.05)]">
                      <div className="h-3 w-3/4 bg-[#00f2ff]/30 rounded-none"></div>
                      <div className="h-3 w-1/2 bg-white/30 rounded-none"></div>
                    </div>
                    <div className="absolute right-[10%] top-1/2 text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-white uppercase tracking-widest text-glow">
                      RAY REFRACTIVE GLASS
                    </div>
                  </div>
                </div>
              )}

              {activeScene === 'minecraft' && (
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <div className="w-[85%] h-[80%] border-4 border-[#00f2ff]/30 p-4 grid grid-cols-6 gap-2 bg-gradient-to-b from-[#011421] to-black relative overflow-hidden">
                    {/* Warm ambient lava glow simulation */}
                    <div className="w-72 h-72 rounded-none bg-[#00f2ff]/10 blur-[60px] absolute -bottom-10 -left-10 animate-pulse"></div>
                    <div className="w-48 h-48 rounded-none bg-white/5 blur-[50px] absolute top-10 right-10"></div>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const isLavaLight = i % 5 === 0;
                      return (
                        <div key={i} className={`aspect-square border rounded-none flex items-center justify-center transition-all duration-300 ${
                          isLavaLight 
                            ? 'bg-[#00f2ff]/30 border-[#00f2ff] shadow-[0_0_10px_rgba(0,242,255,0.3)] animate-pulse' 
                            : 'bg-zinc-950 border-zinc-800'
                        }`}>
                          <div className={`w-3/4 h-3/4 rounded-none ${isLavaLight ? 'bg-white' : 'bg-black'}`}></div>
                        </div>
                      );
                    })}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-mono text-[#00f2ff] font-extrabold bg-black px-4 py-2 border border-[#00f2ff]/30 shadow-[0_0_15px_rgba(0,242,255,0.25)] uppercase tracking-widest">Path-Traced Glow ON</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Top and bottom controls on clipped pane */}
              <div className="w-full flex justify-between items-start">
                <div className="bg-[#00f2ff] px-3 py-2 rounded-none text-black font-black shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                  <span className="block text-[8px] text-black/70 font-mono tracking-widest uppercase font-extrabold mb-0.5">Neural Accelerator</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{currentScene.rtxOnTitle}</span>
                </div>
              </div>

              <div className="max-w-sm text-left">
                <span className="text-[9px] font-mono text-[#00f2ff] font-bold bg-[#00f2ff]/10 px-2 py-0.5 rounded-none border border-[#00f2ff]/30 uppercase tracking-widest">174 FPS (DLSS 4 + Reflex)</span>
                <p className="mt-1 text-[11px] text-white/90 bg-black/95 p-3.5 rounded-none border border-[#00f2ff]/30 inline-block leading-relaxed font-light">
                  {currentScene.rtxOnDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Slider Centered Glass Handle */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-[#00f2ff]/80 pointer-events-none touch-none shadow-[0_0_15px_rgba(0,242,255,0.6)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-black/95 border-2 border-[#00f2ff] shadow-[0_0_25px_rgba(0,242,255,0.5)] backdrop-blur-md">
              <div className="flex gap-1 items-center">
                <div className="w-1 h-3.5 bg-[#00f2ff]/70 rounded-full animate-pulse"></div>
                <div className="w-1 h-5.5 bg-[#00f2ff] rounded-full"></div>
                <div className="w-1 h-3.5 bg-[#00f2ff]/70 rounded-full animate-pulse"></div>
              </div>
            </div>
            {/* Guide markers on handle */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-[#00f2ff] text-[8px] font-mono font-bold px-2 py-0.5 rounded-none border border-[#00f2ff]/40 tracking-widest uppercase">COMPARE</div>
          </div>
        </div>

        {/* Feature bullets of our Custom hardware core */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="p-8 bg-black rounded-none border border-white/10 hover:border-[#00f2ff] transition-colors duration-300">
            <div className="w-10 h-10 rounded-none bg-[#00f2ff]/10 flex items-center justify-center mb-4 border border-[#00f2ff]/20">
              <Eye className="w-5 h-5 text-[#00f2ff]" />
            </div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">Full Path Tracing</h3>
            <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
              Mensimulasikan sifat fisik cahaya secara sempurna. Setiap sinar dihitung secara dinamis dari puluhan kali pantul, menghasilkan bayangan dan pantulan yang menyamai realitas dunia nyata.
            </p>
          </div>
          <div className="p-8 bg-black rounded-none border border-white/10 hover:border-[#00f2ff] transition-colors duration-300">
            <div className="w-10 h-10 rounded-none bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">DLSS 4 Neural Frame Gen</h3>
            <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
              Membangun frame tambahan berkualitas premium menggunakan model kecerdasan buatan (Neural Network) berkecepatan tinggi, meningkatkan frame-rate hingga 4 kali lipat tanpa merusak piksel.
            </p>
          </div>
          <div className="p-8 bg-black rounded-none border border-white/10 hover:border-[#00f2ff] transition-colors duration-300">
            <div className="w-10 h-10 rounded-none bg-zinc-800 flex items-center justify-center mb-4 border border-white/10">
              <Cpu className="w-5 h-5 text-zinc-300" />
            </div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">NVIDIA Reflex Latency reduction</h3>
            <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
              Mensinkronisasi antrian frame CPU dan GPU secara instan, memotong latensi input mouse Anda secara ekstrem untuk respon bidikan kompetitif game esports yang mutlak presisi.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
