import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from '../reducers/constant'
import * as dotProp from 'dot-prop-immutable';

const initialState = {
  cities: [],
  city: {},
  searchedValue: "",
  loaded: false,
  errorNewCity: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CITIES_SUCCESS:
      return {...state, cities: action.payload, loaded: true};
    case actionTypes.FETCH_LOCAL_CITIES_SUCCESS:
      return {...state, cities: action.payload, loaded: true};
    case actionTypes.SEARCH_CITY:
      return {...state, searchedValue: action.value};
    case actionTypes.ADD_MY_CITY:
      const searchedToAdd = state.cities.findIndex(city => city.name === action.city.name);
      return dotProp.set(state, `cities.${searchedToAdd}.isFavorites`, true);
    case actionTypes.REMOVE_MY_CITY:
      const searchedToRemove = state.cities.findIndex(city => city.name === action.city.name);
      return dotProp.set(state, `cities.${searchedToRemove}.isFavorites`, false);
    case actionTypes.FETCH_NEW_CITY_ERROR:
      return {...state, errorNewCity: !state.errorNewCity, searchedValue: ""};
    case actionTypes.FETCH_NEW_CITY_SUCCESS:
      console.log('ETCH_NEW_CITY_SUCCESS',action.payload);
      let newCities = state.cities;
      newCities.push(action.payload);
      return {...state,cities:newCities,searchedValue:""};
    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store