import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface Booking {
  name: string;
  age: string;
  service: string;
  date: string;
  time: string;
}

// Menghasilkan daftar jam 10:00 - 20:00 dengan interval 30 menit
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let h = 10; h <= 19; h++) {
    slots.push(`${h}:00`);
    slots.push(`${h}:30`);
  }
  slots.push('20:00');
  return slots;
};

// Mengambil slot jam yang sudah di-booking pada tanggal tertentu
export const getBookedSlots = async (date: string): Promise<string[]> => {
  if (!date) return [];
  
  try {
    const bookingsRef = collection(db, 'bookings');
    // Mencari booking yang cocok dengan tanggal yang dipilih
    const q = query(bookingsRef, where('date', '==', date));
    const querySnapshot = await getDocs(q);
    
    // Menyimpan jam-jam yang sudah di-booking
    const bookedTime: string[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.time) {
        bookedTime.push(data.time);
      }
    });
    
    return bookedTime;
  } catch (error) {
    console.error("Gagal mengambil data booking:", error);
    return [];
  }
};

// Menyimpan data booking ke Firestore
export const handleBooking = async (bookingData: Booking): Promise<boolean> => {
  try {
    const bookingsRef = collection(db, 'bookings');
    
    // Validasi double booking sebelum menyimpan
    const q = query(
      bookingsRef, 
      where('date', '==', bookingData.date),
      where('time', '==', bookingData.time)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Jam sudah dibooking orang lain (double booking)
      throw new Error("Maaf, slot jam ini baru saja dibooking oleh orang lain. Silakan pilih jam lain.");
    }

    // Menyimpan data booking baru
    await addDoc(bookingsRef, {
      ...bookingData,
      status: "confirmed",
      createdAt: serverTimestamp()
    });
    
    return true;
  } catch (error: any) {
    alert(error.message || "Gagal melakukan booking. Silakan coba lagi.");
    return false;
  }
};
