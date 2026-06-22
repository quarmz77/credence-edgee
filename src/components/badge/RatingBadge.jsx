import { SKILL_COLORS, RATINGS } from '@/utils/constants'

export const SkillTag = ({ skill }) => {
  const colors = SKILL_COLORS[skill] || { text: '#0d1f35', bg: '#e1ecf8' }
  return (
    <span style={{ background: colors.bg, color: colors.text, fontSize: 11.5, fontWeight: 700, padding: '3px 11px', borderRadius: 20, display: 'inline-flex', alignItems: 'center' }}>
      {skill}
    </span>
  )
}

const RatingBadge = ({ rating }) => {
  if (!rating) return null
  const info = RATINGS[rating?.toUpperCase()]
  if (!info) return null
  return <span className={`pill pill-${rating}`}>{info.emoji} {info.label}</span>
}

export default RatingBadge
