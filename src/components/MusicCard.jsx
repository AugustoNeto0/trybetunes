import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
// import getMusics from '../services/musicsAPI';
import * as api from '../services/favoriteSongsAPI';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
      album: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const album = await getMusics(id);
    const favoriteSongs = await api.getFavoriteSongs();
    this.setState({ album, favoriteSongs });
  }

  async handleChange(track) {
    this.setState({ loading: true });
    let favoriteSongs = [];
    const hasFavorite = this.checkFavorite(track.trackId);
    if (hasFavorite) {
      await api.removeSong(track);
      favoriteSongs = await api.getFavoriteSongs();
    } else {
      await api.addSong(track);
      favoriteSongs = await api.getFavoriteSongs();
    }
    this.setState({ loading: false, favoriteSongs });
  }

  checkFavorite(id) {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some(({ trackId }) => id === trackId);
  }

  render() {
    const { loading, album } = this.state;
    const tracks = album.slice(1);
    return (
      <div>
        {loading ? <Loading /> : (
          <ul>
            {tracks.map((track) => (
              <div key={ track.trackId } className="music-player-preview">
                <h3 className="song-name">{ track.trackName }</h3>
                <audio data-testid="audio-component" src={ track.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor="favorite-checkbox">
                  Favorita
                  <input
                    data-testid={ `checkbox-music-${track.trackId}` }
                    id={ track.trackId }
                    type="checkbox"
                    checked={ this.checkFavorite(track.trackId) }
                    onChange={ () => this.handleChange(track) }
                  />
                </label>
              </div>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.string.isRequired,
};
