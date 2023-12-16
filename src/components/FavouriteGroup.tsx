import { JSX } from 'react';

import { IFavouriteGroup } from '../models/models';

const AVATAR_SIZE: number = 40;

export function FavouriteGroup({ owner, favourites }: IFavouriteGroup): JSX.Element {
  return (
    <li className="flex flex-col rounded-xl shadow-xl">
      <div className="flex items-center gap-3 px-4 py-3 border-b-2 rounded-t-xl text-white bg-gray-600">
        <img
          src={owner.avatar}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          className="rounded-full object-cover select-none"
          alt={`${owner.name}'s avatar`}
        />
        <h2 className="min-w-0 text-xl font-semibold break-words">{owner.name}</h2>
      </div>
      <ul className="flex flex-col gap-2 flex-grow list-none p-4 border rounded-b-xl">
        {favourites.map(({ name, url }) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="font-medium break-words hover:underline hover:underline-offset-2"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
