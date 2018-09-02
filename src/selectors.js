import { createSelector } from 'reselect';

export const getfilms = state => state.films;
export const getFilm = state => state.film;
export const getSearchValue = state => state.searchedValue;
export const getLoadingStatus = state => state.loaded;
export const getErrorNewCity = state => state.errorNewFilm;

export const getSearchedfilms= createSelector(getfilms, getSearchValue, (films, searchValue) => {
  console.log("films",films);
  debugger
  return films.filter(film => film.Title.toLowerCase().includes(searchValue.toLowerCase()));


});

export const getMyfilms = createSelector(getfilms, (films) => {
  return films.filter(film => film.isFavorites);
});

