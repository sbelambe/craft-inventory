import "../styles/global.css";
import ProjectCard from "../components/cards/ProjectCard";
import type { Project, Yarn, Tool, CrochetHook } from "../types";

export default function Projects() {
  const sampleMaterial1: Yarn = {
    id: "m1",
    name: "Red Yarn",
    quantity: 2,
    cost: 10,
    dateBought: "2024-01-15",
    color: "Red",
    yards: 200,
    fiber: "Wool",
    weight: "DK",
  };

    const sampleMaterial2: Yarn = {
    id: "m1",
    name: "Blue Yarn",
    quantity: 2,
    cost: 10,
    dateBought: "2024-01-15",
    color: "Red",
    yards: 200,
    fiber: "Wool",
    weight: "DK",
  };
  const sampleTool: CrochetHook = {
    id: "t1",
    name: "Knitting Needles",
    type: "Needles",
    dateAcquired: "2023-12-10",
    size: "US 8",
  };
  const sampleProject: Project = {
    id: "1",
    title: "Sample Project",
    percentComplete: 50,
    materialsUsed: [sampleMaterial1, sampleMaterial2, sampleMaterial1, sampleMaterial1],
    toolsUsed: [sampleTool],
    notes: "This is a sample project.",
  };

  return (
    <div>
      <ProjectCard project={sampleProject} />
    </div>
  );
}
