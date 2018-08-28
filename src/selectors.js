import { createSelector } from 'reselect';

export const getCities = state => state.cities;
export const getCity = state => state.city;
export const getSearchValue = state => state.searchedValue;
export const getLoadingStatus = state => state.loaded;

export const getSearchedCities= createSelector(getCities, getSearchValue, (cities, searchValue) => {

  return cities.filter(city => city.name.toLowerCase().includes(searchValue.toLowerCase()));
});

export const getMyCities = createSelector(getCities, (cities) => {
  return cities.filter(city => city.isFavorites);
});

