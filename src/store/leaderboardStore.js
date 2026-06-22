import { create } from 'zustand'
import { MOCK_LEADERBOARD } from '@/utils/constants'

export const useLeaderboardStore = create((set) => ({
  leaderboard: MOCK_LEADERBOARD,
  userRank: { rank: 3, score: 19, badges: 7 },
  loading: false,
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  setLoading:     (loading)     => set({ loading }),
}))
