import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
// import MusicCard from '../components/MusicCard';
// // import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as api from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
    };
    this.recoverFavoriteSongs = this.recoverFavoriteSongs.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.recoverFavoriteSongs();
  }

  recoverFavoriteSongs() {
    this.setState({ loading: true }, async () => {
      const favoriteSongs = await api.getFavoriteSongs();
      this.setState({ loading: false, favoriteSongs });
    });
  }

  remove(track) {
    this.setState({ loading: true }, async () => {
      await api.removeSong(track);
      const favoriteSongs = await api.getFavoriteSongs();
      this.setState({ loading: false, favoriteSongs });
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header path="favorites" />
        {
          loading ? <Loading /> : (
            <ul>
              {
                favoriteSongs.map((track) => (
                  <div key={ track.trackId } className="music-player-preview">
                    <h3 className="song-name">{ track.trackName }</h3>
                    <audio
                      data-testid="audio-component"
                      src={ track.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                    <label htmlFor="favorite-checkbox">
                      Favorita
                      <input
                        data-testid={ `checkbox-music-${track.trackId}` }
                        id="favorite-checkbox"
                        type="checkbox"
                        checked
                        onChange={ () => this.remove(track) }
                      />
                    </label>
                  </div>
                ))
              }
            </ul>
          )
        }
      </div>
    );
  }
}
