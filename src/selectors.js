import { createSelector } from 'reselect';

export const getfilms = state => state.films;
export const getFilm = state => state.film;
export const getSearchValue = state => state.searchedValue;
export const getLoadingStatus = state => state.loaded;
export const getErrorNewCity = state => state.errorNewFilm;

export const getSearchedfilms= createSelector(getfilms, getSearchValue, (films, searchValue) => {

  return films.filter(city => city.Title.toLowerCase().includes(searchValue.toLowerCase()));
});

export const getMyfilms = createSelector(getfilms, (films) => {
  return films.filter(film => film.isFavorites);
});

