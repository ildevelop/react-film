import React, { Fragment } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

import Loader from "../Loader/Loader";


const myRecipeList = props => {
  const {recipes, onRemovemyRecipe, loaded} = props;
  console.log('myRecipe-list',recipes);
  return (
    <Fragment>
      {loaded ? (
        <div className="myRecipe-list">
          <p>{recipes.length === 1 ? `You have ${recipes.length} myRecipe` : recipes.length > 1 ? `You have ${recipes.length} myRecipes` : "No have yours recipes"}</p>
          <ListGroup>
            {recipes.map((myRecipe, index) =>
              <ListGroupItem
                key={index}>
                {myRecipe.thumbnail ?
                  <img
                    src={myRecipe.thumbnail}
                    alt="recipe-pic"/>
                  : <img
                    src={"http://img.recipepuppy.com/560551.jpg"}
                    alt="recipe-pic"/>}
                <span>
                {myRecipe.title}
                </span>
                <Button
                  color="danger"
                  onClick={() => onRemovemyRecipe(myRecipe)}>
                  Remove
                </Button>

              </ListGroupItem>
            )}
          </ListGroup>
        </div>
      ) : <Loader />}
    </Fragment>
  );
};

export default myRecipeList;