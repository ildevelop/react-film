import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from '../reducers/constant'

const initialState = {
  recipes: [],
  recipe: {},
  searchedValue: "",
  loaded: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE:
      return {...state, recipe: state.recipe + 1};
    case actionTypes.FETCH_recipes_SUCCESS:
      console.log('actionStore', action.recipes);
      return {...state, recipes: action.recipes, loaded: true};
    case actionTypes.FETCH_LOCAL_RECIPES_SUCCESS:
      return {...state, recipes: action.recipes, loaded: true};
    case actionTypes.FETCH_recipes_FAILURE:
      console.log('ERRR', action);
      return {...state, recipes: action.data, loaded: true};
    case actionTypes.SEARCH_USER:
      return {...state, searchedValue: action.value};
    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store