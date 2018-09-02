import React, {Fragment} from "react";
import {Button, ListGroup, ListGroupItem, Input} from 'reactstrap';
import Loader from '../Loader/Loader';
import './FilmsList.scss'

const filmsList = props => {
  const {value, onRemovefilms, onAddfilms, films, onInputChange, loaded,onAddNewCity} = props;
  return (
    <Fragment>
      {loaded ? (
        <div className="search-list">
          <p>Top {films.length} popular films</p>
          <div className="search-box">
            <div className="search-item">
              <Input
                type="text"
                placeholder="Please, enter a film name"
                value={value}
                onChange={({target}) => onInputChange(target.value)}
              />
              <Button outline color="success" onClick={({target})=> onAddNewCity(target.value)}>  ADD A NEW</Button>
            </div>
          </div>

          <ListGroup>
            {films.map((film, index) => {

                return <ListGroupItem
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
                  {!film.isFavorites ? (
                    <Button
                      style={{marginBottom: "10px"}}
                      color="success"
                      onClick={() => onAddfilms(film)}>
                      Add To List
                    </Button>
                  ) : (
                    <Button
                      style={{marginBottom: "10px"}}
                      color="danger"
                      onClick={() => onRemovefilms(film)}>
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

export default filmsList;