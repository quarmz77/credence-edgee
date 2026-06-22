import { useLeaderboardStore } from '@/store/leaderboardStore'

const useLeaderboard = () => {
  const { leaderboard, userRank, loading } = useLeaderboardStore()
  return { leaderboard, userRank, loading }
}

export default useLeaderboard
