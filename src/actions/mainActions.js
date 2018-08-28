import * as mainConstanst from '../reducers/constant'
import axios from "axios";

let mockUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
let mockID = ',test&APPID=b2a83818e8669b44cdf5ad3db4fce355&units=metric';
export const getCitiesAPI = (city) => async dispatch => {

  if(city){
    let url = mockUrl + city + mockID;
    const newcity = await axios.get(url);
    if(newcity.data){
      dispatch({
        type: mainConstanst.FETCH_NEW_CITY_SUCCESS,
        payload: newcity
        //TODO check in store
      });
    }else {
      dispatch({
        type: mainConstanst.FETCH_NEW_CITY_ERROR,
        //TODO check in store
      });
    }

  }else {
    let url1 = mockUrl + "Moscow" + mockID;
    let url2 = mockUrl + "New York" + mockID;
    let url3 = mockUrl + "London" + mockID;
    let url4 = mockUrl + "tel aviv" + mockID;
    let url5 = mockUrl + "hong kong" + mockID;
    const cityr = await axios.get(url1);
    const city1 = await axios.get(url2);
    const city2 = await axios.get(url3);
    const city3 = await axios.get(url4);
    const city4 = await axios.get(url5);
    let cities = [cityr.data, city1.data, city2.data,city3.data,city4.data];


    const localCities = JSON.parse(localStorage.getItem("cities"));
    if (!localStorage.getItem("cities")) {
      dispatch({
        type: mainConstanst.FETCH_CITIES_SUCCESS,
        payload: cities
      });
    } else {
      dispatch({
        type: mainConstanst.FETCH_LOCAL_CITIES_SUCCESS,
        payload: localCities
      });
    }
  }



};
export const searchCities = value => {
  return {
    type: mainConstanst.SEARCH_CITY,
    value
  };
};
export const removeCity = city => {
  return {
    type: mainConstanst.REMOVE_MY_CITY,
    city
  };
};
export const addCity = city => {
  return {
    type: mainConstanst.ADD_MY_CITY,
    city
  };
};

