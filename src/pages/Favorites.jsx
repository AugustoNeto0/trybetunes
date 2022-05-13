import React, { Component } from 'react';
import Header from '../components/Header';
// import MusicCard from '../components/MusicCard';
// // import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import * as api from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  // componentDidMount() {
  //   this.recoverFavoriteSongs();
  // }

  // async recoverFavoriteSongs() {
  //   const favoriteSongs = await api.getFavoriteSongs();
  //   this.setState({ favoriteSongs });
  // }

  render() {
    // const { favoriteSongs } = this.state;
    // const favoriteSongsIds = [];
    // favoriteSongs.forEach(({ trackId }) => favoriteSongsIds.push(trackId));
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}
