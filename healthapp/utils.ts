export const parseArgs = (args: Array<string>): Array<number> => {
  return args.map((arg) => {
    const num = Number(arg);
    if (arg.trim() === "" || !Number.isFinite(num)) {
      throw new Error(`Invalid number: ${arg}`);
    }

    return num;
  });
};
