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

export type ToolType = "crochetHook" | "knittingNeedle" | "generic";

export interface BaseTool {
    id: ID;
    type: ToolType;
    dateBought: string;
    imageUrl?: string;
}

export interface CrochetHook extends BaseTool {
    type: "crochetHook";
    size: string;
}

export interface KnittingNeedle extends BaseTool {
    type: "knittingNeedle";
    size: string;
    length: string;
}

export interface GenericTool extends BaseTool {
    type: "generic";
    category?: string;
    description?: string;
}

export type Tool = CrochetHook | KnittingNeedle | GenericTool;

export type ToolGroup =
  | { kind: "crochetHook"; title: "Crochet Hooks"; tools: CrochetHook[] }
  | { kind: "knittingNeedle"; title: "Knitting Needles"; tools: KnittingNeedle[] }
  | { kind: "genericCategory"; title: string; tools: GenericTool[] };
