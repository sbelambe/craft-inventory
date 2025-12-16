import "../styles/global.css";
import type { Material, YarnMaterial, FabricMaterial } from "../types";
import MaterialCard from "../components/cards/MaterialCard";


export default function Materials() {
const yarn: YarnMaterial = {
  id: "1",
  type: "yarn",
  name: "Soft Wool",
  quantity: 2,
  cost: 15.99,
  dateBought: "2024-01-15",
  color: "Red",
  yards: 200,
  fiber: "Wool",
  weight: "DK",
};

const fabric: FabricMaterial = {
  id: "2",
  type: "fabric",
  name: "Cotton Fabric",
  quantity: 3,
  cost: 9.99,
  dateBought: "2024-02-10",
  color: "Blue",
  yards: 5,
  fabricType: "Cotton",
  pattern: "Striped",
}


  return (
    <div>
      <MaterialCard
        material={yarn}>
      </MaterialCard>
      <MaterialCard
        material={fabric}>
      </MaterialCard>
    </div>
  );
}
