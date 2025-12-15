import Card from "../ui/Card";
import type { Project } from "../../types";
import "./ProjectCard.css";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const percent = Math.min(100, Math.max(0, project.percentComplete));
  return (
    <Card
      title={project.title}
      headerRight={
        <div className="card-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Edit project">
            <img src={editIcon} alt="" />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label="Delete project">
            <img src={deleteIcon} alt="" />
          </button>
        </div>
      }
    >
      <div className="card-section">
        <div className="information-section">
          <div className="progress-section">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="progress-percent">{percent}%</span>
          </div>

          <div className="materials-used-section">
            Materials:
            {project.materialsUsed.length > 0 && (
              <ul className="materials-list">
                {project.materialsUsed.map((material) => (
                  <li key={material.id}>
                    <button className="materials-button" type="button">
                      {material.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="tools-used-section">
            Tools:
            {project.toolsUsed.length > 0 && (
              <ul className="tools-list">
                {project.toolsUsed.map((tool) => (
                  <li key={tool.id}>
                    <button className="materials-button" type="button">
                      {tool.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="image">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={project.title} />
          ) : (
            <div className="placeholder-image">No Image Available</div>
          )}
        </div>
      </div>

      <div className="separator-line" />
      <div className="notes-section">{project.notes}</div>
    </Card>
  );
}
