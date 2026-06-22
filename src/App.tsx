import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Zap, Search, ShoppingBag, Eye, Star, Check, Award, ArrowUpRight, CheckCircle2, Sliders, ShieldCheck, Mail, Phone, MapPin 
} from 'lucide-react';

// Custom data types & items
import { Product, CartItem } from './types';
import { productsData, gamesData, heroSlides } from './data/products';

// Custom modules
import Navbar from './components/Navbar';
import RtxSlider from './components/RtxSlider';
import ProductDetailModal from './components/ProductDetailModal';
import PcBuilder from './components/PcBuilder';
import Cart from './components/Cart';
import ChatService from './components/ChatService';
import Footer from './components/Footer';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Shop filters
  const [searchQuery, setSearchQuery] = useState('');
  const [shopCategory, setShopCategory] = useState<string>('ALL');

  // Automatic Hero Carousel changer ticking every 3 seconds (3000ms)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  // Format IDR currency helper
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Check if product already exists
      const existingIdx = prevItems.findIndex(item => item.product.id === product.id && !item.customSelections);
      if (existingIdx > -1) {
        const newItems = [...prevItems];
        newItems[existingIdx].quantity += 1;
        return newItems;
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleAddCustomRigToCart = (selections: {
    cpu?: Product;
    gpu?: Product;
    ram?: Product;
    storage?: Product;
    cooler?: Product;
    motherboard?: Product;
  }) => {
    // Generate simulated prebuild wrapping wrapper
    const customId = `custom-rig-${Date.now()}`;
    const customRigProduct: Product = {
      id: customId,
      category: 'PREBUILD',
      name: 'VORTEX Customizable Extreme Gaming Rig',
      brand: 'VORTEX Custom Labs',
      price: Object.values(selections).reduce((sum, item) => sum + (item?.price || 0), 0),
      description: 'PC gaming kustom hasil racikan rancang bangun modular pilihan Anda sendiri. Dirakit profesional oleh elite tech, lengkap stress-test beban penuh.',
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
      specs: {},
      features: ['Fully customizable modular structure', 'Stress-Tested for 24 Hours', 'Premium Sleeved Cable Management'],
      stock: 1
    };

    setCartItems((prev) => [
      ...prev,
      {
        product: customRigProduct,
        quantity: 1,
        customSelections: selections
      }
    ]);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const navigateToSection = (section: string) => {
    setCurrentSection(section);
    // Smooth scroll page helper
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(`${section}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Filter products by category and active search
  const filteredProducts = productsData.filter((prod) => {
    const matchesCategory = shopCategory === 'ALL' || prod.category === shopCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-zinc-950 font-sans text-white">
      
      {/* 1. Header Navigation block */}
      <Navbar 
        cartItemsCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={navigateToSection}
        currentSection={currentSection}
      />

      {/* 2. AUTOMATIC CAROUSEL HERO SECTION - Changes automatically every 3 seconds */}
      <header className="relative h-[85vh] sm:h-[80vh] w-full bg-[#020202] overflow-hidden border-b border-white/5">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, idx) => {
            if (idx !== activeSlide) return null;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                {/* Background image overlay with realistic light leakage */}
                <div className="absolute inset-0 dark-overlay bg-gradient-to-r from-black via-transparent to-black z-10" />
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Grid container layout */}
                <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col md:flex-row items-center justify-between">
                  <div className="max-w-xl">
                    
                    {/* Editorial Bars Indicator */}
                    <div className="flex space-x-1 mb-6">
                      {heroSlides.map((_, dotIdx) => (
                        <div 
                          key={dotIdx}
                          className={`h-1 transition-all duration-300 ${
                            activeSlide === dotIdx ? 'w-12 bg-[#00f2ff]' : 'w-6 bg-white/20'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Title */}
                    <motion.h1 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl sm:text-7xl font-black italic uppercase leading-[0.95] tracking-tighter text-white"
                    >
                      {slide.title.split(' ')[0]}<br/>
                      <span className="text-[#00f2ff] text-glow">{slide.title.split(' ').slice(1).join(' ')}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 text-[10px] font-bold font-mono tracking-[0.25em] text-[#00f2ff] uppercase"
                    >
                      // {slide.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 max-w-md text-white/60 text-xs sm:text-sm font-light leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex flex-wrap gap-4"
                    >
                      <button
                        onClick={() => navigateToSection('builder')}
                        className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition-all cursor-pointer"
                      >
                        {slide.cta}
                      </button>
                      <button
                        onClick={() => navigateToSection('shop')}
                        className="border border-white/20 hover:border-[#00f2ff] px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-white transition-all bg-transparent"
                      >
                        SPECIFICATIONS
                      </button>
                    </motion.div>

                  </div>

                  {/* Graphic Block mimicking the editorial right side offset frame */}
                  <div className="hidden md:block w-72 h-80 bg-zinc-900 border-4 border-zinc-800 rotate-6 shadow-[0_0_50px_rgba(0,242,255,0.15)] relative overflow-hidden shrink-0 mt-8 md:mt-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10"></div>
                    <img src={slide.image} className="w-full h-full object-cover opacity-60 scale-110" alt="Hardware layout item shadow" />
                    <div className="absolute top-4 left-4 text-[8px] text-zinc-500 font-mono tracking-widest uppercase z-20">PRO SERIES PLATFORM v5.0</div>
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="text-[10px] text-[#00f2ff] font-bold uppercase tracking-widest">{slide.badge}</div>
                      <div className="text-white text-xs font-bold uppercase mt-1">Calibrated Elite Standard</div>
                    </div>
                  </div>

                </div>

                {/* Bottom navigation slide changer dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {heroSlides.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveSlide(dotIdx)}
                      className={`h-1.5 transition-all duration-300 ${
                        activeSlide === dotIdx ? 'w-8 bg-[#00f2ff]' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </header>

      {/* 3. HARDWARE CORE KEY VALUES SECTION */}
      <section className="py-16 bg-[#020202] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 bg-[#00f2ff]/5 border border-[#00f2ff]/20 rounded-none">
                <Award className="w-6 h-6 text-[#00f2ff]" />
              </div>
              <div>
                <h4 className="text-white font-black italic uppercase text-sm tracking-wider">Premium Systems</h4>
                <p className="text-xs text-white/50 mt-2 leading-relaxed font-light">
                  Semua rakitan ditangani oleh Certified System Engineers. Stress-test penuh, manajemen kabel kustom, dan prapasang driver terbaru.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 bg-[#00f2ff]/5 border border-[#00f2ff]/20 rounded-none">
                <Sliders className="w-6 h-6 text-[#00f2ff]" />
              </div>
              <div>
                <h4 className="text-white font-black italic uppercase text-sm tracking-wider">Bebas Bottleneck</h4>
                <p className="text-xs text-white/50 mt-2 leading-relaxed font-light">
                  Sistem kecocokan modular kustom pintar kami menjamin clock-speed maksimal tanpa hambatan data konyol antar CPU dan GPU pilihan Anda.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 bg-black rounded-none border border-white/10">
                <ShieldCheck className="w-6 h-6 text-white/60" />
              </div>
              <div>
                <h4 className="text-white font-black italic uppercase text-sm tracking-wider">3 Tahun platinum warranty</h4>
                <p className="text-xs text-white/50 mt-2 leading-relaxed font-light">
                  Toko kami memberikan garansi platinum penuh terproteksi untuk semua kerusakan komponen dan penurunan performa termal casing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE RTX ON/OFF COMPARISON SLIDER */}
      <RtxSlider />

      {/* 5. SHOP CATALOGUE PRODUCTS SECTION */}
      <section id="shop-section" className="py-24 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Section banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
            <div>
              <span className="text-[10px] font-mono text-[#00f2ff] tracking-[0.2em] block font-bold uppercase mb-2">// Vortex Certified Hardware</span>
              <h2 className="text-3xl sm:text-5xl font-black italic uppercase leading-none tracking-tighter text-white">
                KATALOG KOMPONEN <span className="text-[#00f2ff] text-glow">TERUJI</span>
              </h2>
              <p className="mt-3 text-white/50 text-xs sm:text-sm max-w-xl leading-relaxed">
                Pilih komponen berlisensi partner resmi dari processor generasi 14 hingga kartu grafis ray-tracing kencang. Dukungan update bios berkala.
              </p>
            </div>

            {/* Live Search node */}
            <div className="relative mt-6 md:mt-0 w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-white/30" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="CARI GPU, i9, DDR5, SSD..."
                className="w-full bg-black border border-white/10 focus:border-[#00f2ff] focus:outline-none rounded-none py-3 pl-11 pr-4 text-[10px] uppercase font-bold tracking-widest text-white placeholder:text-white/30 transition-colors"
              />
            </div>
          </div>

          {/* Categories Tab selectors */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {[
              { id: 'ALL', label: 'Semua Koleksi' },
              { id: 'GPU', label: 'GPU (RTX Graphics)' },
              { id: 'CPU', label: 'Processor CPU' },
              { id: 'RAM', label: 'High Speed RAM' },
              { id: 'STORAGE', label: 'PCIe NVMe SSD' },
              { id: 'COOLER', label: 'Liquid AIO Cooler' },
              { id: 'PREBUILD', label: 'PC Prebuilt Rigs' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setShopCategory(cat.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  shopCategory === cat.id
                    ? 'bg-[#00f2ff] text-black border-[#00f2ff] font-black'
                    : 'bg-black text-white/60 hover:text-white border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Product Grid layout */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 bg-black">
              <p className="text-white/40 text-xs uppercase tracking-widest">Tidak menemukan hasil hardware dengan nama "{searchQuery}"</p>
              <button
                onClick={() => { setSearchQuery(''); setShopCategory('ALL'); }}
                className="mt-4 px-6 py-2 border border-[#00f2ff] text-[#00f2ff] bg-transparent text-[10px] font-bold uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition"
              >
                SETEL ULANG FILTER
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-none bg-black border border-white/10 hover:border-[#00f2ff] transition-all duration-300 flex flex-col justify-between"
                  id={`product-card-${product.id}`}
                >
                  
                  {/* Popular tags */}
                  {product.isPopular && (
                    <span className="absolute top-4 left-4 z-10 bg-[#00f2ff] text-black text-[9px] font-black tracking-widest px-2.5 py-1 rounded-none uppercase">
                      BEST SELLER
                    </span>
                  )}

                  {/* Photo area */}
                  <div className="relative p-4 bg-zinc-900/30 aspect-square flex items-center justify-center overflow-hidden border-b border-white/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-[160px] object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-4 py-2 border border-white/40 text-white text-[10px] font-bold uppercase tracking-widest hover:border-[#00f2ff] hover:text-[#00f2ff] bg-black transition-all cursor-pointer"
                      >
                        VIEW DETAIL
                      </button>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-black">
                    <div>
                      <span className="text-[8px] text-[#00f2ff] font-mono uppercase tracking-[0.2em] block">
                        {product.brand} &bull; {product.category}
                      </span>
                      <h4 
                        onClick={() => setSelectedProduct(product)}
                        className="text-white font-bold text-xs uppercase tracking-wider leading-tight mt-1 truncate hover:text-[#00f2ff] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-white/50 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Metric info inside card */}
                      {product.benchmarkScore && (
                        <div className="mt-3 flex items-center gap-1.5 p-1.5 px-2 bg-[#00f2ff]/5 border border-[#00f2ff]/10 rounded-none w-fit">
                          <Star className="w-3 h-3 text-[#00f2ff] fill-[#00f2ff]" />
                          <span className="text-[9px] text-white/80 font-mono font-bold leading-none uppercase">
                            {product.benchmarkScore.value} {product.benchmarkScore.unit} Peak
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] text-white/40 block font-mono uppercase tracking-wider">Harga Spesial</span>
                        <span className="text-[#00f2ff] font-black text-xs sm:text-sm font-mono">{formatIDR(product.price)}</span>
                      </div>
                      
                      <button
                        disabled={product.stock <= 0}
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-1.5 bg-transparent border border-white/20 hover:border-[#00f2ff] text-white hover:text-black hover:bg-[#00f2ff] rounded-none text-[9px] font-bold uppercase tracking-wider transition disabled:opacity-30 cursor-pointer"
                      >
                        {product.stock > 0 ? '+ ADD' : 'SOLDOUT'}
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 6. ADVANCED CUSTOM BUILDER SECTION */}
      <PcBuilder onAddCustomRigToCart={handleAddCustomRigToCart} />

      {/* 7. NVIDIA TECHNOLOGIES CERTIFIED GAMES LISTS */}
      <section id="games-section" className="py-24 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header block */}
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono text-[#00f2ff] uppercase tracking-[0.2em] block mb-2 font-bold">// RTX Acceleration verified list</span>
            <h2 className="text-3xl sm:text-5xl font-black italic uppercase leading-none tracking-tighter text-white">
              GAME PENDUKUNG <span className="text-[#00f2ff] text-glow">RTX CORES</span>
            </h2>
            <p className="mt-3 text-white/50 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Komputer rakitan kustom Vortex dikalibrasi penuh untuk game-game legendaris yang mengimplementasikan ray-tracing penuh dan DLSS AI neural scaling.
            </p>
          </div>

          {/* Games listing board cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gamesData.map((game) => (
              <div 
                key={game.id} 
                className="p-6 bg-black rounded-none border border-white/10 flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:border-[#00f2ff] transition-all duration-300"
              >
                
                {/* Photo banner item */}
                <div className="w-full sm:w-1/3 shrink-0 rounded-none overflow-hidden relative aspect-video sm:aspect-square bg-zinc-950 border border-white/10">
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Dynamic performance tag */}
                  <div className="absolute top-3 left-3 bg-[#00f2ff] text-black text-[9px] font-black tracking-widest px-2.5 py-1 rounded-none uppercase shadow">
                    +{game.fpsMultiplier} FPS Boost
                  </div>
                </div>

                {/* Information */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">{game.title}</h4>
                    <p className="text-xs text-white/50 mt-2 leading-relaxed font-light">
                      {game.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4 flex flex-wrap gap-2">
                    {game.hasRayTracing && (
                      <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-none bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20">
                        Ray Tracing On
                      </span>
                    )}
                    {game.hasDLSS && (
                      <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-none bg-purple-500/10 text-purple-400 border border-purple-500/10">
                        DLSS 4 Multi-gen
                      </span>
                    )}
                    {game.hasReflex && (
                      <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-none bg-zinc-800 text-zinc-300 border border-white/5">
                        Reflex Ultra-Latency
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. SHOPPING CART OVERLAY SIDEBAR DRAWER PANEL */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 9. FLOATING CHAT ASSIST BOARD COMPONENT */}
      <ChatService />

      {/* 10. PRODUCT DETAILED MODAL ELEMENT */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 11. FOOTER DIVISION SECTION */}
      <Footer onNavigate={navigateToSection} />

    </div>
  );
}
