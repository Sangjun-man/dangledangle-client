export const shelterKey = {
  all: ['shelter'] as const,
  animalLists: () => [...shelterKey.all, 'observation-animal-list'] as const,
  animalList: (shelterId: number) =>
    [...shelterKey.animalLists(), shelterId] as const,
  animal: (id: number) => [...shelterKey.animalLists(), 'animal', id] as const,
  image: () => [...shelterKey.all, 'image'] as const,
  info: () => [...shelterKey.all, 'info'] as const,
  homeInfo: () => [...shelterKey.all, 'info', 'home'] as const
};
