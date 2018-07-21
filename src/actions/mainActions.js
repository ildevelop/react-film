import * as mainConstanst from '../reducers/constant'
import axios from "axios";
const mockApiData = require('./../data');

export const getRecipe = () => async dispatch => {
  dispatch({type: mainConstanst.FETCH_recipes_START});
  try {
    const foods = await axios.get("http://www.recipepuppy.com/api/?i=onions,garlic&q=salat&p=1",{headers: {'Content-Type': 'text/plain'}});
    const localUsers = JSON.parse(localStorage.getItem("foods"));
    if (!localStorage.getItem("foods")) {
      dispatch({
        type: mainConstanst.FETCH_recipes_SUCCESS,
        users: foods.data.results
      });
    } else {
      dispatch({
        type: mainConstanst.FETCH_LOCAL_RECIPES_SUCCESS,
        users: localUsers
      });
    }
  }
  catch (err) {
    new Promise((resolve, reject) => {
      resolve(setTimeout(() => {
          dispatch({
            type: mainConstanst.FETCH_recipes_FAILURE,
            data:mockApiData.results
          })
        }, 1000
      ));
    })}
};
export const searchUser = value => {
  return {
    type: mainConstanst.SEARCH_USER,
    value
  };
};

