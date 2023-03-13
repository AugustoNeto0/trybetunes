import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class Loading extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center" data-testid="loading">
        <Spinner animation="border" />
      </div>
    );
  }
}
