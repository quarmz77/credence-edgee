import { create } from 'zustand'
import { MOCK_BADGES } from '@/utils/constants'

export const useUserStore = create((set) => ({
  badges: MOCK_BADGES,
  certificates: [],
  setBadges:       (badges) => set({ badges }),
  addBadge:        (badge)  => set((s) => ({ badges: [...s.badges, badge] })),
  setCertificates: (certs)  => set({ certificates: certs }),
  markCertPaid:    (badgeId) =>
    set((s) => ({
      badges: s.badges.map((b) => b.id === badgeId ? { ...b, certPaid: true } : b),
    })),
}))
