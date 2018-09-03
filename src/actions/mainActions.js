import * as mainConstanst from '../reducers/constant'
import axios from "axios";
import {URL} from './secret'

export const initState = () => dispatch => {
  const localfilms = JSON.parse(localStorage.getItem("films"));
  if (localStorage.getItem("films")) {
    dispatch({
      type: mainConstanst.FETCH_LOCAL_films_SUCCESS,
      payload: localfilms
    });
  } else {
    let localData = JSON.stringify([]);
    localStorage.setItem('films', localData);
    dispatch({
      type: mainConstanst.FETCH_films_SUCCESS,
      payload: []
    });
  }
};

export const getfilmsAPI = (title, year) => async dispatch => {
  let url = URL + 't=' + title + '&y=' + year;
  const newfilm = await axios.get(url);
  if (newfilm.data.Response === "True") {
    dispatch({
      type: mainConstanst.FETCH_NEW_FILM_SUCCESS,
      payload: newfilm.data
    });
  } else {
    return dispatch({
      type: mainConstanst.FETCH_NEW_FILM_ERROR,
    });
  }


};
export const clearSearchData = ()=>{
  return {
    type: mainConstanst.CLEAR_SEARCH,
  };
};
export const addYear = (year)=>{
  return {
    type: mainConstanst.ADD_YEAR,
    payload:year
  };
};

export const closeModal = () => {
  return {
    type: mainConstanst.FETCH_NEW_FILM_ERROR,
  };
};
export const searchfilms = value => {
  return {
    type: mainConstanst.SEARCH_FILM,
    value
  };
};
export const removeFilm = film => {
  return {
    type: mainConstanst.REMOVE_MY_FILM,
    film
  };
};
export const addFilm = film => {
  return {
    type: mainConstanst.ADD_MY_FILM,
    film
  };
};

