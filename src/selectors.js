import { createSelector } from 'reselect';

export const getRecipes = state => state.recipes;
export const getRecipe = state => state.recipe;
export const getSearchValue = state => state.searchedValue;
export const getLoadingStatus = state => state.loaded;

export const getSearchedRecipe= createSelector(getRecipes, getSearchValue, (recepes, searchValue) => {
  return recepes.filter(recepe => recepe.title.includes(searchValue) || recepe.ingredients.includes(searchValue));
});

export const getMyRecipes = createSelector(getRecipes, (recepes) => {
  return recepes.filter(recepe => recepe.isRecipe);
});

