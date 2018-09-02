import * as mainConstanst from '../reducers/constant'
import axios from "axios";
import {URL} from './secret'
export const getfilmsAPI = (title,year) => async dispatch => {

  if(title){
    try {
      let url = URL + 't='+title + '&y='+year;
      const newfilm = await axios.get(url);
      if(newfilm.data){
        dispatch({
          type: mainConstanst.FETCH_NEW_FILM_SUCCESS,
          payload: newfilm.data
        });
      }else {
        return dispatch({
          type: mainConstanst.FETCH_NEW_FILM_SUCCESS,
        });
      }
    }catch (e) {
      console.log('ERROR fetch data from API',e);
      return dispatch({
          type: mainConstanst.FETCH_NEW_FILM_ERROR,
        });
    }

  }else {
    let url1 = URL + 't=Infinity War&y=2018';
    let url2 = URL + 't=Mission Impossible&y=2018';
    let url3 = URL + 't=Venom&y=2018';

    const film1 = await axios.get(url1);
    const film2 = await axios.get(url2);
    const film3 = await axios.get(url3);
    let films = [film1.data, film2.data, film3.data];


    const localfilms = JSON.parse(localStorage.getItem("films"));
    if (!localStorage.getItem("films")) {
      let localData =JSON.stringify(films);
      console.log('localData',localData);
      localStorage.setItem('films', localData);
      dispatch({
        type: mainConstanst.FETCH_films_SUCCESS,
        payload: films
      });
    } else {
      dispatch({
        type: mainConstanst.FETCH_LOCAL_films_SUCCESS,
        payload: localfilms
      });
    }
  }
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
export const removeFilm = city => {
  return {
    type: mainConstanst.REMOVE_MY_FILM,
    city
  };
};
export const addFilm = city => {
  return {
    type: mainConstanst.ADD_MY_FILM,
    city
  };
};

