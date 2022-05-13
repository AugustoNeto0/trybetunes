import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Loading from './Loading';
// import * as api from '../services/userAPI';
import { PropTypes } from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    const { albumData } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${albumData.collectionId}` }
          to={ {
            pathname: `/album/${albumData.collectionId}`,
            state:
            { id: albumData.collectionId,
              artistName: albumData.artistName },
          } }
        >
          <img src={ albumData.artworkUrl100 } alt={ albumData.collectionName } />
        </Link>
        <ul>
          <li>{albumData.artistName}</li>
          <li>{albumData.collectionName}</li>
          <li>{albumData.releaseDate}</li>
          <li>{albumData.trackCount}</li>
        </ul>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albumData: PropTypes.instanceOf(Object).isRequired,
  // artistName: PropTypes.string.isRequired,
  // collectionName: PropTypes.string.isRequired,
  // // collectionPrice: PropTypes.number.isRequired,
  // releaseDate: PropTypes.string.isRequired,
  // trackCount: PropTypes.number.isRequired,
  // artworkUrl100: PropTypes.string.isRequired,
};
