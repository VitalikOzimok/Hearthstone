export const deleteWrongSets = (
  sets: string[],
  excludeNames: string[]
): string[] => {
  const filtered = sets.filter((setName) => !excludeNames.includes(setName));
  const unique = [...new Set(filtered)];
  return unique;
};
