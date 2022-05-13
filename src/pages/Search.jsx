import React, { Component } from 'react';
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
          <Header />
        </div>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchInput }
            placeholder="Nome Do Artista"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
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
