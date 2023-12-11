import { IFavourite, IFavouriteGroup } from '../models/models';

export function useGroupFavourites(favourites: IFavourite[]): IFavouriteGroup[] {
  return favourites.reduce((prev, current) => {
    const favouriteGroup = prev.find(prevItem => prevItem.owner.name === current.owner.login);

    if (favouriteGroup) {
      prev = prev.filter(({ owner }) => owner.name !== favouriteGroup.owner.name);
      prev.push({ ...favouriteGroup, favourites: [...favouriteGroup.favourites, current] });
    } else {
      prev.push({ owner: { name: current.owner.login, avatar: current.owner.avatar_url }, favourites: [current] });
    }

    return prev;
  }, [] as IFavouriteGroup[]);
}
