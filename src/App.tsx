import React, { useState, useMemo, useEffect } from 'react';
import { Scissors, Calendar, Clock, User, ClipboardList, CheckCircle, ChevronDown, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { generateTimeSlots, getBookedSlots, handleBooking } from './services/bookingService';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('Cukur Rambut');
  
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);

  // Ambil daftar jam yang tersedia (10:00 - 20:00)
  const baseTimeSlots = useMemo(() => generateTimeSlots(), []);

  // Effect untuk mengecek slot yang sudah dibooking ketika tanggal berubah
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!date) {
        setBookedSlots([]);
        return;
      }
      
      setIsFetchingSlots(true);
      // Reset jam jika memilih tanggal baru
      setTime('');
      
      // Ambil data dari Firestore
      const booked = await getBookedSlots(date);
      setBookedSlots(booked);
      setIsFetchingSlots(false);
    };

    fetchBookedSlots();
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi
    if (!name || !age || !date || !time || !type) {
      alert("⚠️ Mohon lengkapi semua data form dan pilih jadwal sebelum booking!");
      return;
    }

    setIsLoading(true);

    // Proses booking ke Firestore
    const isSuccess = await handleBooking({
      name,
      age,
      service: type,
      date,
      time
    });

    if (isSuccess) {
      alert(`✅ Booking berhasil!\n\nNama: ${name}\nUmur: ${age}\nLayanan: ${type}\nTanggal: ${date}\nJam: ${time}`);
      
      // Reset form
      setName('');
      setAge('');
      setDate('');
      setTime('');
      setType('Cukur Rambut');
      setBookedSlots([]);
    }

    setIsLoading(false);
  };

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 p-4 bg-zinc-900/50 rounded-full border border-zinc-800 shadow-[0_0_50px_rgba(220,38,38,0.1)]"
        >
          <Scissors className="text-red-500 w-12 h-12 md:w-16 md:h-16" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
        >
          Potongan Rapi <br className="hidden md:block"/>
          <span className="text-red-500">Tanpa Antri</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg"
        >
          Booking sekarang, datang tinggal duduk. Pengalaman cukur premium untuk gaya terbaikmu.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={scrollToBooking}
          className="group relative inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)]"
        >
          <span className="relative z-10">Booking Sekarang</span>
          <ChevronDown className="relative z-10 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.button>
      </section>

      {/* 2. INFO SECTION */}
      <section className="py-24 px-4 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 text-red-500 shadow-inner">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Tanpa Antri</h3>
            <p className="text-zinc-400">Jadwal pasti, datang di jam yang kamu pilih. Tidak perlu buang waktu menunggu.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 text-red-500 shadow-inner">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Barber Profesional</h3>
            <p className="text-zinc-400">Ditangani oleh kapster berpengalaman yang paham tren dan gaya rambut terkini.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 text-red-500 shadow-inner">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Cepat & Rapi</h3>
            <p className="text-zinc-400">Peralatan steril, hasil potongan presisi. Kualitas premium dalam waktu efisien.</p>
          </motion.div>

        </div>
      </section>

      {/* 3. BOOKING SECTION */}
      <section id="booking-section" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Buat Jadwal</h2>
            <p className="text-zinc-400">Pilih waktu dan layanan yang kamu inginkan.</p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit} 
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Background design elements in form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

            <div className="space-y-10 relative z-10">
              
              {/* Jadwal Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-3 text-white border-b border-zinc-800/50 pb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500 text-sm">1</span>
                  Tentukan Waktu
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tanggal */}
                  <div className="space-y-3">
                    <label htmlFor="date" className="block text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Calendar size={16} /> Tanggal Booking
                    </label>
                    <input 
                      type="date" 
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Jam */}
                <div className="space-y-3 pt-2">
                  <label className="block text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Clock size={16} /> Pilih Jam
                  </label>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {isFetchingSlots ? (
                      <div className="col-span-full py-4 text-center text-zinc-500 text-sm">
                        Memuat ketersediaan jam...
                      </div>
                    ) : ( 
                      baseTimeSlots.map((timeSlot) => {
                        const isSelected = time === timeSlot;
                        const isFull = bookedSlots.includes(timeSlot);
                        
                        return (
                          <button
                            key={timeSlot}
                            type="button"
                            disabled={isFull || !date}
                            onClick={() => setTime(timeSlot)}
                            className={`
                              py-3 rounded-xl text-sm font-medium transition-all duration-300 border
                              ${!date
                                ? 'bg-zinc-950/20 border-zinc-900 text-zinc-700 cursor-not-allowed'
                                : isFull 
                                ? 'bg-zinc-950/50 border-zinc-800/30 text-zinc-600 cursor-not-allowed' 
                                : isSelected
                                  ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] scale-105'
                                  : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600'
                              }
                            `}
                          >
                            {timeSlot}
                          </button>
                        );
                      })
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mt-4 px-1">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-zinc-950 border border-zinc-800"></div> Tersedia</div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-red-600"></div> Dipilih</div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-zinc-950 border border-zinc-800/30 opacity-50"></div> Full</div>
                  </div>
                </div>
              </div>

              {/* Data Diri Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-3 text-white border-b border-zinc-800/50 pb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500 text-sm">2</span>
                  Data Diri & Layanan
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-400">Nama Lengkap</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="Masukkan nama"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="age" className="block text-sm font-medium text-zinc-400">Umur</label>
                    <input 
                      type="number" 
                      id="age"
                      min="0"
                      placeholder="contoh: 25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <label htmlFor="type" className="block text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <ClipboardList size={16} /> Jenis Layanan
                    </label>
                    <div className="relative">
                      <select 
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none pr-10"
                      >
                        <option value="Cukur Rambut">Cukur Rambut</option>
                        <option value="Cukur Jenggot">Cukur Jenggot</option>
                        <option value="Paket Lengkap">Paket Lengkap (Rambut + Jenggot + Pijat)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-5 px-6 rounded-xl transition-all duration-300 transform 
                    ${isLoading 
                      ? 'bg-red-800 text-white/70 cursor-wait' 
                      : 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(220,38,38,0.25)]'
                    }`}
                >
                  {isLoading ? (
                    'Memproses Booking...'
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Selesaikan Booking
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-zinc-900 text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Barbershop. All rights reserved.</p>
      </footer>
    </div>
  );
}

