export type ID = string;

export interface Project {
    id: ID;
    title: string;
    percentComplete: number;
    materialsUsed: Material[];
    toolsUsed: Tool[]
    notes: string;
    imageUrl?: string;
}

export interface BaseMaterial {
  id: ID;
  type: "yarn" | "fabric" | "bracelet";
  name: string;
  quantity: number;
  cost: number;
  dateBought: string;
  imageUrl?: string;
}

export interface YarnMaterial extends BaseMaterial {
  type: "yarn";
  color: string;
  yards: number;
  fiber: string;
  weight: string;
}

export interface FabricMaterial extends BaseMaterial {
  type: "fabric";
  color: string;
  yards: number;
  fabricType: string;
  pattern: string;
}

export interface BraceletMaterial extends BaseMaterial {
  type: "bracelet";
  materialType: string;
}

export type Material = YarnMaterial | FabricMaterial | BraceletMaterial;

export type ToolCategoryId =
  | "crochet"
  | "knitting"
  | "sewing"
  | "embroidery"
  | "painting"
  | "soldering";

export interface Tool {
  id: ID;
  name: string;
  categoryId: ToolCategoryId;
  dateBought?: string;
  notes?: string;
  imageUrl?: string;
}

export const TOOL_CATEGORIES: { id: ToolCategoryId; label: string }[] = [
  { id: "crochet", label: "Crochet" },
  { id: "knitting", label: "Knitting" },
  { id: "sewing", label: "Sewing" },
  { id: "embroidery", label: "Embroidery" },
  { id: "painting", label: "Painting" },
  { id: "soldering", label: "Soldering" },
];
