import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);
  const { height, weight } = req.query;
  if (!height || !weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json({
    weight: weight,
    height: height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
