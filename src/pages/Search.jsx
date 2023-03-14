import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      searchInput: '',
      searchResult: '',
      artistName: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ searchInput: value }, () => {
      if (value.length > 1) {
        this.setState({
          isButtonDisabled: false,
          artistName: value,
        });
      }
    });
  }

  handleClick() {
    const { artistName } = this.state;
    this.setState({ loading: true,
      searchInput: '' }, async () => {
      const searchApi = await searchAlbumsAPI(artistName);
      this.setState({
        loading: false,
        searchResult: searchApi,
      }, () => {
      });
    });
  }

  render() {
    const { isButtonDisabled,
      loading,
      searchInput,
      searchResult,
      artistName } = this.state;
    return (
      <div>
        <div data-testid="page-search">
          <Header path="search" />
        </div>
        <div
          className="login-container d-flex align-items-center justify-content-center"
        >
          <Form className="my-3">
            <Col className="mx-3">
              <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                Nome
              </Form.Label>
              <Form.Control
                data-testid="search-artist-input"
                type="text"
                id="inlineFormInputName"
                value={ searchInput }
                placeholder="Nome Do Artista"
                onChange={ this.handleChange }
              />
            </Col>
          </Form>
          <Button
            className="justify-self-center"
            variant="primary"
            name="enter-button"
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Buscar
          </Button>
        </div>
        { loading ? <Loading /> : null }
        {
          searchResult.length === 0
            ? <p>Nenhum álbum foi encontrado</p>
            : (
              <div className="albums-container">
                <h3>{ `Resultado de álbuns de: ${artistName}` }</h3>
                { searchResult.map((album, key) => (<AlbumCard
                  key={ key }
                  albumData={ album }
                />)) }
              </div>
            )
        }
      </div>
    );
  }
}
