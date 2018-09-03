import React, {Fragment} from "react";
import {Button, ListGroup, InputGroup, ListGroupItem, Input} from 'reactstrap';
import Loader from '../Loader/Loader';
import './FilmsList.scss'

const filmsList = props => {
  const {value,year, onRemovefilms,onClearSearch, onAddfilms, films, onInputChange,onInputChangeYears, loaded, onAddNewFilm} = props;
  return (
    <Fragment>
      {loaded ? (
        <div className="search-list">
          <p>Top {films.length} yours films</p>
          <div className="search-box">
            <div className="search-item">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search film..."
                  value={value}
                  onChange={({target}) => onInputChange(target.value)}
                />
                <Input
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={({target}) => onInputChangeYears(target.value)}
                />
              </InputGroup>
              {value?
                <div className="buttonGroup">
                  <Button color="success" onClick={({target}) => onAddNewFilm(target.value)}> ADD A NEW</Button>
                  <Button color="warning" onClick={() => onClearSearch()}> RESET</Button>
                </div>
              :<div className="buttonGroup">
                  <Button outline color="success" disabled> ADD A NEW</Button>
                  <Button color="warning" onClick={() => onClearSearch()}> RESET</Button>

                </div>
              }
            </div>
          </div>

          <ListGroup>
            {films.length>0?films.map((film, index) => {

                return <ListGroupItem
                  key={index}
                  className="text-center">
                  {film.Poster ?
                    <img
                      src={film.Poster}
                      alt="film-pic"/>
                    : <img
                      src={"//ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"}
                      alt="film-pic"/>}
                  <p>
                    {film.Title + "/" + film.Year}
                  </p>
                  <p>Actors:{film.Actors}</p>
                  <p>Descriptions:{film.Plot}</p>
                  {film.Ratings.length > 1 ?
                    <p>Ratings:{film.Ratings[0].Value}</p> : <p>Initial release:SOON</p>
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
            ):null
            }
          </ListGroup>

        </div>
      ) : <Loader/>}
    </Fragment>
  );
};

export default filmsList;