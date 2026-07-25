import { create } from 'zustand'

export const useUserStore = create((set) => ({
  // Real certificate items derived from submissions with ratings
  certificateItems: [],
  certificates: [],
  certificatesLoading: false,

  setCertificateItems: (certificateItems) => set({ certificateItems }),
  setCertificates: (certs) => set({ certificates: certs }),
  setCertificatesLoading: (certificatesLoading) => set({ certificatesLoading }),

  markCertPaid: (certificateItemId) =>
    set((state) => ({
      certificateItems: state.certificateItems.map((item) =>
        item.id === certificateItemId ? { ...item, certPaid: true } : item
      ),
    })),
}))
