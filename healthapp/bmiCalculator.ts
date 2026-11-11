type BmiCategory = "Underweight" | "Normal range" | "Overweight";

const calculateBmi = (height: number, weight: number): BmiCategory => {
  const bmi: number = weight / Math.pow(height / 100, 2);

  if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi <= 25) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

console.log(calculateBmi(180, 74));
