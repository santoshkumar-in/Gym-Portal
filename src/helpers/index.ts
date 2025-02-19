export const truncateString = (
  str: string | undefined | null,
  maxLength: number = 10,
): string => {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};
