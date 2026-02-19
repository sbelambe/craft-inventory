import { Router } from "express";
import { db } from "../db";

const router = Router();

const MATERIAL_TYPES = ["yarn", "fabric", "bracelet"] as const;
type MaterialType = (typeof MATERIAL_TYPES)[number];

function isMaterialType(value: unknown): value is MaterialType {
  return typeof value === "string" && MATERIAL_TYPES.includes(value as MaterialType);
}

function parseOptionalDate(value: unknown): Date | undefined | null {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

router.get("/", async (_req, res) => {
  const materials = await db.material.findMany({
    orderBy: { updatedAt: "desc" },
  });
  res.json(materials);
});

router.get("/:id", async (req, res) => {
  const material = await db.material.findUnique({
    where: { id: req.params.id },
  });

  if (!material) {
    return res.status(404).json({ error: "material not found" });
  }

  res.json(material);
});

router.post("/", async (req, res) => {
  const {
    type,
    name,
    quantity,
    cost,
    dateBought,
    imageUrl,
    color,
    yards,
    fiber,
    weight,
    fabricType,
    pattern,
    materialType,
  } = req.body ?? {};

  if (!isMaterialType(type)) {
    return res.status(400).json({ error: "valid material type is required" });
  }
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }

  const parsedDate = parseOptionalDate(dateBought);
  if (!parsedDate) {
    return res.status(400).json({ error: "valid dateBought is required" });
  }

  const material = await db.material.create({
    data: {
      type,
      name: name.trim(),
      quantity: Number(quantity) || 0,
      cost: Number(cost) || 0,
      dateBought: parsedDate,
      imageUrl: imageUrl ? String(imageUrl) : undefined,
      color: color ? String(color) : undefined,
      yards: yards === undefined || yards === null ? undefined : Number(yards) || 0,
      fiber: fiber ? String(fiber) : undefined,
      weight: weight ? String(weight) : undefined,
      fabricType: fabricType ? String(fabricType) : undefined,
      pattern: pattern ? String(pattern) : undefined,
      materialType: materialType ? String(materialType) : undefined,
    },
  });

  res.status(201).json(material);
});

router.patch("/:id", async (req, res) => {
  const {
    type,
    name,
    quantity,
    cost,
    dateBought,
    imageUrl,
    color,
    yards,
    fiber,
    weight,
    fabricType,
    pattern,
    materialType,
  } = req.body ?? {};

  if (type !== undefined && !isMaterialType(type)) {
    return res.status(400).json({ error: "type must be one of yarn, fabric, bracelet" });
  }

  const parsedDate = parseOptionalDate(dateBought);
  if (dateBought !== undefined && !parsedDate) {
    return res.status(400).json({ error: "dateBought must be a valid date" });
  }

  try {
    const material = await db.material.update({
      where: { id: req.params.id },
      data: {
        type,
        name: name === undefined ? undefined : String(name),
        quantity: quantity === undefined ? undefined : Number(quantity) || 0,
        cost: cost === undefined ? undefined : Number(cost) || 0,
        dateBought: parsedDate === undefined ? undefined : parsedDate,
        imageUrl: imageUrl === undefined ? undefined : imageUrl ? String(imageUrl) : null,
        color: color === undefined ? undefined : color ? String(color) : null,
        yards: yards === undefined ? undefined : yards === null ? null : Number(yards) || 0,
        fiber: fiber === undefined ? undefined : fiber ? String(fiber) : null,
        weight: weight === undefined ? undefined : weight ? String(weight) : null,
        fabricType: fabricType === undefined ? undefined : fabricType ? String(fabricType) : null,
        pattern: pattern === undefined ? undefined : pattern ? String(pattern) : null,
        materialType: materialType === undefined ? undefined : materialType ? String(materialType) : null,
      },
    });
    return res.json(material);
  } catch {
    return res.status(404).json({ error: "material not found" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.material.delete({
      where: { id: req.params.id },
    });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: "material not found" });
  }
});

export default router;
