import { createSelector } from 'reselect';

export const getRecipes = state => state.recipes;
export const getRecipe = state => state.recipe;
export const getSearchValue = state => state.searchedValue;
export const getLoadingStatus = state => state.loaded;

export const getSearchedRecipe= createSelector(getRecipes, getSearchValue, (recipes, searchValue) => {
  return recipes.filter(recipe => recipe.title.includes(searchValue) || recipe.ingredients.includes(searchValue));
});

export const getMyRecipes = createSelector(getRecipes, (recipes) => {
  return recipes.filter(recipe => recipe.isFavorites);
});

