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
    Number.isFinite(w) ||
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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
