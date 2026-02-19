import { Router } from "express";
import { db } from "../db";

const router = Router();

const TOOL_CATEGORIES = ["crochet", "knitting", "sewing", "embroidery", "painting", "soldering"] as const;
type ToolCategoryId = (typeof TOOL_CATEGORIES)[number];

function isToolCategoryId(value: unknown): value is ToolCategoryId {
  return typeof value === "string" && TOOL_CATEGORIES.includes(value as ToolCategoryId);
}

function parseOptionalDate(value: unknown): Date | undefined | null {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

router.get("/", async (_req, res) => {
  const tools = await db.tool.findMany({
    orderBy: { updatedAt: "desc" },
  });
  res.json(tools);
});

router.get("/:id", async (req, res) => {
  const tool = await db.tool.findUnique({
    where: { id: req.params.id },
  });

  if (!tool) {
    return res.status(404).json({ error: "tool not found" });
  }

  res.json(tool);
});

router.post("/", async (req, res) => {
  const { name, categoryId, dateBought, notes, imageUrl } = req.body ?? {};

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }
  if (!isToolCategoryId(categoryId)) {
    return res.status(400).json({ error: "valid categoryId is required" });
  }

  const parsedDate = parseOptionalDate(dateBought);
  if (dateBought !== undefined && dateBought !== null && !parsedDate) {
    return res.status(400).json({ error: "dateBought must be a valid date" });
  }

  const tool = await db.tool.create({
    data: {
      name: name.trim(),
      categoryId,
      dateBought: parsedDate === undefined ? undefined : parsedDate,
      notes: notes ? String(notes) : undefined,
      imageUrl: imageUrl ? String(imageUrl) : undefined,
    },
  });

  res.status(201).json(tool);
});

router.patch("/:id", async (req, res) => {
  const { name, categoryId, dateBought, notes, imageUrl } = req.body ?? {};

  if (categoryId !== undefined && !isToolCategoryId(categoryId)) {
    return res.status(400).json({ error: "categoryId must be a valid tool category" });
  }

  const parsedDate = parseOptionalDate(dateBought);
  if (dateBought !== undefined && !parsedDate) {
    return res.status(400).json({ error: "dateBought must be a valid date" });
  }

  try {
    const tool = await db.tool.update({
      where: { id: req.params.id },
      data: {
        name: name === undefined ? undefined : String(name),
        categoryId,
        dateBought: parsedDate === undefined ? undefined : parsedDate,
        notes: notes === undefined ? undefined : notes ? String(notes) : null,
        imageUrl: imageUrl === undefined ? undefined : imageUrl ? String(imageUrl) : null,
      },
    });

    return res.json(tool);
  } catch {
    return res.status(404).json({ error: "tool not found" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.tool.delete({
      where: { id: req.params.id },
    });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: "tool not found" });
  }
});

export default router;
