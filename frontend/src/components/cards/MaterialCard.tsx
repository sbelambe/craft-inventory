import Card from "../ui/Card";
import type { Material } from "../../types";
import "./MaterialCard.css";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";

type Props = {
  material: Material;
};

export default function MaterialCard({ material }: Props) {
  return (
    <Card
      title={material.name}
      headerRight={
        <div className="card-actions">
          <button type="button" className="icon-btn" aria-label="Edit project">
            <img src={editIcon} alt="" />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label="Delete project"
          >
            <img src={deleteIcon} alt="" />
          </button>
        </div>
      }
    >
      <div className="card-section">
        <div className="information-section">
          <div className="type">{material.type}</div>
          <p>Quantity: {material.quantity}</p>

          {material.type === "yarn" && (
            <div className="yarn-details">
              <p>Color: {material.color}</p>
              <p>Weight: {material.weight}</p>
              <p>Fiber Content: {material.fiber}</p>
              <p>Yards: {material.yards}</p>
            </div>
          )}

          {material.type === "fabric" && (
            <div className="fabric-details">
              <p>Color: {material.color}</p>
              <p>Yards: {material.yards}</p>
              <p>Pattern: {material.pattern}</p>
              <p>Fabric Type: {material.fabricType}</p>
            </div>
          )}

          {material.type === "bracelet" && (
            <div className="bracelet-details">
              <p>Material: {material.materialType}</p>
            </div>
          )}
        </div>
        <div className="image">
          {material.imageUrl ? (
            <img src={material.imageUrl} alt={material.name} />
          ) : (
            <div className="placeholder-image">No Image Available</div>
          )}
        </div>
      </div>
    </Card>
  );
}
