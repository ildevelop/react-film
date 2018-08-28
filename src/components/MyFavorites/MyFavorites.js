import React, {Fragment} from "react";
import {ListGroup, ListGroupItem, Button} from "reactstrap";

import Loader from "../Loader/Loader";


const myRecipeList = props => {
  const {cities, onRemovemyCities, loaded} = props;
  console.log('myRecipe-list', cities);
  return (
    <Fragment>
      {loaded ? (
        <div className="myCity-list">
          <p>{cities.length === 1 ? `You have only ${cities.length} favorites city` : cities.length > 1 ? `You have ${cities.length} favorites cities` : "you do not have a favorite city"}</p>
          <ListGroup>
            {cities.map((city, index) => {

                return <ListGroupItem
                  key={index}
                  className="text-center">
                  {city.weather[0].main === "Rain" ?
                    <img
                      src={"//ssl.gstatic.com/onebox/weather/48/rain_light.png"}
                      alt="recipe-pic"/>
                    : <img
                      src={"//ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"}
                      alt="recipe-pic"/>}
                  <p>
                    {city.sys.country + "/" + city.name}
                  </p>
                  <p>{city.main.temp}C</p>
                  <p>{city.weather[0].description}</p>
                  <p>today the minimum temperature:{city.main.temp_min}</p>
                  <p>today the maximum temperature:{city.main.temp_max}</p>

                  <Button
                    style={{marginBottom: "10px"}}
                    color="danger"
                    onClick={() => onRemovemyCities(city)}>
                    Remove From Favorite List
                  </Button>

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

export default myRecipeList;