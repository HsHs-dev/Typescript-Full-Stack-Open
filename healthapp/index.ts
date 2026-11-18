import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== "string" || typeof weight !== "string") {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const h = Number(height);
  const w = Number(weight);

  if (
    !height.trim() ||
    !weight.trim() ||
    !Number.isFinite(h) ||
    !Number.isFinite(w) ||
    h <= 0 ||
    w <= 0
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json({
    weight: w,
    height: h,
    bmi: calculateBmi(h, w),
  });
});

app.post("/exercises", (req, res) => {
  const body: unknown = req.body;

  if (typeof body !== "object" || body === null) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!("daily_exercises" in body) || !("target" in body)) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const { daily_exercises, target } = body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((val) => typeof val === "number")
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (typeof target !== "number") {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
