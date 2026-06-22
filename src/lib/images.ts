function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 1000;
}

export function getIngredientImage(name: string, width = 800, height = 400): string {
  const seed = stringToSeed(name);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function getCategoryImage(category: string, width = 800, height = 400): string {
  const seed = stringToSeed(category + 'category');
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
