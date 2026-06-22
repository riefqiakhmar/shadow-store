import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Bot, Check, Phone, ArrowUpRight } from 'lucide-react';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ChatService() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Selamat datang di VORTEX PC Premium Labs. Saya adalah Virtual Hardware Diagnostic AI. Ada yang bisa saya bantu terkait perakitan kustom PC, rekomendasi kartu grafis RTX, atau ingin langsung terhubung dengan Marketing Representatif kami?',
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Marketing WhatsApp coordinate details
  const marketingWaUrl = "https://wa.me/6281234567890?text=Halo%20Vortex%20PC%20Premium%20Labs%2C%20saya%20tertarik%20untuk%20berkonsultasi%20merakit%20PC%20gaming%20idaman.%20Mohon%20info%20ketersediaan%20lineup%20RTX%20GPU.";

  // Quick prompt buttons
  const quickPrompts = [
    { label: '🔥 Rekomendasi GPU 4K', prompt: 'Rekomendasikan kartu grafis premium terbaik untuk gaming 4K Path Tracing.' },
    { label: '🖥️ Racik PC Gaming Murah', prompt: 'Saya butuh rekomendasi spesifikasi PC rakitan terjangkau namun handal.' },
    { label: '🛡️ Info Garansi & Kirim', prompt: 'Bagaimana garansi pengemasan dan asuransi sasis tempered glass?' },
    { label: '📞 Hubungi Marketing (WA)', isWa: true },
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Simulate smart pre-sales agent response
    setTimeout(() => {
      let botResponseText = '';
      const promptLower = textToSend.toLowerCase();

      if (promptLower.includes('4k') || promptLower.includes('gpu')) {
        botResponseText = 'Untuk gaming 4K murni dan Path Tracing di atas 100 FPS, kami sangat merekomendasikan Vortex ROG Strix GeForce RTX 4040 Ultra (24GB GDDR6X). GPU ini mendukung DLSS 4 Frame Generation serta ray reconstruction yang menjamin kehalusan FPS di game Cyberpunk 2077 ataupun Black Myth Wukong!';
      } else if (promptLower.includes('murah') || promptLower.includes('rakit') || promptLower.includes('racik')) {
        botResponseText = 'Untuk performa gaming esports & 1440p super-smooth dengan budget efisien, kombo AMD Ryzen 7 7800X3D (dengan 3D V-Cache raksasa) dipasangkan dengan Vortex TwinForce RTX 4070 Ti SUPER 16GB adalah pilihan mutlak! Konfigurasi ini tidak terkena bottleneck berlebih dan sangat hemat daya thermal.';
      } else if (promptLower.includes('garansi') || promptLower.includes('kirim')) {
        botResponseText = 'Semua sistem kustom PC Vortex dikirim menggunakan palet kayu kokoh, casing dilapisi busa ganda kedap guncangan, dan asuransi penuh 100%. Kami memberikan Garansi Platinum selama 3 tahun penuh ganti komponen baru jika terjadi kerusakan teknis!';
      } else {
        botResponseText = 'Pertanyaan Anda sangat menarik! Untuk mendiskusikan penawaran harga khusus atau merinci racikan sasis PC kustom Anda, silakan langsung klik tombol "Hubungi Marketing (WhatsApp)" untuk langsung berinteraksi dengan Sales Manager representatif kami yang sedang standby!';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: botResponseText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="w-[325px] sm:w-[370px] h-[520px] bg-black border border-white/10 rounded-none shadow-2xl flex flex-col justify-between overflow-hidden mb-4 backdrop-blur-md"
            id="vortex-chatbox-widget"
          >
            {/* Header */}
            <div className="p-4 bg-black border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative p-1.5 bg-[#00f2ff]/10 border border-[#00f2ff]/30 rounded-none">
                  <Bot className="w-5 h-5 text-[#00f2ff] animate-pulse" />
                  <div className="absolute top-0 right-0 h-2 w-2 bg-[#00f2ff] rounded-none animate-ping"></div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-white">Vortex Core Engine AI</h4>
                  <span className="text-[8px] text-[#00f2ff] font-mono flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    ● Premium Labs Consultant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-black border border-white/10 rounded-none text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages box list scrolling region */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-black">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-none text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#00f2ff] text-black font-black uppercase tracking-wide rounded-none'
                      : 'bg-[#0a0a0c] text-white/80 border border-white/5 rounded-none font-light'
                  }`}>
                    {msg.text}
                    <span className="block text-[8px] text-white/40 font-mono mt-1.5 text-right uppercase tracking-wider">
                      {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions buttons */}
            <div className="px-4 py-2 border-t border-white/10 bg-black flex flex-wrap gap-1.5Packed">
              {quickPrompts.map((p, i) => (
                p.isWa ? (
                  <a
                    key={i}
                    href={marketingWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 border border-[#00f2ff]/20 text-[9px] font-bold text-[#00f2ff] uppercase tracking-wider transition-all"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    Marketing (WA)
                    <ArrowUpRight className="w-2 h-2" />
                  </a>
                ) : (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(p.prompt || '')}
                    className="px-2.5 py-1.5 rounded-none bg-[#020202] hover:bg-black border border-white/5 text-[9px] font-bold text-white/50 uppercase tracking-widest transition-all cursor-pointer"
                  >
                    {p.label}
                  </button>
                )
              ))}
            </div>

            {/* Text Input Footer */}
            <div className="p-3.5 bg-black border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="TULIS PESAN HARDWARE ANDA..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
                className="flex-1 bg-[#020202] border border-white/10 rounded-none p-3 text-xs text-white focus:outline-none focus:border-[#00f2ff] transition placeholder:text-white/20 font-mono uppercase tracking-wider text-[11px]"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                className="p-3 bg-[#00f2ff] hover:bg-white text-black rounded-none transition active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.2)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button with floating notification badge */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-14 w-14 rounded-none bg-black flex items-center justify-center text-[#00f2ff] shadow-[0_0_25px_rgba(0,242,255,0.2)] border border-[#00f2ff]/50 hover:border-[#00f2ff] hover:text-white transition-colors cursor-pointer"
        id="chat-toggle-floating-button"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#00f2ff] opacity-75"></span>
            <span className="relative inline-flex rounded-none h-4 w-4 bg-black border border-[#00f2ff] text-[8px] text-[#00f2ff] font-black items-center justify-center">1</span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
