import { Navigate, Route, Routes } from "react-router-dom";
import Projects from "../pages/Projects";
import Materials from "../pages/Materials";
import Tools from "../pages/Tools";
import NavBar from "../components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </>
  );
}
