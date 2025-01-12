
import { create } from 'zustand';
export const QrStore = create<any>((set) => ({
        qrData: null,
        setQrData: (qrData: any) => set({ Qr: qrData }),
}))