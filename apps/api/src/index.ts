import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();
app.use(cors());
app.use(express.json());

// Plots
app.get("/api/plots", async (_req, res) => {
  const plots = await prisma.plot.findMany({ orderBy:{ id:"asc" } });
  res.json(plots);
});
app.get("/api/plots/:id", async (req, res) => {
  const id = Number(req.params.id);
  const plot = await prisma.plot.findUnique({ where:{ id } });
  if(!plot) return res.status(404).json({ error:"Not found" });
  res.json(plot);
});

// Beds
app.get("/api/beds", async (req, res) => {
  const plotId = Number(req.query.plotId);
  const beds = await prisma.bed.findMany({ where:{ plotId }, orderBy:{ id:"asc" } });
  res.json(beds);
});
app.get("/api/beds/:id", async (req, res) => {
  const id = Number(req.params.id);
  const bed = await prisma.bed.findUnique({ where:{ id } });
  if(!bed) return res.status(404).json({ error:"Not found" });
  res.json(bed);
});
app.get("/api/beds/:id/plants", async (req, res) => {
  const id = Number(req.params.id);
  const plants = await prisma.plant.findMany({ where:{ bedId:id }, orderBy:{ id:"asc" } });
  res.json(plants);
});
app.get("/api/beds/:id/tasks", async (req, res) => {
  const id = Number(req.params.id);
  const tasks = await prisma.task.findMany({ where:{ bedId:id }, orderBy:{ id:"asc" } });
  res.json(tasks);
});

// Tasks
app.get("/api/tasks", async (req, res) => {
  const range = String(req.query.range ?? "");
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  if(range === "today"){
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
  } else if(range === "week"){
    const day = now.getDay();
    const diff = (day+6)%7; // Monday start
    start.setDate(now.getDate() - diff);
    start.setHours(0,0,0,0);
    end.setDate(start.getDate()+6);
    end.setHours(23,59,59,999);
  }
  const tasks = await prisma.task.findMany({
    where: range ? { dueDate: { gte: start, lte: end } } : undefined,
    orderBy:{ dueDate: "asc" }
  });
  res.json(tasks);
});
app.post("/api/tasks", async (req, res) => {
  const { title, bedId, dueDate } = req.body ?? {};
  if(!title || !bedId) return res.status(400).json({ error:"title and bedId required" });
  const created = await prisma.task.create({ data:{ title, bedId, dueDate: dueDate ? new Date(dueDate) : null } });
  res.status(201).json(created);
});
app.patch("/api/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, status, dueDate } = req.body ?? {};
  const updated = await prisma.task.update({
    where:{ id },
    data:{
      title,
      status,
      dueDate: dueDate===undefined ? undefined : (dueDate ? new Date(dueDate) : null)
    }
  });
  res.json(updated);
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, ()=> console.log(`API on http://localhost:${port}`));