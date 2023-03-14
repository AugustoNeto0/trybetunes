import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

export default class Loading extends Component {
  render() {
    const { size } = this.props;
    return (
      <div className="d-flex justify-content-center" data-testid="loading">
        <Spinner animation="border" size={ size } />
      </div>
    );
  }
}

Loading.propTypes = {
  size: PropTypes.string.isRequired,
};
