export const isStringNumeric = (text: string): boolean => {
  return !Number.isNaN(Number(text));
};
