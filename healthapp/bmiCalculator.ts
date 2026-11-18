import { parseArgs } from "./utils.ts";

type BmiCategory = "Underweight" | "Normal range" | "Overweight";

export const calculateBmi = (height: number, weight: number): BmiCategory => {
  const bmi: number = weight / Math.pow(height / 100, 2);

  if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi <= 25) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error("Not enough args");
  if (args.length > 4) throw new Error("Too many args");

  const [height, weight] = parseArgs(args.slice(2));

  return { height, weight };
};

try {
  if (process.argv[1] === import.meta.filename) {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  }
} catch (err: unknown) {
  let errorMessage = "Something went wrong: ";
  if (err instanceof Error) errorMessage += err.message;
  console.log(errorMessage);
}
