import { parseArgs } from "./utils.ts";

type Rating = 1 | 2 | 3;

type RatingMessage =
  | "You can do better"
  | "not too bad but could be better"
  | "Keep that up champ";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingMessage;
  target: number;
  average: number;
}

interface CmdVals {
  days: Array<number>;
  target: number;
}

const calculateExercises = (
  data: Array<number>,
  target: number,
): ExerciseResult => {
  const average: number =
    data.reduce((a: number, b: number) => a + b, 0) / data.length;

  const halfTarget = (50 / 100) * target;
  let rating: Rating;
  let message: RatingMessage;

  if (average < halfTarget) {
    rating = 1;
    message = "You can do better";
  } else if (average < target) {
    rating = 2;
    message = "not too bad but could be better";
  } else {
    rating = 3;
    message = "Keep that up champ";
  }

  return {
    periodLength: data.length,
    trainingDays: data.filter((day) => day !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: message,
    target: target,
    average: average,
  };
};

const parseArguments = (args: Array<string>): CmdVals => {
  const [target, ...days] = parseArgs(args.slice(2));

  return { target, days };
};

try {
  const { target, days } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (err: unknown) {
  let errorMessage = "Something went wrong: ";
  if (err instanceof Error) errorMessage += err.message;
  console.log(errorMessage);
}
