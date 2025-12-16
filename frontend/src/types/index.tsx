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


export interface Tool {
    id: ID;
    name: string;
    type: string;
    dateAcquired: string;
    imageUrl?: string;
}

export interface CrochetHook extends Tool {
    size: string;
}

export interface KnittingNeedle extends Tool {
    size: string;
    length: string;
}