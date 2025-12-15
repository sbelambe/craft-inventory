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

export interface Material {
    id: ID;
    name: string;
    quantity: number;
    cost: number;
    dateBought: string;
    imageUrl?: string;
}

export interface Yarn extends Material {
    color: string;
    yards: number;
    fiber: string;
    weight: string;
    imageUrl?: string;
}

export interface Fabric extends Material {
    color: string;
    yards: number;
    fabricType: string;
    pattern: string;
}

export interface Bracelet extends Material {
    materialType: string;
}

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