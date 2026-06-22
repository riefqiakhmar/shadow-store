import { Product, GameSupport } from '../types';

export const productsData: Product[] = [
  {
    id: 'gpu-rtx4090',
    category: 'GPU',
    name: 'Vortex ROG Strix Edition GeForce RTX 4040 Ultra',
    brand: 'VORTEX Tech',
    price: 36999000,
    description: 'Arsitektur ultra-efisien terbaru dengan Ray Tracing generasi ke-3 yang sangat cepat dan super-resolution upscaling cerdas berbasis DLSS 4. Dilengkapi pendingin quad-slot Armor-Glow.',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Memory': '24GB GDDR6X',
      'Memory Bus': '384-bit',
      'CUDA Cores': '16384',
      'Boost Clock': '2.62 GHz',
      'Power Connector': '1x 16-pin (12VHPWR)',
      'Recommended PSU': '1000W'
    },
    isPopular: true,
    benchmarkScore: {
      label: 'Cyberpunk 2077 RTX Overdrive (4K)',
      value: 125,
      unit: 'FPS'
    },
    features: ['DLSS 4 Multi-Frame Generation', 'Full Path Tracing Max', '8K 60Hz HDR Dual-stream', 'Braket Metalik Premium'],
    stock: 5
  },
  {
    id: 'gpu-rtx4080s',
    category: 'GPU',
    name: 'Vortex Trinity GeForce RTX 4080 SUPER Active',
    brand: 'VORTEX Tech',
    price: 19850000,
    description: 'Kombinasi performa 4K mentah murni dengan efisiensi thermal superior. Ideal untuk pro-gamer dan konten kreator rendering 3D intensif.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Memory': '16GB GDDR6X',
      'Memory Bus': '256-bit',
      'CUDA Cores': '10240',
      'Boost Clock': '2.55 GHz',
      'Power Connector': '1x 16-pin',
      'Recommended PSU': '850W'
    },
    isPopular: false,
    benchmarkScore: {
      label: 'Witcher 3 Next-Gen Max RTX (4K)',
      value: 92,
      unit: 'FPS'
    },
    features: ['DLSS Frame Generation', 'Dual Bios Tech', 'RGB Fusion Sync', 'Sistem Kipas Triple Wave'],
    stock: 8
  },
  {
    id: 'gpu-rtx4070ts',
    category: 'GPU',
    name: 'Vortex TwinForce GeForce RTX 4070 Ti SUPER',
    brand: 'VORTEX Tech',
    price: 15450000,
    description: 'Kartu grafis pilihan ideal untuk resolusi 1440p kompetitif ultra-lancar dengan upgrade RAM 16GB GDDR6X untuk masa depan game open-world modern.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Memory': '16GB GDDR6X',
      'Memory Bus': '256-bit',
      'CUDA Cores': '8448',
      'Boost Clock': '2.65 GHz',
      'Recommended PSU': '750W'
    },
    isPopular: true,
    benchmarkScore: {
      label: 'Alan Wake 2 Path Tracing (1440p)',
      value: 86,
      unit: 'FPS'
    },
    features: ['DLSS Super Resolution', 'NVIDIA Reflex Latency', 'Quiet Mode Switch', 'Logam Protective Backplate'],
    stock: 12
  },
  {
    id: 'cpu-i9',
    category: 'CPU',
    name: 'Intel Core i9-14900K Supreme Processor',
    brand: 'Intel',
    price: 10250000,
    description: 'Arsitektur hibrid revolusioner dengan 24 Core (8 P-core + 16 E-core). Memberikan clockspeed hingga 6.0 GHz tanpa overclocking manual.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Total Cores': '24 Cores (8P + 16E)',
      'Total Threads': '32 Threads',
      'Max Turbo Frequency': '6.00 GHz',
      'Cache': '36MB Intel Smart Cache',
      'Socket Compatibility': 'LGA1700',
      'Max Memory Support': '192GB DDR5'
    },
    isPopular: true,
    features: ['Intel Thermal Velocity Boost', 'PCIe Gen 5.0 & 4.0 Ready', 'Unlocked Overclocking Enabled', 'Arsitektur Core Hybrid'],
    stock: 15
  },
  {
    id: 'cpu-r7',
    category: 'CPU',
    name: 'AMD Ryzen 7 7800X3D 3D V-Cache CPU',
    brand: 'AMD',
    price: 7450000,
    description: 'Prosesor gaming tercepat di dunia saat ini dengan teknologi penumpukan cache 3D vertikal revolusioner, meminimalkan FPS drops di game berat.',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Total Cores': '8 Cores',
      'Total Threads': '16 Threads',
      'Boost Clock': 'Up to 5.0 GHz',
      'Total L3 Cache': '96MB (3D V-Cache)',
      'Socket Compatibility': 'AM5',
      'TDP': '120W'
    },
    isPopular: true,
    features: ['AMD 3D V-Cache Technology', 'AMD EXPO Memory Profile', 'AMD Ryzen Master Utility', 'Zen 4 Core Architecture'],
    stock: 20
  },
  {
    id: 'ram-ddr5-32',
    category: 'RAM',
    name: 'Vortex Dominator RGB DDR5 32GB (2x16GB) 6000MHz',
    brand: 'Premium-DRAM',
    price: 2650000,
    description: 'Modul RAM kecepatan ultra-tinggi yang dipasangkan dengan heatsink aluminium hitam beranodisasi premium serta lampu LED RGB beralamat penuh.',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Capacity': '32GB (2 x 16GB)',
      'Speed': '6000 MHz (PC5-48000)',
      'Latency': 'CL30-36-36-76',
      'Voltage': '1.35V',
      'Form Factor': '288-pin DIMM',
      'Profile': 'AMD EXPO / Intel XMP 3.0'
    },
    isPopular: false,
    features: ['RGB LED Customizable', 'High Efficiency Spreader', 'Hand-Sorted IC Chips', 'On-Die ECC Error Correction'],
    stock: 35
  },
  {
    id: 'storage-ssd-2tb',
    category: 'STORAGE',
    name: 'HyperSpeed Extreme PCIe Gen5 M.2 SSD 2TB',
    brand: 'ApexStorage',
    price: 3450000,
    description: 'Lompatan kecepatan penyimpanan murni hingga 14.000 MB/dtk. Membuka game, boot OS, serta memindah file file raksasa secara instan.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Capacity': '2TB (2000GB)',
      'Interface': 'PCIe Gen 5.0 x4, NVMe 2.0',
      'Max Sequential Read': 'Up to 14,000 MB/s',
      'Max Sequential Write': 'Up to 12,000 MB/s',
      'Controller': 'Phison PS5026-E26',
      'Form Factor': 'M.2 2280'
    },
    isPopular: false,
    features: ['Aluminium Active Heatsink Included', 'DirectStorage Optimized', 'Smart Drive Health Monitoring', 'Dynamic Cache buffer'],
    stock: 25
  },
  {
    id: 'cooler-360',
    category: 'COOLER',
    name: 'Vortex Liquid Core LCD 360 AIO Liquid Cooler',
    brand: 'VORTEX Tech',
    price: 2950000,
    description: 'Pendingin cairan AIO tingkat antusias dengan layar IPS LCD 2.8 inci melingkar pada waterblock untuk memuat stats real-time PC atau GIF favorit.',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Radiator Size': '360mm Triple Fan',
      'Pump Speed': '3500 RPM',
      'Waterblock LCD': '2.8 inch IPS 480x480px',
      'Fan Speed': '800 - 2400 RPM (PWM)',
      'Noise Level': 'Under 29 dBA',
      'Socket Support': 'Intel LGA1700 / AMD AM5 AM4'
    },
    isPopular: true,
    features: ['Smart Liquid Temp Thermostat', 'Full Custom GIF & Stat on Board', 'Whisper Quiet Motor Tech', 'Premium Braided Tubing'],
    stock: 14
  },
  {
    id: 'mobo-z790',
    category: 'MOTHERBOARD',
    name: 'Vortex Creator Z790 WiFi Extreme DDR5',
    brand: 'VORTEX Tech',
    price: 5850000,
    description: 'Papan induk premium untuk prosesor Intel Generasi 14. Dilengkapi VRM 20+1+2 phase super kuat, WiFi 7, PCIe Gen 5 penuh, dan heatsink melimpah.',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=600',
    specs: {
      'Chipset': 'Intel Z790',
      'Memory Slots': '4x DDR5 DIMM (Up to 8000MHz OC)',
      'Expansion Slots': '2x PCIe 5.0 x16, 1x PCIe 4.0 x16',
      'Storage Slots': '5x M.2 Slots (1x Gen5, 4x Gen4)',
      'Networking': 'WiFi 7 + Intel 2.5 GbE LAN',
      'Audio': 'Realtek ALC4082 DAC high-def'
    },
    isPopular: false,
    features: ['Wi-Fi 7 Antenna Included', 'Magnetic M.2 Screwless EZ-Latch', 'Pre-mounted I/O Shield', 'Diagnostic Smart LED Display'],
    stock: 18
  },
  {
    id: 'prebuild-avalanche',
    category: 'PREBUILD',
    name: 'VORTEX AVALANCHE V1 Ultimate Gaming System',
    brand: 'VORTEX Tech',
    price: 54999000,
    description: 'Komputer prebuilt rakitan professional Vortex level legendaris. Menyatukan monster grafis RTX 4090 Ultra dengan prosesor Intel i9-14900K dalam sasis kaca panorama ganda.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    specs: {
      'GPU Installed': 'Vortex GeForce RTX 4040 Ultra 24GB',
      'CPU Installed': 'Intel Core i9-14900K (Max 6.0 GHz)',
      'RAM Installed': 'Vortex Dominator DDR5 64GB Extreme Dual-Ch',
      'SSD Installed': 'HyperSpeed NVMe Gen5 M.2 SSD 4TB',
      'Cooler': 'Vortex Core Liquid 360 LCD RGB AIO',
      'Power Supply': 'Vortex 1200W Titanium ATX 3.0 Gold',
      'Operating System': 'Windows 11 Pro 64-bit OEM Activated'
    },
    isPopular: true,
    benchmarkScore: {
      label: 'PCMark Ultimate 3D Unreal Engine 5 Benchmark',
      value: 189,
      unit: 'FPS'
    },
    features: ['3 Years Platinum Warranty', 'Custom RGB Lighting Profiles Pre-loaded', 'Pro-Tuned Overclocking Profile', 'Laser-Etched Chassis Glass'],
    stock: 3
  },
  {
    id: 'prebuild-eclipse',
    category: 'PREBUILD',
    name: 'VORTEX ECLIPSE X3 Esports Competitive Rig',
    brand: 'VORTEX Tech',
    price: 32500000,
    description: 'Dirancang khusus untuk esports shooter dan gameplay 1440p super-smooth. Didukung oleh prosessor efisiensi-game terbaik Ryzen 7800X3D dan GPU RTX 4070 Ti Super.',
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=800',
    specs: {
      'GPU Installed': 'Vortex TwinForce GeForce RTX 4070 Ti SUPER 16GB',
      'CPU Installed': 'AMD Ryzen 7 7800X3D (3D V-Cache)',
      'RAM Installed': 'Vortex Dominator DDR5 32GB 6000MHz CL30',
      'SSD Installed': 'HyperSpeed NVMe Gen4 M.2 SSD 2TB',
      'Cooler': 'Vortex Core Liquid 240 Premium Liquid AIO',
      'Power Supply': 'Vortex 850W Gold ATX 3.0 Ready',
      'Operating System': 'Windows 11 Home 64-bit Ready'
    },
    isPopular: true,
    benchmarkScore: {
      label: 'Valorant competitive (1440p Custom High)',
      value: 480,
      unit: 'FPS'
    },
    features: ['Ready-To-Play Out of the Box', 'Whisper-Quiet Fan Curve Optimization', 'High Airflow Dual- Chamber Case', 'Lifetime Tech Call support'],
    stock: 6
  }
];

export const gamesData: GameSupport[] = [
  {
    id: 'cyberpunk',
    title: 'Cyberpunk 2077',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    hasRayTracing: true,
    hasDLSS: true,
    hasReflex: true,
    fpsMultiplier: '4.6x',
    description: 'Nikmati salah satu visual terbaik dalam sejarah game dengan Full Path Tracing (RTX Overdrive Mode). Cahaya, pantulan, dan bayangan memantul secara real-time di malam Kota Neon Night City.'
  },
  {
    id: 'alanwake2',
    title: 'Alan Wake 2',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    hasRayTracing: true,
    hasDLSS: true,
    hasReflex: true,
    fpsMultiplier: '3.8x',
    description: 'Masuki petualangan horor psikologis imersif di kota kecil Bright Falls. Detail ambient occlusion dan dynamic path-traced global illumination menyulap suasananya super menegangkan.'
  },
  {
    id: 'mccrtx',
    title: 'Minecraft with RTX',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80&w=600',
    hasRayTracing: true,
    hasDLSS: true,
    hasReflex: false,
    fpsMultiplier: '2.8x',
    description: 'Transformasikan petualangan balok legendaris Anda dengan real-time path-traced lighting. Air berkilau jernih memantulkan cahaya obor, lava menerangi gua-gua dengan rona merah menyala.'
  },
  {
    id: 'wukong',
    title: 'Black Myth: Wukong',
    image: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=600',
    hasRayTracing: true,
    hasDLSS: true,
    hasReflex: true,
    fpsMultiplier: '3.5x',
    description: 'Alami mitologi Tiongkok yang memukau dengan dedaunan bergoyang, bebatuan berlumut lembap, serta air mengalir jernih berkilau yang dihitung penuh dengan algoritma Ray Tracing ultra-modern.'
  }
];

export const heroSlides = [
  {
    title: "NEURAL GRAPHICS REVOLUTION",
    subtitle: "VORTEX NVIDIA EDITION RIGS",
    description: "Nikmati lompatan performa komputasi murni dengan rasi kekuatan eksklusif Ray Tracing on-board & DLSS AI Neural Reconstruction pada Custom PC andalan Anda.",
    cta: "Rakit PC Impian",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
    badge: "NEW GENERATION"
  },
  {
    title: "VORTEX MONSTER RTX 40-SERIES",
    subtitle: "KARTU GRAFIS EDISI LIMITASI GAHAR",
    description: "Dipasangkan dengan sistem pengatur daya mutakhir & heatsink armor premium untuk menjamin kecepatan clock tertinggi yang stabil dingin dan senyap.",
    cta: "Belanja Komponen",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1200",
    badge: "EXCLUSIVELY CRAFTED"
  },
  {
    title: "PRO-LEVEL E-SPORTS DESKTOPS",
    subtitle: "STABILITAS CHASSIS PANORAMIK",
    description: "Sasis ganda dengan air-flow teroptimasi penuh oleh teknisi profesional. Siap mendominasi turnamen dengan latensi terkecil via dukungan Nvidia Reflex terintegrasi.",
    cta: "Lihat Prebuilt PCs",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=1200",
    badge: "ULTRA FPS READY"
  }
];
