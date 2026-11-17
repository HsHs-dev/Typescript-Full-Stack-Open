type Rating = 1 | 2 | 3;

type RatingMessage =
  | "You can do better"
  | "not too bad but could be better"
  | "Keep that up champ";

interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: RatingMessage;
  target: number;
  average: number;
}

const calculateExercises = (data: Array<number>, target: number): Exercise => {
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

const testData: Array<number> = [3, 0, 2, 4.5, 0, 3, 1];

console.log(calculateExercises(testData, 2));
