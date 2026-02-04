import { useMemo, useState } from "react";
import type { Material, YarnMaterial, FabricMaterial, BraceletMaterial } from "../../types";
import "./Form.css";

type MaterialType = "yarn" | "fabric" | "bracelet";

type Props = {
  onCreate: (material: Material) => void;
  onCancel?: () => void;
};

export default function MaterialForm({ onCreate, onCancel }: Props) {
  const [type, setType] = useState<MaterialType>("yarn");

  // common fields
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cost, setCost] = useState<number>(0);
  const [dateBought, setDateBought] = useState("");

  // yarn fields
  const [yarnColor, setYarnColor] = useState("");
  const [yarnYards, setYarnYards] = useState<number>(0);
  const [yarnFiber, setYarnFiber] = useState("");
  const [yarnWeight, setYarnWeight] = useState("");

  // fabric fields
  const [fabricColor, setFabricColor] = useState("");
  const [fabricYards, setFabricYards] = useState<number>(0);
  const [fabricType, setFabricType] = useState("");
  const [fabricPattern, setFabricPattern] = useState("");

  // bracelet fields
  const [braceletMaterialType, setBraceletMaterialType] = useState("");

  const canSubmit = useMemo(() => {
    if (name.trim().length === 0) return false;
    if (!dateBought) return false;
    if (quantity < 0) return false;
    if (cost < 0) return false;

    if (type === "yarn") {
      return yarnColor.trim() && yarnFiber.trim() && yarnWeight.trim();
    }
    if (type === "fabric") {
      return fabricColor.trim() && fabricType.trim() && fabricPattern.trim();
    }
    if (type === "bracelet") {
      return braceletMaterialType.trim();
    }
    return false;
  }, [
    name, dateBought, quantity, cost,
    type,
    yarnColor, yarnFiber, yarnWeight,
    fabricColor, fabricType, fabricPattern,
    braceletMaterialType
  ]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const base = {
      id: crypto.randomUUID(),
      type,
      name: name.trim(),
      quantity: Math.max(0, quantity),
      cost: Math.max(0, cost),
      dateBought,
    };

    let material: Material;

    if (type === "yarn") {
      material = {
        ...base,
        type: "yarn",
        color: yarnColor.trim(),
        yards: Math.max(0, yarnYards),
        fiber: yarnFiber.trim(),
        weight: yarnWeight.trim(),
      } satisfies YarnMaterial;
    } else if (type === "fabric") {
      material = {
        ...base,
        type: "fabric",
        color: fabricColor.trim(),
        yards: Math.max(0, fabricYards),
        fabricType: fabricType.trim(),
        pattern: fabricPattern.trim(),
      } satisfies FabricMaterial;
    } else {
      material = {
        ...base,
        type: "bracelet",
        materialType: braceletMaterialType.trim(),
      } satisfies BraceletMaterial;
    }

    onCreate(material);

    // reset
    setName("");
    setQuantity(1);
    setCost(0);
    setDateBought("");

    setYarnColor("");
    setYarnYards(0);
    setYarnFiber("");
    setYarnWeight("");

    setFabricColor("");
    setFabricYards(0);
    setFabricType("");
    setFabricPattern("");

    setBraceletMaterialType("");
    setType("yarn");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="form__label" htmlFor="materialType">Material type</label>
        <select
          id="materialType"
          className="form__select"
          value={type}
          onChange={(e) => setType(e.target.value as MaterialType)}
        >
          <option value="yarn">Yarn</option>
          <option value="fabric">Fabric</option>
          <option value="bracelet">Bracelet</option>
        </select>
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="name">Name</label>
        <input
          id="name"
          className="form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Soft Wool, Cotton Fabric..."
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          className="form__input"
          type="number"
          min={0}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="cost">Cost</label>
        <input
          id="cost"
          className="form__input"
          type="number"
          min={0}
          step="0.01"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="dateBought">Date bought</label>
        <input
          id="dateBought"
          className="form__input"
          type="date"
          value={dateBought}
          onChange={(e) => setDateBought(e.target.value)}
        />
      </div>

      {/* Type-specific fields */}
      {type === "yarn" && (
        <>
          <div className="form__row">
            <label className="form__label">Color</label>
            <input className="form__input" value={yarnColor} onChange={(e) => setYarnColor(e.target.value)} />
          </div>
          <div className="form__row">
            <label className="form__label">Yards</label>
            <input className="form__input" type="number" min={0} value={yarnYards} onChange={(e) => setYarnYards(Number(e.target.value))} />
          </div>
          <div className="form__row">
            <label className="form__label">Fiber</label>
            <input className="form__input" value={yarnFiber} onChange={(e) => setYarnFiber(e.target.value)} />
          </div>
          <div className="form__row">
            <label className="form__label">Weight</label>
            <input className="form__input" value={yarnWeight} onChange={(e) => setYarnWeight(e.target.value)} placeholder="e.g., DK, Worsted" />
          </div>
        </>
      )}

      {type === "fabric" && (
        <>
          <div className="form__row">
            <label className="form__label">Color</label>
            <input className="form__input" value={fabricColor} onChange={(e) => setFabricColor(e.target.value)} />
          </div>
          <div className="form__row">
            <label className="form__label">Yards</label>
            <input className="form__input" type="number" min={0} value={fabricYards} onChange={(e) => setFabricYards(Number(e.target.value))} />
          </div>
          <div className="form__row">
            <label className="form__label">Fabric type</label>
            <input className="form__input" value={fabricType} onChange={(e) => setFabricType(e.target.value)} placeholder="e.g., Cotton, Linen" />
          </div>
          <div className="form__row">
            <label className="form__label">Pattern</label>
            <input className="form__input" value={fabricPattern} onChange={(e) => setFabricPattern(e.target.value)} placeholder="e.g., Floral, Solid" />
          </div>
        </>
      )}

      {type === "bracelet" && (
        <div className="form__row">
          <label className="form__label">Material type</label>
          <input
            className="form__input"
            value={braceletMaterialType}
            onChange={(e) => setBraceletMaterialType(e.target.value)}
            placeholder="e.g., Beads, String, Elastic"
          />
        </div>
      )}

      <div className="form__actions">
        {onCancel && (
          <button type="button" className="form__btn form__btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}

        <button type="submit" className="form__btn" disabled={!canSubmit}>
          Add Material
        </button>
      </div>
    </form>
  );
}
