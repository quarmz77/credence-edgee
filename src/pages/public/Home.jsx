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
  Award,
  ArrowRight,
} from "lucide-react";

const FLAT_HERO_BG = "#022c22";
const FLAT_ACCENT = "#059669";

const HOW_IT_WORKS = [
  [
    "01",
    <User size={24} />,
    "Sign Up & Build Profile",
    "Create your Credify profile with your university, skills, and interests.",
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
    "Browse real micro-projects from verified companies. Your selection stays completely private.",
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
    "Receive a performance rating with written feedback from a reviewer.",
  ],
  [
    "06",
    <FileText size={24} />,
    "Get Your Certificate",
    "Request a verified Credify certificate with a unique shareable ID.",
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
    "Verified Certificates",
    "Obtain a verified Credify certificate with a unique ID — proof you can share directly with employers.",
  ],
  [
    <Cpu size={30} />,
    "Structured Project Briefs",
    "Companies post structured briefs and requirements. Credify projects reflect real workplace requirements.",
  ],
  [
    <Building2 size={30} />,
    "Real Company Projects",
    "All Credify projects are posted by verified companies and reviewed before going live.",
  ],
  [
    <Star size={30} />,
    "Reviewer Feedback",
    "Students receive constructive ratings and written feedback on submitted project work.",
  ],
];

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
          background: FLAT_HERO_BG,
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "70px 40px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 780,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#064e3b",
              border: "1px solid #047857",
              borderLeft: "3px solid #34d399",
              borderRadius: 6,
              padding: "7px 16px",
              marginBottom: 30,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "#059669",
                color: "#fff",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.6px",
                padding: "2px 7px",
                borderRadius: 4,
                textTransform: "uppercase",
              }}
            >
              <ShieldCheck size={13} /> Verified
            </span>
            <span style={{ color: "#a7f3d0", fontSize: 13, fontWeight: 600 }}>
              Official Student Skill Attestation & Project Platform
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 20,
              letterSpacing: "-1px",
            }}
          >
            Turn Real Projects Into{" "}
            <span
              style={{
                color: "#34d399",
              }}
            >
              Verified Credentials
            </span>
          </h1>

          <p
            style={{
              color: "#a7f3d0",
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 40px",
              opacity: 0.9,
            }}
          >
            Credify connects students with practical micro-projects from verified companies. Complete work, receive structured reviews, and earn shareable certificates.
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
                background: FLAT_ACCENT,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "13px 32px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => nav("/register")}
            >
              Join Credify Free
            </button>
            <button
              style={{
                background: "transparent",
                color: "#fff",
                border: "1.5px solid #047857",
                borderRadius: 8,
                padding: "13px 28px",
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
          borderBottom: "1px solid #e2e8f0",
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
            ["500+", "Projects Available"],
            ["2,000+", "Enrolled Students"],
            ["120+", "Verified Companies"],
            ["GHS 20", "Certificate Price"],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#059669",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#475569",
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

      <section style={{ padding: "64px 40px", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, color: "#059669", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 10px", borderRadius: 20 }}>
                <ShieldCheck size={13} /> Live on Credify
              </div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>
                Real Projects. Right Now.
              </h2>
              <p style={{ fontSize: 15, color: "#475569", maxWidth: 500 }}>
                These are actual open briefs from verified companies — not made-up examples.
              </p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => nav("/projects")}
              style={{ flexShrink: 0 }}
            >
              Browse All Projects
            </button>
          </div>

          {/* Live project grid */}
          {projects.filter(p => p.status === "Open").slice(0, 3).length > 0 ? (
            <div className="grid-3" style={{ gap: 20 }}>
              {projects.filter(p => p.status === "Open").slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderTop: "3px solid #059669",
                    borderRadius: 10,
                    padding: "22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    cursor: "pointer",
                    transition: "box-shadow 0.15s, transform 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(5,150,105,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                  onClick={() => nav("/projects")}
                >
                  {/* Skill + Status row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      background: "#ecfdf5", color: "#059669",
                      fontSize: 11, fontWeight: 800,
                      padding: "3px 9px", borderRadius: 20,
                      textTransform: "uppercase", letterSpacing: "0.6px",
                    }}>
                      {p.skill || "General"}
                    </span>
                    <span style={{
                      background: "#dcfce7", color: "#166534",
                      fontSize: 10, fontWeight: 700,
                      padding: "2px 8px", borderRadius: 20,
                      textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>
                      Open
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: 15, fontWeight: 700, color: "#0f172a",
                    lineHeight: 1.4, margin: 0,
                  }}>
                    {p.title}
                  </h3>

                  {/* Description snippet */}
                  <p style={{
                    fontSize: 13, color: "#64748b",
                    lineHeight: 1.55, margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {p.description}
                  </p>

                  {/* Meta row */}
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: "auto", paddingTop: 6, borderTop: "1px solid #e2e8f0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#7a9ec0", fontWeight: 500 }}>
                      <Building2 size={12} /> {p.company || "Verified Company"}
                    </span>
                    {p.duration && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#7a9ec0", fontWeight: 500 }}>
                        <Clock size={12} /> {p.duration}
                      </span>
                    )}
                  </div>

                  {/* CTA hint */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 12.5, color: "#059669", fontWeight: 700, marginTop: 4,
                  }}>
                    Sign up to start this project <ArrowRight size={13} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Skeleton / empty state while loading */
            <div className="grid-3" style={{ gap: 20 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  background: "#f8fafc", border: "1px solid #e2e8f0",
                  borderTop: "3px solid #d1fae5", borderRadius: 10, padding: "22px",
                  minHeight: 180,
                }}>
                  <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, marginBottom: 12, width: "60%" }} />
                  <div style={{ height: 18, background: "#e2e8f0", borderRadius: 6, marginBottom: 8, width: "90%" }} />
                  <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "75%" }} />
                </div>
              ))}
            </div>
          )}

          {/* Trust footnote */}
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <ShieldCheck size={15} color="#059669" />
            <span style={{ fontSize: 13, color: "#64748b" }}>
              All projects are reviewed and approved by the Credify team before going live.
            </span>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              How Credify Works
            </h2>
            <p
              style={{
                color: "#475569",
                fontSize: 15,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              From account registration to verified credentials
            </p>
          </div>
          <div className="grid-3" style={{ gap: 18 }}>
            {HOW_IT_WORKS.map(([num, icon, title, desc]) => (
              <div
                key={num}
                className="card card-hover"
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
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#059669",
                      background: "#ecfdf5",
                      padding: "3px 9px",
                      borderRadius: 6,
                    }}
                  >
                    {num}
                  </span>
                  <span style={{ fontSize: 22, color: "#059669" }}>{icon}</span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "#0f172a",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.65 }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            className="section-title"
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            Platform Features
          </h2>
          <div className="grid-2" style={{ gap: 22 }}>
            {FEATURES.map(([icon, title, desc]) => (
              <div
                key={title}
                className="card"
                style={{ padding: "28px", display: "flex", gap: 20 }}
              >
                <div style={{ fontSize: 30, flexShrink: 0, color: "#059669" }}>{icon}</div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
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

      <section style={{ padding: "80px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 36,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h2 className="section-title" style={{ marginBottom: 6 }}>
                Featured Projects
              </h2>
              <p style={{ color: "#4a6080", fontSize: 15 }}>
                Available tasks from verified organizations
              </p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => nav("/projects")}
            >
              View All Projects
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
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
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
                  Start Project
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: FLAT_HERO_BG,
          padding: "80px 40px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 38,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 14,
              letterSpacing: "-0.5px",
            }}
          >
            Get Started on Credify
          </h2>
          <p
            style={{
              color: "#a7f3d0",
              fontSize: 16,
              marginBottom: 36,
              maxWidth: 480,
              margin: "0 auto 36px",
              opacity: 0.9,
            }}
          >
            Join students demonstrating skills through practical project execution.
          </p>
          <button
            style={{
              background: FLAT_ACCENT,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "14px 44px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => nav("/register")}
          >
            Join Credify Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
