import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter ,Button} from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import FilmsList from "../components/FilmsList/FilmsList";
import MyFavorites from "../components/MyFavorites/MyFavorites";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.errorCity
    };
    this.toggle = this.toggle.bind(this);
    this.props.getfilmsAPI();
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.closeModal()
  }

  componentDidUpdate() {
    localStorage.setItem("films", JSON.stringify(this.props.films));
  }
  handleSearchFilm = value => {
    this.props.searchfilms(value);
  };
  handleRemoveMyfilms = film => {
    this.props.removeFilm(film);
  };
  searchedFilm= film => {
    this.props.addFilm(film);
  };
   handleAddNewFilm = async() => {
     console.log('searchValue',this.props.searchValue);
     await this.props.getfilmsAPI(this.props.searchValue);
    if(this.props.errorCity){
      this.setState({modal:!this.state.modal})
    }

  };

  render() {
    const { loaded,searchValue,searchedfilms,myfilms} = this.props;
    return (
      <Container>
        <Header />
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <FilmsList
                  loaded={loaded}
                  films={searchedfilms}
                  value={searchValue}
                  onInputChange={this.handleSearchFilm}
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Error input</ModalHeader>
          <ModalBody>
            <p>Please check the correctness of the input</p>
            <p>Most likely entered the wrong film</p>
            <p>Try again to enter the name of the film</p>
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
  searchValue:selector.getSearchValue(state),
  searchedfilms: selector.getSearchedfilms(state),
  myfilms: selector.getMyfilms(state),
  errorFilm: selector.getErrorNewFilm(state),



});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));