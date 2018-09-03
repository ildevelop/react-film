import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from '../reducers/constant'
import * as dotProp from 'dot-prop-immutable';

const initialState = {
  films: [],
  film: {},
  searchedValue: "",
  loaded: false,
  errorNewFilm: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_films_SUCCESS:
      return {...state, films: action.payload, loaded: true};
    case actionTypes.FETCH_LOCAL_films_SUCCESS:
      return {...state, films: action.payload, loaded: true};
    case actionTypes.SEARCH_FILM:
      return {...state, searchedValue: action.value};
    case actionTypes.ADD_MY_FILM:
      const searchedToAdd = state.films.findIndex(film => film.Title === action.film.Title);
      return dotProp.set(state, `films.${searchedToAdd}.isFavorites`, true);
    case actionTypes.REMOVE_MY_FILM:
      const searchedToRemove = state.films.findIndex(film => film.Title=== action.film.Title);
      return dotProp.set(state, `films.${searchedToRemove}.isFavorites`, false);
    case actionTypes.FETCH_NEW_FILM_ERROR:
      return {...state, errorNewFilm: !state.errorNewFilm, searchedValue: ""};
    case actionTypes.FETCH_NEW_FILM_SUCCESS:
      let newfilms = state.films;
      newfilms.push(action.payload);
      return {...state,films:newfilms,searchedValue:""};
    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store