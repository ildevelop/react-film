import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter ,Button} from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import CitiesList from "../components/CitiesList/CitiesList";
import MyFavorites from "../components/MyFavorites/MyFavorites";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.errorCity
    };
    this.toggle = this.toggle.bind(this);
    this.props.getCitiesAPI();
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.closeModal()
  }

  componentDidUpdate() {
    localStorage.setItem("cities", JSON.stringify(this.props.cities));
  }
  handleSearchCity = value => {
    this.props.searchCities(value);
  };
  handleRemoveMyCities = city => {
    this.props.removeCity(city);
  };
  searchedCity= city => {
    this.props.addCity(city);
  };
   handleAddNewCity = async() => {
     await this.props.getCitiesAPI(this.props.searchValue);
    console.log("handleAddNewCity",this.props.errorCity);
    if(this.props.errorCity){
      this.setState({modal:!this.state.modal})
    }

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
                  onInputChange={this.handleSearchCity}
                  onAddCities={this.searchedCity}
                  onRemoveCities={this.handleRemoveMyCities}
                  onAddNewCity={this.handleAddNewCity}
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
                  onAddToFavemyCities={this.searchedCity}
                />
              );
            }}
          />

        </Switch>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Error input</ModalHeader>
          <ModalBody>
            <p>Please check the correctness of the input</p>
            <p>Most likely entered the wrong city</p>
            <p>Try again to enter the name of the city</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
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
  errorCity: selector.getErrorNewCity(state),



});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));