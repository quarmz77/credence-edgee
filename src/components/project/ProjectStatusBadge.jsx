import { Circle } from "lucide-react";

const ProjectStatusBadge = ({ status }) => {
  const isOpen = status === "Open";
  return (
    <span
      className={isOpen ? "pill pill-green" : "pill pill-red"}
      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
    >
      <Circle size={10} style={{ color: isOpen ? "#16a34a" : "#dc2626" }} />{" "}
      {status}
    </span>
  );
};

export default ProjectStatusBadge;
