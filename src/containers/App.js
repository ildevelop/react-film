import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import FilmsList from "../components/FilmsList/FilmsList";
import MyFavorites from "../components/MyFavorites/MyFavorites";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null
    };
    this.toggle = this.toggle.bind(this);
    this.props.initState();
  };

  toggle() {
    this.props.closeModal()
  }

  handleSearchFilm = value => {
    this.props.searchfilms(value);
  };
  handleRemoveMyfilms = film => {
    this.props.removeFilm(film);
  };
  searchedFilm = film => {
    this.props.addFilm(film);
  };
  handleAddNewFilm = () => {
    this.props.getfilmsAPI(this.props.searchValue, this.props.year);
  };

  render() {
    const {loaded, searchValue, searchedfilms, myfilms,year} = this.props;
    return (
      <Container>
        <Header/>
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <FilmsList
                  loaded={loaded}
                  films={searchedfilms}
                  year={year}
                  value={searchValue}
                  onInputChange={this.handleSearchFilm}
                  onInputChangeYears={(year) => this.props.addYear(year)}
                  onClearSearch={() =>this.props.clearSearchData()}
                  onAddfilms={this.searchedFilm}
                  onRemovefilms={this.handleRemoveMyfilms}
                  onAddNewFilm={this.handleAddNewFilm}
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
                  films={myfilms}
                  onRemovemyfilms={this.handleRemoveMyfilms}
                  onAddToFavemyfilms={this.searchedFilm}
                />
              );
            }}
          />

        </Switch>
        <Modal isOpen={this.props.errorFilm} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Error input</ModalHeader>
          <ModalBody>
            <p>Please check the correctness of the input</p>
            <p>we can not find this movie</p>
            <p>Try again to enter the film name or search new one</p>
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
  film: selector.getFilm(state),
  films: selector.getfilms(state),
  searchValue: selector.getSearchValue(state),
  searchedfilms: selector.getSearchedfilms(state),
  myfilms: selector.getMyfilms(state),
  errorFilm: selector.getErrorNewFilm(state),
  year:selector.getYear(state)

});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));