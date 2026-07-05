import { SKILL_COLORS, RATINGS } from "@/utils/constants";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

const RATING_ICONS = {
  green: <CheckCircle2 size={14} />,
  yellow: <AlertTriangle size={14} />,
  red: <AlertCircle size={14} />,
};

export const SkillTag = ({ skill }) => {
  const colors = SKILL_COLORS[skill] || { text: "#0d1f35", bg: "#e1ecf8" };
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        fontSize: 11.5,
        fontWeight: 700,
        padding: "3px 11px",
        borderRadius: 20,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {skill}
    </span>
  );
};

const RatingBadge = ({ rating }) => {
  if (!rating) return null;
  const info = RATINGS[rating?.toUpperCase()];
  if (!info) return null;
  return (
    <span
      className={`pill pill-${rating}`}
      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
    >
      {RATING_ICONS[info.key] || <AlertCircle size={14} />} {info.label}
    </span>
  );
};

export default RatingBadge;
