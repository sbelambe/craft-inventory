import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import hamburger from "../assets/Hamburger.png";
import add from "../assets/add.png";

type AddTarget = "projects" | "materials" | "tools" | "none";

type Props = {
  onAddClick?: (target: Exclude<AddTarget, "none">) => void;
};

export default function NavBar({ onAddClick }: Props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const pathname = location.pathname.replace(/\/$/, "");

  const { title, addTarget } = useMemo(() => {
    if (pathname === "" || pathname === "/" || pathname.startsWith("/projects")) {
      return { title: "Projects", addTarget: "projects" as const };
    }
    if (pathname.startsWith("/materials")) {
      return { title: "Materials", addTarget: "materials" as const };
    }
    if (pathname.startsWith("/tools")) {
      return { title: "Tools", addTarget: "tools" as const };
    }
    return { title: "Craft Tracker", addTarget: "none" as const };
  }, [pathname]);

  function handleAddClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (addTarget === "none") return;
    onAddClick?.(addTarget);
  }

  return (
    <>
      <header className="nav">
        <button
          className="nav_icon"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          <img src={hamburger} alt="Menu icon" />
        </button>

        <div className="nav_spacer" />
        <div className="nav_title">{title}</div>

        <button
          className="nav_add"
          aria-label={`Add ${title}`}
          onClick={handleAddClick}
          disabled={addTarget === "none"}
        >
          <img src={add} alt="Add icon" />
        </button>
      </header>

      <div
        className={`backdrop ${open ? "backdrop--show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`drawer ${open ? "drawer--open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer_header">
          <div className="drawer_label">Pages</div>
          <button
            className="nav_icon"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="drawer_links">
          <NavLink to="/projects" className="drawer_link" onClick={() => setOpen(false)}>
            Projects
          </NavLink>
          <NavLink to="/materials" className="drawer_link" onClick={() => setOpen(false)}>
            Materials
          </NavLink>
          <NavLink to="/tools" className="drawer_link" onClick={() => setOpen(false)}>
            Tools
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
