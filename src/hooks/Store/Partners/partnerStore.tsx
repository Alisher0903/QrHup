import { create } from 'zustand';
export const PartnersStore = create<any>((set) => ({
        partners: null,
        setPartners: (partners: any) => set({ partners: partners }),
}))