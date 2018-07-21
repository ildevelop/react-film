import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import RecipeList from "../components/RecipeList/RecipeList";
import { Button } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10
    };
  };

  componentDidMount() {
    this.props.getRecipe();
  }

  componentDidUpdate() {
    localStorage.setItem("recipes", JSON.stringify(this.props.recipes));
  }
  handleSearchUser = value => {
    this.props.searchUser(value);
  };


  page = page => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    const {recipes, loaded,searchValue,searchedUsers} = this.props;
    const {itemsPerPage, currentPage} = this.state;

    return (
      <Container>
        <Header />
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <RecipeList
                  loaded={loaded}
                  recipes={searchedUsers}
                  value={searchValue}
                  onInputChange={this.handleSearchUser}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  page={this.page}
                />
              );
            }}
          />

        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loaded: selector.getLoadingStatus(state),
  recipe: selector.getRecipe(state),
  recipes: selector.getRecipes(state),
  searchValue:selector.getSearchValue(state),
  searchedUsers: selector.getSearchedRecipe(state),


});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));