import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import hamburger from "../assets/Hamburger.png";
import add from "../assets/add.png";

const TITLE_MAP: Record<string, string> = {
  "/projects": "Projects",
  "/materials": "Materials",
  "/tools": "Tools",
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const title = TITLE_MAP[location.pathname] ?? "Craft Tracker";

  // Close on click
  useEffect(() => {
    const handleClick = () => setOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
          }}
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
      >
        <div className="drawer_header">
          <div className="drawer_label"></div>
          <button
            className="nav_icon"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="drawer_links">
          <NavLink
            to="/projects"
            className="drawer_link"
            onClick={() => setOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/materials"
            className="drawer_link"
            onClick={() => setOpen(false)}
          >
            Materials
          </NavLink>
          <NavLink
            to="/tools"
            className="drawer_link"
            onClick={() => setOpen(false)}
          >
            Tools
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
