import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import CitiesList from "../components/CitiesList/CitiesList";
import MyFavorites from "../components/MyFavorites/MyFavorites";


class App extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.getCitiesAPI();
  }

  componentDidUpdate() {
    localStorage.setItem("recipes", JSON.stringify(this.props.recipes));
  }
  handleSearchCities = value => {
    this.props.searchCities(value);
  };
  handleRemoveMyCities = city => {
    console.log('handleRemoveMy',city);
    this.props.removeCity(city);
  };
  handleAddCities= city => {
    console.log('handleAddCities',city);
    this.props.addCity(city);
  };

  page = page => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { loaded,searchValue,searchedCities,myCities} = this.props;

    return (
      <Container>
        <Header />
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <CitiesList
                  loaded={loaded}
                  cities={searchedCities}
                  value={searchValue}
                  onInputChange={this.handleSearchCities}
                  onAddCities={this.handleAddCities}
                  onRemoveCities={this.handleRemoveMyCities}
                />
              );
            }}
          />
          <Route
            path="/MyFavorites"
            render={() => {
              return (
                <MyFavorites
                  loaded={loaded}
                  cities={myCities}
                  onRemovemyCities={this.handleRemoveMyCities}
                  onAddToFavemyCities={this.handleAddCities}
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
  city: selector.getCity(state),
  cities: selector.getCities(state),
  searchValue:selector.getSearchValue(state),
  searchedCities: selector.getSearchedCities(state),
  myCities: selector.getMyCities(state),


});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));