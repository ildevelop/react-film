import React, {Fragment} from "react";
import {Button, ListGroup, ListGroupItem, Input} from 'reactstrap';

import Loader from '../Loader/Loader';
// import Pagination from "../Pagination/index";
import {Link} from "react-router-dom";
import './RecipeList.scss'

const recipeList = props => {
  const {value,onRemoveFriend, onAddRecipe, recipes, currentPage, itemsPerPage, onInputChange, page, loaded} = props;
  const startOffset = (currentPage - 1) * itemsPerPage;
  let startCount = 0;

  return (
    <Fragment>
      {loaded ? (
        <div className="search-list">
          <p>last {recipes.length} recipe</p>
          <Input
            type="text"
            placeholder="Please, enter name of recipes or ingredients"
            value={value}
            onChange={({target}) => onInputChange(target.value)}
          />
          <ListGroup>
            {recipes.map((recipe, index) => {
              return index >= startOffset && startCount < itemsPerPage ? ++startCount && (
                <ListGroupItem
                  key={index}
                  className="text-center">
                  {recipe.thumbnail ?
                    <img
                      src={recipe.thumbnail}
                      alt="recipe-pic"/>
                    : <img
                      src={"http://img.recipepuppy.com/560551.jpg"}
                      alt="recipe-pic"/>}
                  <p>
                    {recipe.title}
                  </p>
                  <h3>ingredients:</h3>
                  <p>{recipe.ingredients}</p>
                  {!recipe.isFriend ? (
                    <Button
                      style={{marginBottom: "10px"}}
                      color="success"
                      onClick={() => onAddRecipe(recipe)}>
                      Add To List
                    </Button>
                  ) : (
                    <Button
                      style={{marginBottom: "10px"}}
                      color="danger"
                      onClick={() => onRemoveFriend(recipe)}>
                      Remove From Friend List
                    </Button>
                  )}
                </ListGroupItem>
              ) : (
                null
              );
            })}
          </ListGroup>

        </div>
      ) : <Loader/>}
    </Fragment>
  );
};

export default recipeList;