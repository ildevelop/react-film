import React, {Fragment} from "react";
import {Button, ListGroup, ListGroupItem, Input} from 'reactstrap';
import Loader from '../Loader/Loader';
import './CitiesList.scss'

const CitiesList = props => {
  const {value, onRemoveCities, onAddCities, cities, onInputChange, loaded} = props;
  console.log('cities',cities);
  return (
    <Fragment>
      {loaded ? (
        <div className="search-list">
          <p>Top {cities.length} popular cities in the world</p>
          <div className="search-box">
            <div className="search-item">
              <Input
                type="text"
                placeholder="Please, enter a city name"
                value={value}
                onChange={({target}) => onInputChange(target.value)}
              />
              <Button outline color="success" onClick={(value)=>{
                console.log("click",value);}}>  ADD A NEW</Button>
            </div>
          </div>

          <ListGroup>
            {cities.map((city, index) => {

                return <ListGroupItem
                  key={index}
                  className="text-center">
                  {city.weather[0].main === "Rain"?
                    <img
                      src={"//ssl.gstatic.com/onebox/weather/48/rain_light.png"}
                      alt="weather-pic"/>
                    : <img
                      src={"//ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"}
                      alt="weather-pic"/>}
                  <p>
                    {city.sys.country + "/" + city.name}
                  </p>
                  <p>{city.main.temp}C</p>
                  <p>{city.weather[0].description}</p>
                  <p>today the minimum temperature:{city.main.temp_min}</p>
                  <p>today the maximum temperature:{city.main.temp_max}</p>
                  {!city.isFavorites ? (
                    <Button
                      style={{marginBottom: "10px"}}
                      color="success"
                      onClick={() => onAddCities(city)}>
                      Add To List
                    </Button>
                  ) : (
                    <Button
                      style={{marginBottom: "10px"}}
                      color="danger"
                      onClick={() => onRemoveCities(city)}>
                      Remove From Favorite List
                    </Button>
                  )}
                </ListGroupItem>
              }
            )
            }
          </ListGroup>

        </div>
      ) : <Loader/>}
    </Fragment>
  );
};

export default CitiesList;