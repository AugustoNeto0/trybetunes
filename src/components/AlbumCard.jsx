import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PropTypes } from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    const { albumData } = this.props;
    // eslint-disable-next-line no-magic-numbers
    const releaseYear = albumData.releaseDate.slice(0, 4);
    return (
      <a
        className="card-link"
        href={ `/album/${albumData.collectionId}` }
        to={ { state:
        { id: albumData.collectionId,
          artistName: albumData.artistName },
        } }
      >
        <Card className="album-card text-center m-2">
          <Card.Img
            variant="top"
            src={ albumData.artworkUrl100 }
            alt={ albumData.collectionName }
          />
          <Card.Body>
            <Card.Title>{ albumData.collectionName }</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              { `${releaseYear} • ${albumData.artistName}`}
            </ListGroup.Item>
            <ListGroup.Item>{ `${albumData.trackCount} Faixa(s)` }</ListGroup.Item>
          </ListGroup>
        </Card>
      </a>
    );
  }
}

AlbumCard.propTypes = {
  albumData: PropTypes.instanceOf(Object).isRequired,
};
