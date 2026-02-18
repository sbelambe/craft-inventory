import { Router } from "express";
import { db } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  const projects = await db.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      materials: { include: { material: true } },
      tools: { include: { tool: true } },
    },
  });

  // Shape it closer to your frontend:
  const shaped = projects.map((p: { id: any; title: any; percentComplete: any; notes: any; imageUrl: any; materials: { material: any; }[]; tools: { tool: any; }[]; }) => ({
    id: p.id,
    title: p.title,
    percentComplete: p.percentComplete,
    notes: p.notes,
    imageUrl: p.imageUrl ?? undefined,
    materialsUsed: p.materials.map((pm: { material: any; }) => pm.material),
    toolsUsed: p.tools.map((pt: { tool: any; }) => pt.tool),
  }));

  res.json(shaped);
});

router.post("/", async (req, res) => {
  const { title, percentComplete = 0, notes = "", imageUrl, materialIds = [], toolIds = [] } = req.body ?? {};

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }

  const project = await db.project.create({
    data: {
      title,
      percentComplete: Number(percentComplete) || 0,
      notes: String(notes ?? ""),
      imageUrl: imageUrl ? String(imageUrl) : undefined,
      materials: {
        create: (Array.isArray(materialIds) ? materialIds : []).map((materialId: string) => ({
          materialId,
        })),
      },
      tools: {
        create: (Array.isArray(toolIds) ? toolIds : []).map((toolId: string) => ({
          toolId,
        })),
      },
    },
  });

  res.status(201).json(project);
});

// attach a material to a project
router.post("/:id/materials", async (req, res) => {
  const projectId = req.params.id;
  const { materialId } = req.body ?? {};
  if (!materialId) return res.status(400).json({ error: "materialId is required" });

  const link = await db.projectMaterial.create({
    data: { projectId, materialId },
  });

  res.status(201).json(link);
});

// attach a tool to a project
router.post("/:id/tools", async (req, res) => {
  const projectId = req.params.id;
  const { toolId } = req.body ?? {};
  if (!toolId) return res.status(400).json({ error: "toolId is required" });

  const link = await db.projectTool.create({
    data: { projectId, toolId },
  });

  res.status(201).json(link);
});

export default router;
