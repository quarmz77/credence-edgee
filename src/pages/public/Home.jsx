import { useNavigate } from "react-router-dom";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import useProjects from "@/hooks/useProjects";
import {
  User,
  Key,
  Bookmark,
  UploadCloud,
  Star,
  FileText,
  Rocket,
  Lock,
  ShieldCheck,
  Cpu,
  Building2,
  MapPin,
  Clock,
} from "lucide-react";

const GRAD_HERO = "linear-gradient(135deg,#0a1628 0%,#0a3d2a 50%,#0d2040 100%)";
const GRAD_BTN = "linear-gradient(135deg,#1565c0 0%,#10a070 100%)";

const HOW_IT_WORKS = [
  [
    "01",
    <User size={24} />,
    "Sign Up & Build Profile",
    "Create your Credify profile with your university, skills and interests.",
  ],
  [
    "02",
    <Key size={24} />,
    "Unlock Full Access",
    "Join Credify free to unlock all projects on the platform.",
  ],
  [
    "03",
    <Bookmark size={24} />,
    "Pick a Project",
    "Browse real micro-projects from verified companies. Your selection stays completely private on Credify.",
  ],
  [
    "04",
    <UploadCloud size={24} />,
    "Submit Your Work",
    "Upload your file or share a link. Only you and the reviewer can see your submission.",
  ],
  [
    "05",
    <Star size={24} />,
    "Get Rated",
    "Receive a green, yellow, or red performance rating with written feedback from a Credify reviewer.",
  ],
  [
    "06",
    <FileText size={24} />,
    "Get Your Certificate",
    "Pay GHS 20 for a verified Credify certificate with a unique shareable ID.",
  ],
  [
    "07",
    <Rocket size={24} />,
    "Get Discovered",
    "Verified Credify credentials signal real, proven skills to employers and companies.",
  ],
];

const FEATURES = [
  [
    <Lock size={30} />,
    "Private by Design",
    "No one sees who picked a project, other submissions, or reviews on Credify. Your work stays between you and the reviewer.",
  ],
  [
    <FileText size={30} />,
    "Paid Certificates",
    "Pay GHS 20 for a verified Credify certificate with a unique ID — proof you can share with employers.",
  ],
  [
    <Cpu size={30} />,
    "AI-Powered Projects",
    "Companies upload briefs and our AI auto-extracts details. Credify projects are always up to date.",
  ],
  [
    <Building2 size={30} />,
    "Real Company Projects",
    "All Credify projects are posted by verified companies and approved by admin before going live.",
  ],
  [
    <Star size={30} />,
    "Reviewer Feedback",
    "Students receive private ratings and written feedback on submitted project work.",
  ],
];

const Blob = ({ left, top, size, color }) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      pointerEvents: "none",
    }}
  />
);

const Home = () => {
  const nav = useNavigate();
  const { projects } = useProjects();
  const featuredProjects = projects
    .filter((project) => project.status === "Open")
    .slice(0, 4);

  return (
    <div>
      <section
        style={{
          background: GRAD_HERO,
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Blob left="-8%" top="-18%" size={580} color="rgba(21,101,192,0.12)" />
        <Blob left="55%" top="20%" size={420} color="rgba(13,122,82,0.10)" />
        <Blob left="78%" top="60%" size={280} color="rgba(66,165,245,0.08)" />

        <div
          style={{
            maxWidth: 780,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
          className="animate-fade-up"
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 20,
              padding: "6px 18px",
              marginBottom: 30,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4dd9a8",
                display: "inline-block",
              }}
            />
            <span style={{ color: "#a7f3d8", fontSize: 13, fontWeight: 600 }}>
              Credify is live in Ghana · Build. Prove. Get Hired.
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#fff",
              marginBottom: 24,
              letterSpacing: "-1.5px",
            }}
          >
            Turn Real Projects Into{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#4dd9a8,#90caf9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Verified Credentials
            </span>
          </h1>

          <p
            style={{
              color: "rgba(163,230,208,0.85)",
              fontSize: 18,
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 auto 44px",
            }}
          >
            Credify connects African students to real micro-projects from
            companies. Complete work, get rated, and pay for verified
            certificates — all in one private, skills-first platform.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: GRAD_BTN,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 38px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(21,101,192,0.35)",
              }}
              onClick={() => nav("/register")}
            >
              Join Credify Free →
            </button>
            <button
              style={{
                background: "transparent",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.28)",
                borderRadius: 12,
                padding: "14px 32px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => nav("/projects")}
            >
              Browse Projects
            </button>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          borderBottom: "1px solid #e1ecf8",
          padding: "28px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {[
            ["500+", "Projects on Credify"],
            ["2,000+", "Students Enrolled"],
            ["120+", "Verified Companies"],
            ["GHS 20", "Certificate Price"],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Clash Display',sans-serif",
                  fontSize: 30,
                  fontWeight: 800,
                  background: "linear-gradient(135deg,#0f3460,#0d7a52)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#4a6080",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "88px 40px", background: "#f0f7ff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              How Credify Works
            </h2>
            <p
              style={{
                color: "#4a6080",
                fontSize: 16,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              From sign-up to verified credential in 7 simple steps
            </p>
          </div>
          <div className="grid-3" style={{ gap: 18 }}>
            {HOW_IT_WORKS.map(([num, icon, title, desc], i) => (
              <div
                key={num}
                className={`card card-hover animate-fade-up stagger-${Math.min(i + 1, 3)}`}
                style={{ padding: "26px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Clash Display',sans-serif",
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#1565c0",
                      background:
                        "linear-gradient(135deg,rgba(15,52,96,0.08),rgba(13,122,82,0.08))",
                      padding: "3px 9px",
                      borderRadius: 6,
                    }}
                  >
                    {num}
                  </span>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "#0d1f35",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{ fontSize: 13.5, color: "#4a6080", lineHeight: 1.65 }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "88px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            className="section-title"
            style={{ textAlign: "center", marginBottom: 52 }}
          >
            Everything Credify Offers
          </h2>
          <div className="grid-2" style={{ gap: 22 }}>
            {FEATURES.map(([icon, title, desc]) => (
              <div
                key={title}
                className="card"
                style={{ padding: "28px", display: "flex", gap: 20 }}
              >
                <div style={{ fontSize: 30, flexShrink: 0 }}>{icon}</div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Clash Display',sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 8,
                      color: "#0d1f35",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{ fontSize: 14, color: "#4a6080", lineHeight: 1.65 }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "88px 40px", background: "#f0f7ff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h2 className="section-title" style={{ marginBottom: 6 }}>
                Live Projects on Credify
              </h2>
              <p style={{ color: "#4a6080", fontSize: 15 }}>
                Real work from verified companies
              </p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => nav("/projects")}
            >
              View All →
            </button>
          </div>
          <div className="grid-2" style={{ gap: 20 }}>
            {featuredProjects.map((p) => (
              <div
                key={p.id}
                className="card card-hover"
                style={{ padding: "24px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <SkillTag skill={p.skill} />
                  <ProjectStatusBadge status={p.status} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#4a6080",
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}
                >
                  {p.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    marginBottom: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12.5,
                      color: "#7a9ec0",
                    }}
                  >
                    <Building2 size={12} /> {p.company}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12.5,
                      color: "#7a9ec0",
                    }}
                  >
                    <Clock size={12} /> {p.duration}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12.5,
                      color: "#7a9ec0",
                    }}
                  >
                    <MapPin size={12} /> {p.type}
                  </span>
                </div>
                <button
                  className="btn btn-primary btn-sm btn-block"
                  onClick={() => nav("/register")}
                >
                  Start on Credify →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: GRAD_HERO,
          padding: "88px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Blob left="10%" top="10%" size={300} color="rgba(21,101,192,0.1)" />
        <Blob left="70%" top="50%" size={250} color="rgba(13,122,82,0.1)" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: 44,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
              letterSpacing: "-0.8px",
            }}
          >
            Start Your Credify Journey
          </h2>
          <p
            style={{
              color: "rgba(163,230,208,0.8)",
              fontSize: 16,
              marginBottom: 40,
              maxWidth: 480,
              margin: "0 auto 40px",
            }}
          >
            Join thousands of students on Credify who are proving their
            skills through real work.
          </p>
          <button
            style={{
              background: GRAD_BTN,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "16px 52px",
              fontSize: 17,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(21,101,192,0.4)",
            }}
            onClick={() => nav("/register")}
          >
            Join Credify Free →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
