import { useEffect, useState } from "react";
import { Timer, AlertOctagon } from "lucide-react";

/**
 * Calculates deadline date based on explicit deadline date or duration string
 */
export const calculateTargetDate = (deadline, createdAt, duration) => {
  if (deadline) {
    return new Date(deadline);
  }

  if (!createdAt) return null;
  const start = new Date(createdAt);

  if (typeof duration === "string") {
    const durLower = duration.toLowerCase();
    const match = durLower.match(/(\d+)\s*(day|week|month|hour)/);
    if (match) {
      const num = parseInt(match[1], 10);
      const unit = match[2];
      if (unit.startsWith("hour")) start.setHours(start.getHours() + num);
      else if (unit.startsWith("day")) start.setDate(start.getDate() + num);
      else if (unit.startsWith("week")) start.setDate(start.getDate() + num * 7);
      else if (unit.startsWith("month")) start.setMonth(start.getMonth() + num);
      return start;
    }
  }

  // Default fallback: 14 days from start if duration unspecified
  start.setDate(start.getDate() + 14);
  return start;
};

const CountdownTimer = ({ deadline, createdAt, duration, onExpire }) => {
  const targetDate = calculateTargetDate(deadline, createdAt, duration);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetDate) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ expired: true });
        if (onExpire) onExpire();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        expired: false,
        totalHours: Math.floor(distance / (1000 * 60 * 60)),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [deadline, createdAt, duration]);

  if (!targetDate || !timeLeft) {
    return null;
  }

  if (timeLeft.expired) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          borderRadius: 20,
          background: "#fee2e2",
          color: "#991b1b",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        <AlertOctagon size={13} />
        Deadline Passed
      </div>
    );
  }

  const pad = (n) => String(n).padStart(2, "0");
  const isUrgent = timeLeft.totalHours < 24;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        borderRadius: 20,
        background: isUrgent ? "#fff7ed" : "#f0f9ff",
        border: `1px solid ${isUrgent ? "#ffedd5" : "#bae6fd"}`,
        color: isUrgent ? "#c2410c" : "#0369a1",
        fontSize: 12,
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <Timer size={13} className={isUrgent ? "animate-pulse" : ""} />
      <span>
        {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
        {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s remaining
      </span>
    </div>
  );
};

export default CountdownTimer;
