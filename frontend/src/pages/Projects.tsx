import "../styles/global.css";
import ProjectCard from "../components/cards/ProjectCard";
import type { Project, YarnMaterial, Tool } from "../types";

export default function Projects() {
  const sampleMaterial1: YarnMaterial = {
    id: "m1",
    type: "yarn",
    name: "Red Yarn",
    quantity: 2,
    cost: 10,
    dateBought: "2024-01-15",
    color: "Red",
    yards: 200,
    fiber: "Wool",
    weight: "DK",
  };

  const sampleMaterial2: YarnMaterial = {
    id: "m2",
    type: "yarn",
    name: "Blue Yarn",
    quantity: 2,
    cost: 10,
    dateBought: "2024-01-15",
    color: "Blue",
    yards: 200,
    fiber: "Wool",
    weight: "DK",
  };

  const sampleTool: Tool = {
    id: "t1",
    name: "Knitting Needles",
    categoryId: "knitting",
    dateBought: "2023-12-10",
  };

  const sampleProject: Project = {
    id: "p1",
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
