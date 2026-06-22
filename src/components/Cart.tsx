import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, ChevronRight, FileDown, ShieldCheck } from 'lucide-react';
import { CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function Cart({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }: CartProps) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  // Checkout detail inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS Instant');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  if (!isOpen) return null;

  // Formatting currency IDR
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      let itemPrice = item.product.price;
      if (item.customSelections) {
        // If it's a custom PC, calculate cumulative price of selections
        const selects = Object.values(item.customSelections);
        const cum = selects.reduce((sAcc, subProd) => sAcc + (subProd?.price || 0), 0);
        if (cum > 0) itemPrice = cum;
      }
      return acc + (itemPrice * item.quantity);
    }, 0);
  };

  const subtotal = getSubtotal();
  const tax = Math.round(subtotal * 0.11); // PPN 11%
  const shippingFee = subtotal > 15000000 ? 0 : 150000; // Free shipping above 15 mil idr
  const grandTotal = subtotal + tax + shippingFee;

  // Elegant client side PDF invoice generation using jsPDF
  const generateInvoicePDF = (custName: string, custPhone: string, custAddress: string, paymentMode: string, invNo: string) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [0, 242, 255]; // Cyber Cyan RGB
    const darkColor = [2, 2, 2]; // Black background
    const lightGray = [244, 244, 245];

    // 1. Draw top custom stylized header banner
    doc.setFillColor(2, 2, 2);
    doc.rect(0, 0, 210, 42, 'F');

    // Accent line
    doc.setFillColor(0, 242, 255);
    doc.rect(0, 42, 210, 2, 'F');

    // Logo text
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("VORTEX CUSTOM PC", 14, 20);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("PREMIUM HARDWARE LABS & CUSTOM RIGS", 14, 26);
    doc.text("Authorized Nvidia Partner - Indonesia", 14, 30);

    // Document type label (Right aligned)
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 242, 255);
    doc.text("OFFICIAL INVOICE", 140, 20);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text(`No: ${invNo}`, 140, 26);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 140, 31);

    // 2. Customer details & Store identification columns
    doc.setTextColor(40, 40, 40);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("INFORMASI PEMESANAN", 14, 55);
    doc.text("METODE PEMBAYARAN", 120, 55);

    doc.setDrawColor(220, 220, 220);
    doc.line(14, 58, 200, 58);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(80, 80, 80);
    doc.text(`Nama Pelanggan : ${custName}`, 14, 65);
    doc.text(`Telepon / WA   : ${custPhone}`, 14, 71);
    doc.text(`Alamat Kirim   : ${custAddress}`, 14, 77);

    doc.text(`Provider Bayar  : ${paymentMode}`, 120, 65);
    doc.text(`Status          : TELAH LUNAS (PAID)`, 120, 71);
    doc.text(`Kurir Logistik  : Vortex Express Premium`, 120, 77);

    // 3. Purchase items tabular listing
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text("RINCIAN BARANG", 14, 94);

    // Table Header block
    doc.setFillColor(2, 2, 2);
    doc.rect(14, 98, 182, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.text("Kategori", 16, 103.5);
    doc.text("Nama Produk / Deskripsi", 38, 103.5);
    doc.text("Qty", 130, 103.5);
    doc.text("Harga (IDR)", 144, 103.5);
    doc.text("Subtotal (IDR)", 172, 103.5);

    let currentY = 106;
    doc.setTextColor(60, 60, 60);
    doc.setFont('Helvetica', 'normal');

    cartItems.forEach((item, idx) => {
      currentY += 8;
      
      // Draw light strip background for odd rows for premium readability
      if (idx % 2 === 1) {
        doc.setFillColor(245, 245, 247);
        doc.rect(14, currentY - 6, 182, 8, 'F');
      }

      const isCustom = !!item.customSelections;
      const desc = isCustom 
        ? "PC Kustom: " + (item.customSelections?.cpu?.brand + " + " + item.customSelections?.gpu?.brand)
        : item.product.name;

      let itemPrice = item.product.price;
      if (item.customSelections) {
        const selects = Object.values(item.customSelections);
        const cum = selects.reduce((sAcc, subProd) => sAcc + (subProd?.price || 0), 0);
        if (cum > 0) itemPrice = cum;
      }

      // Write row cells
      doc.text(item.product.category, 16, currentY - 1);
      doc.text(desc.length > 50 ? desc.substring(0, 47) + "..." : desc, 38, currentY - 1);
      doc.text(item.quantity.toString(), 131, currentY - 1);
      doc.text(formatIDR(itemPrice), 143, currentY - 1);
      doc.text(formatIDR(itemPrice * item.quantity), 171, currentY - 1);
    });

    // 4. Summaries block layout
    currentY += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, currentY, 200, currentY);

    currentY += 8;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(110, 110, 110);
    doc.text("Sub-total Koleksi Komponen:", 116, currentY);
    doc.setTextColor(50, 50, 50);
    doc.text(formatIDR(subtotal), 166, currentY);

    currentY += 6;
    doc.setTextColor(110, 110, 110);
    doc.text("Pajak Pertambahan Nilai (PPN 11%):", 116, currentY);
    doc.setTextColor(50, 50, 50);
    doc.text(formatIDR(tax), 166, currentY);

    currentY += 6;
    doc.setTextColor(110, 110, 110);
    doc.text("Biaya Pengiriman & Asuransi:", 116, currentY);
    doc.setTextColor(50, 50, 50);
    doc.text(shippingFee === 0 ? "GRATIS" : formatIDR(shippingFee), 166, currentY);

    // Total highlight rectangle
    currentY += 5;
    doc.setFillColor(244, 244, 245);
    doc.rect(114, currentY, 82, 11, 'F');
    doc.setDrawColor(0, 242, 255);
    doc.setLineWidth(0.5);
    doc.rect(114, currentY, 82, 11, 'D');

    currentY += 7;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(2, 2, 2);
    doc.text("TOTAL BAYAR:", 116, currentY);
    doc.setTextColor(0, 242, 255);
    doc.text(formatIDR(grandTotal), 154, currentY);

    // 5. Footer & Authenticity Stamp
    doc.setDrawColor(230, 230, 230);
    doc.line(14, 255, 200, 255);

    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 140, 140);
    doc.text("Terima kasih atas kepercayaan Anda mempercayakan perakitan PC di labs kami.", 14, 262);
    doc.text("Setiap komponen kami tes stres, dikemas busa ganda kedap goncangan, dan siap tempur.", 14, 266);
    
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 242, 255);
    doc.text("VORTEX PC OFFICIAL STAMP & COMPLIANT", 14, 274);

    // Save
    doc.save(`Invoice_VortexPC_${invNo}.pdf`);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setIsProcessing(true);
    // Generate simulated billing number
    const uniqueId = 'VTX-' + Math.floor(100000 + Math.random() * 900000);
    setInvoiceNumber(uniqueId);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      generateInvoicePDF(name, phone, address, paymentMethod, uniqueId);
    }, 2000);
  };

  const handleSuccessFinished = () => {
    onClearCart();
    setShowCheckoutForm(false);
    setIsSuccess(false);
    setName('');
    setPhone('');
    setAddress('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Dark blurred shade backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Sliding Panel sheet */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg h-full bg-[#020202]/98 border-l border-white/10 shadow-2xl flex flex-col justify-between text-white z-10 p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-black italic uppercase flex items-center gap-2 tracking-widest">
              <ShoppingBag className="w-5 h-5 text-[#00f2ff]" />
              KERANJANG <span className="text-[#00f2ff]">VORTEX</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sandbox content body state handling */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="w-12 h-12 text-white/10 mb-4" />
              <p className="font-bold text-xs uppercase tracking-widest text-white/50">Keranjang Anda Kosong</p>
              <p className="text-[11px] text-white/30 mt-2 max-w-xs leading-relaxed font-light">
                Silahkan telusuri spesifikasi komponen terbaik kami atau rakit PC impian Anda di Custom Rig Builder.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 border border-white/10 hover:border-[#00f2ff] bg-black text-[10px] font-bold uppercase tracking-widest transition-all text-white/80 hover:text-white"
              >
                Mulai Belanja Komponen
              </button>
            </div>
          ) : !showCheckoutForm ? (
            
            // Standard Itemized cart list view
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4 pr-1">
                <div className="flex justify-between text-[10px] text-white/40 font-mono tracking-widest uppercase border-b border-white/5 pb-2">
                  <span>Daftar Komponen ({cartItems.length})</span>
                  <span onClick={onClearCart} className="text-[#00f2ff] hover:underline cursor-pointer">Bersihkan Semua</span>
                </div>

                {cartItems.map((item, index) => {
                  const isCustom = !!item.customSelections;
                  let finalItemPrice = item.product.price;
                  
                  if (item.customSelections) {
                    const selects = Object.values(item.customSelections);
                    finalItemPrice = selects.reduce((sAcc, subProd) => sAcc + (subProd?.price || 0), 0);
                  }

                  return (
                    <div 
                      key={index} 
                      className="p-4 rounded-none bg-black border border-white/5 flex items-center gap-4 hover:border-white/20 transition"
                    >
                      <div className="w-14 h-14 bg-zinc-950 border border-white/10 rounded-none p-1 shrink-0 flex items-center justify-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="max-h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-xs font-bold truncate uppercase tracking-wide leading-none">
                          {isCustom 
                            ? `Custom PC [${item.customSelections?.cpu?.brand} + ${item.customSelections?.gpu?.brand}]` 
                            : item.product.name
                          }
                        </h4>
                        <span className="text-[9px] text-white/30 font-mono mt-1.5 block uppercase tracking-wider">
                          Kateg: {item.product.category} &bull; Qty: {item.quantity}
                        </span>
                        
                        {isCustom && (
                          <div className="mt-1.5 text-[8px] text-[#00f2ff]/80 font-mono truncate flex gap-1 uppercase">
                            <span>{item.customSelections?.gpu?.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#00f2ff] block font-mono">{formatIDR(finalItemPrice * item.quantity)}</span>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="p-1 text-white/30 hover:text-rose-500 transition mt-2 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal Checkout board summary */}
              <div className="border-t border-white/10 pt-5 space-y-3 bg-black">
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Subtotal Belanja</span>
                  <span className="font-mono text-white/80">{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Pajak (PPN 11%)</span>
                  <span className="font-mono text-white/80">{formatIDR(tax)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-white/60 border-b border-white/5 pb-3">
                  <span>Vortex Premium Shipping & Box</span>
                  <span className="font-mono text-[#00f2ff]">
                    {shippingFee === 0 ? 'GRATIS (Promo)' : formatIDR(shippingFee)}
                  </span>
                </div>
                
                <div className="flex justify-between items-end py-1">
                  <div>
                    <span className="text-[9px] text-white/30 font-mono uppercase tracking-widest block">Total Pembayaran</span>
                    <span className="text-2xl font-black text-[#00f2ff] tracking-tight">{formatIDR(grandTotal)}</span>
                  </div>
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="px-6 py-4 bg-[#00f2ff] text-black hover:bg-white font-black text-[10px] uppercase tracking-widest rounded-none transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,242,255,0.15)]"
                  >
                    Checkout Rigs <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : isSuccess ? (
            
            // Checkout success / receipt download state view
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-none bg-[#00f2ff]/10 border border-[#00f2ff]/30 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#00f2ff]" />
              </div>
              <h4 className="text-lg font-black italic uppercase text-white tracking-widest">Checkout Berhasil!</h4>
              <p className="text-xs text-white/50 mt-2.5 max-w-xs leading-relaxed font-light">
                Terima kasih, <strong>{name}</strong>! Pesanan Anda dengan ID <strong>{invoiceNumber}</strong> telah kami terima. Invoice resmi berformat PDF telah dihasilkan otomatis.
              </p>

              {/* PDF Action container button */}
              <button
                onClick={() => generateInvoicePDF(name, phone, address, paymentMethod, invoiceNumber)}
                className="mt-8 flex items-center gap-2.5 px-6 py-3.5 bg-black hover:bg-zinc-900 border border-[#00f2ff]/30 font-black text-[10px] tracking-widest text-[#00f2ff] rounded-none uppercase transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#00f2ff]" />
                Unduh PDF Invoice
              </button>

              <button
                onClick={handleSuccessFinished}
                className="mt-4 px-6 py-3 text-white/50 hover:text-white border border-white/5 hover:border-white/20 bg-[#020202] rounded-none text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                Selesai & Bersihkan Keranjang
              </button>
            </div>
          ) : (
            
            // Checkout Delivery input Form
            <div className="flex-1 flex flex-col justify-between">
              <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4 pr-1">
                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                  <span className="text-[10px] text-[#00f2ff] uppercase tracking-widest font-black font-mono">// Billing & Shipping Details</span>
                  <span onClick={() => setShowCheckoutForm(false)} className="text-[9px] text-[#00f2ff] hover:underline cursor-pointer uppercase font-bold font-mono">Kembali</span>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] text-white/40 font-mono uppercase mb-1.5 tracking-wider">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MASUKKAN NAMA ANDA..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-none p-3 text-xs text-white focus:outline-none focus:border-[#00f2ff] transition text-[11px] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-white/40 font-mono uppercase mb-1.5 tracking-wider">Nomor WhatsApp / Telp</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="CONTOH: 081234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-none p-3 text-xs text-white focus:outline-none focus:border-[#00f2ff] transition text-[11px] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-white/40 font-mono uppercase mb-1.5 tracking-wider">Alamat Lengkap Pengiriman</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="ALAMAT JALAN, NO. RUMAH, KECAMATAN, KOTA, KODE POS..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-none p-3 text-xs text-white focus:outline-none focus:border-[#00f2ff] transition resize-none text-[11px] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-white/40 font-mono uppercase mb-1.5 tracking-wider">Metode Pembayaran</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {['QRIS Instant', 'Transfer BCA', 'Mandiri Virtual', 'Credit Card'].map((method) => {
                        const isSelect = paymentMethod === method;
                        return (
                          <div
                            key={method}
                            onClick={() => setPaymentMethod(method)}
                            className={`p-3 rounded-none border text-[10px] font-bold tracking-widest text-center cursor-pointer uppercase transition ${
                              isSelect 
                                ? 'border-[#00f2ff] bg-[#00f2ff]/10 text-[#00f2ff]' 
                                : 'border-white/5 bg-black hover:border-white/20 text-white/55'
                            }`}
                          >
                            {method}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Logistics disclaimer */}
                <div className="p-3 bg-black border border-white/5 rounded-none flex items-center gap-3 mt-4">
                  <ShieldCheck className="w-5 h-5 text-[#00f2ff] shrink-0" />
                  <p className="text-[10px] text-white/40 leading-relaxed font-light">
                    Pengiriman dilapisi bubble-pack kayu tebal, asuransi penuh 100% dari Vortex Partner Logistic.
                  </p>
                </div>
              </form>

              {/* Complete action block */}
              <div className="border-t border-white/10 pt-4 bg-black">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-white/50">Total Transaksi</span>
                  <span className="text-xl font-bold text-[#00f2ff] font-mono">{formatIDR(grandTotal)}</span>
                </div>

                <button
                  onClick={handleCheckoutSubmit}
                  disabled={isProcessing || !name || !phone || !address}
                  className="w-full py-4 bg-[#00f2ff] text-black hover:bg-white disabled:bg-neutral-800 disabled:text-white/35 font-black text-[10px] uppercase tracking-widest rounded-none transition-all duration-300 disabled:opacity-45 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      MENYIAPKAN INVOICE RESMI...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      BAYAR SEKARANG & UNDUH PDF
                    </>
                  )}
                </button>
              </div>
            </div>

          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
