import { JSX } from 'react';

import { useAppSelector } from '../hooks/redux';
import { useGroupFavourites } from '../hooks/groupFavourites';

import { FavouriteGroup } from '../components/FavouriteGroup';

export function Favourites(): JSX.Element {
  const { favourites } = useAppSelector(state => state.github);
  const groupedFavourites = useGroupFavourites(favourites);

  if (!groupedFavourites.length) {
    return <p className="mt-8 text-center">No items ...</p>;
  }

  return (
    <div className="flex flex-col items-center mx-auto px-5 py-8 w-screen h-full">
      <h1 className="mb-8 text-2xl font-bold">Favourite repos</h1>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 max-w-full">
        {groupedFavourites.map(group => (
          <FavouriteGroup {...group} key={group.owner.name} />
        ))}
      </ul>
    </div>
  );
}
