import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavourite } from '../../models/models';

interface IGithubState {
  favourites: IFavourite[];
}

const LS_FAV_KEY = 'local-storage-favourite-kay';

const initialState: IGithubState = { favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]') };

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<IFavourite>) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter(fav => fav.url !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
