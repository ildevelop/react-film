import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from '../reducers/constant'
import * as dotProp from 'dot-prop-immutable';

const initialState = {
  recipes: [],
  cities:[],
  recipe: {},
  searchedValue: "",
  loaded: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE:
      return {...state, recipe: state.recipe + 1};
    case actionTypes.FETCH_recipes_SUCCESS:
      console.log('actionStore', action.payload);
      return {...state, cities: action.payload, loaded: true};
    case actionTypes.FETCH_LOCAL_RECIPES_SUCCESS:
      console.log('citiespayload',action.payload);
      return {...state, cities: action.payload, loaded: true};
    case actionTypes.FETCH_recipes_FAILURE:
      console.log('ERRR', action);
      return {...state, recipes: action.data, loaded: true};
    case actionTypes.SEARCH_RECIPE:
      return {...state, searchedValue: action.value};
    case actionTypes.ADD_MY_RECIPE:
      const searchedToAdd = state.recipes.findIndex(recipe => recipe.title=== action.recipe.title);
      return dotProp.set(state, `recipes.${searchedToAdd}.isRecipe`, true);
    case actionTypes.REMOVE_MY_RECIPE:
      const searchedToRemove = state.recipes.findIndex(recipe => recipe.title === action.recipe.title);
      return dotProp.set(state, `recipes.${searchedToRemove}.isRecipe`, false);

    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store