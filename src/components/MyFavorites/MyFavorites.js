import React, {Fragment} from "react";
import {ListGroup, ListGroupItem, Button} from "reactstrap";

import Loader from "../Loader/Loader";


const myRecipeList = props => {
  const {films, onRemovemyfilms, loaded} = props;
  return (
    <Fragment>
      {loaded ? (
        <div className="myCity-list">
          <p>{films.length === 1 ? `You have only ${films.length} favorites film` : films.length > 1 ? `You have ${films.length} favorites films` : "you do not have a favorite film"}</p>
          <ListGroup>
            {films.map((film, index) => {

                return  <ListGroupItem
                  key={index}
                  className="text-center">
                  {film.Poster?
                    <img
                      src={film.Poster}
                      alt="film-pic"/>
                    : <img
                      src={"//ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"}
                      alt="film-pic"/>}
                  <p>
                    {film.Title+ "/" + film.Year}
                  </p>
                  <p>Actors:{film.Actors}</p>
                  <p>Descriptions:{film.Plot}</p>
                  {film.Ratings.length>1?
                    <p>Ratings:{film.Ratings[0].Value}</p>:null
                  }
                  <Button
                    style={{marginBottom: "10px"}}
                    color="danger"
                    onClick={() => onRemovemyfilms(film)}>
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