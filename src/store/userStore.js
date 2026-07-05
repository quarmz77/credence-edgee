import { create } from 'zustand'
import { MOCK_CERTIFICATE_ITEMS } from '@/utils/constants'

export const useUserStore = create((set) => ({
  certificateItems: MOCK_CERTIFICATE_ITEMS,
  certificates: [],
  setCertificateItems: (certificateItems) => set({ certificateItems }),
  setCertificates: (certs) => set({ certificates: certs }),
  markCertPaid: (certificateItemId) =>
    set((state) => ({
      certificateItems: state.certificateItems.map((item) =>
        item.id === certificateItemId ? { ...item, certPaid: true } : item
      ),
    })),
}))
