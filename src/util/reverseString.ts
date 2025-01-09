export const reverseString = (str: string | undefined): string => {
  return (str ?? "").split("").reverse().join("");
};
