import React, { JSX } from 'react';
import { IFavourite, IRepo } from '../models/models';

type IRepoCard = {
  repo: IRepo;
  isFavourite: boolean;
  onClickAdd: (favourite: IFavourite) => void;
  onClickRemove: (url: string) => void;
};

export function RepoCard({ repo, isFavourite = false, onClickAdd, onClickRemove }: IRepoCard): JSX.Element {
  const {
    name,
    full_name,
    html_url,
    description,
    forks,
    watchers,
    owner: { login: username, avatar_url },
  } = repo;
  function handleClickAdd(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    onClickAdd({
      name,
      url: html_url,
      owner: { login: username, avatar_url },
    });
  }

  function handleClickRemove(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    onClickRemove(html_url);
  }

  return (
    <div className="mb-4 px-5 py-3 border rounded-xl transition-all hover:bg-gray-100 hover:shadow-md">
      <a href={html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold break-words">{full_name}</h2>
        <p className="text-sm">
          Forks: <span className="mr-2 font-bold">{forks}</span>
          Watchers: <span className="font-bold">{watchers}</span>
        </p>
        <p className="mb-2 text-sm font-thin break-words">{description}</p>
        {!isFavourite ? (
          <button
            className="mr-2 px-4 py-2 rounded-md text-white bg-green-500 transition-all hover:shadow-md"
            onClick={handleClickAdd}
          >
            Add
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-md text-white bg-red-500 transition-all hover:shadow-md"
            onClick={handleClickRemove}
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
}
