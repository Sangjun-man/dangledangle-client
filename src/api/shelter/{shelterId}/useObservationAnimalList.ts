import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ObservationAnimalInfo, get } from './observation-animal';
import { shelterKey } from '../../queryKey';

export default function useObservationAnimalListAtHome(
  {
    shelterId,
    page
  }: {
    shelterId: number;
    page: number;
  },
  options?: UseQueryOptions<ObservationAnimalInfo>
) {
  return useQuery<ObservationAnimalInfo>(
    shelterKey.animalList(shelterId),
    () => get({ shelterId, page }),
    options
  );
}
