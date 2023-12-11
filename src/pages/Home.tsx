import { ChangeEvent, useEffect, useState } from 'react';

import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

import { IFavourite } from '../models/models';

import { useDebounce } from '../hooks/debounce';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

import { RepoCard } from '../components/RepoCard';

const MIN_LENGTH: number = 3;

export function Home() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isResultVisible, setResultVisible] = useState<boolean>(false);
  const debounced = useDebounce(searchValue);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < MIN_LENGTH,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector(state => state.github);

  useEffect(() => {
    setResultVisible(Boolean(data) && debounced.length >= MIN_LENGTH);
  }, [data, debounced]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
  }

  function handleClick(username: string): void {
    fetchRepos(username);
    setResultVisible(false);
  }

  function handleAddToFavourites(favourite: IFavourite): void {
    addFavourite(favourite);
  }

  function handleRemoveFromFavourites(url: string): void {
    removeFavourite(url);
  }

  return (
    <div className="flex flex-col items-center mx-auto px-5 py-8 w-screen h-full">
      <h1 className="mb-4 text-2xl font-bold">Home</h1>
      {isError && <p className="text-center text-red-500">Something went wrong...</p>}
      <div className="relative w-full max-w-[560px]">
        <input
          type="text"
          id="search-input"
          value={searchValue}
          placeholder="Search for Github username..."
          className="mb-2 py-2 px-4 w-full h-[48px] border-2 border-gray-2 rounded-xl outline-blue-300 shadow-sm"
          onChange={handleChange}
        />
        {isLoading ? (
          <p className="mb-2 text-center">Loading...</p>
        ) : (
          isResultVisible && (
            <ul className="absolute top-[48px] left-0 right-0 overflow-y-auto max-h-[200px] list-none rounded-xl bg-white shadow-md">
              {data!.map(searchResult => (
                <li
                  className="px-4 py-2 cursor-pointer transition-colors hover:bg-gray-100"
                  key={searchResult.id}
                  onClick={() => handleClick(searchResult.login)}
                >
                  {searchResult.login}
                </li>
              ))}
            </ul>
          )
        )}
        <div className="container">
          {areReposLoading ? (
            <p className="text-center">Repos are loading...</p>
          ) : (
            repos?.map(repo => (
              <RepoCard
                repo={repo}
                isFavourite={favourites.some(fav => fav.url === repo.html_url)}
                key={repo.id}
                onClickAdd={handleAddToFavourites}
                onClickRemove={handleRemoveFromFavourites}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
