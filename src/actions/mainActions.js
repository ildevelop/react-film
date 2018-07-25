import * as mainConstanst from '../reducers/constant'
import axios from "axios";

const mockApiData = require('./../data');

export const getRecipe = () => async dispatch => {
  dispatch({type: mainConstanst.FETCH_recipes_START});
  try {
    const foods = await axios.get('/api', {});
    console.log('foods',foods);
    debugger
    if(!foods.data.results){
      throw new Error({'err':'response without data'});
    }
    const localUsers = JSON.parse(localStorage.getItem("recipes"));
    if (!localStorage.getItem("recipes" )) {
      dispatch({
        type: mainConstanst.FETCH_recipes_SUCCESS,
        recipes: foods.data.results
      });
    } else {
      dispatch({
        type: mainConstanst.FETCH_LOCAL_RECIPES_SUCCESS,
        recipes: localUsers
      });
    }
  }
  catch (err) {
    const localUsers = JSON.parse(localStorage.getItem("recipes"));
    if (!localStorage.getItem("recipes")) {
      dispatch({
        type: mainConstanst.FETCH_recipes_SUCCESS,
        recipes: mockApiData.results
      });
    } else {
      dispatch({
        type: mainConstanst.FETCH_LOCAL_RECIPES_SUCCESS,
        recipes: localUsers
      });
    }

  }
};
export const searchRecipe = value => {
  return {
    type: mainConstanst.SEARCH_RECIPE,
    value
  };
};
export const removeRecipe = recipe => {
  return {
    type: mainConstanst.REMOVE_MY_RECIPE,
    recipe
  };
};
export const addRecipe = recipe => {
  return {
    type: mainConstanst.ADD_MY_RECIPE,
    recipe
  };
};

