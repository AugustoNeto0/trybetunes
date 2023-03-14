import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
// import Loading from '../components/Loading';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
// import * as api from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { params } = match;
    const { id, artistName } = params;
    this.state = {
      artistName,
      id,
      collectionName: '',
    };
    this.getSongsFromId = this.getSongsFromId.bind(this);
  }

  async componentDidMount() {
    await this.getSongsFromId();
  }

  async getSongsFromId() {
    const { id } = this.state;
    const results = await getMusics(id);
    this.setState({
      artistName: results[0].artistName,
      collectionName: results[0].collectionName });
  }

  render() {
    const { collectionName, artistName, id } = this.state;
    return (
      <div data-testid="page-album">
        <Header path="search" />
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h3 data-testid="album-name">{ collectionName }</h3>
        <MusicCard id={ id } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
