
import { create } from 'zustand';
export const QrStore = create<any>((set) => ({
        qrData: null,
        setQrData: (data: any) => set({ Qr: data }),
}))