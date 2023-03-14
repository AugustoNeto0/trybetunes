import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import Loading from './Loading';
import * as api from '../services/userAPI';
import trybetunesLogo from '../img/trybetunesLogo.png';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    const getName = async () => {
      const { name } = await api.getUser();
      this.setState({
        userName: name,
        loading: false,
      });
    };
    getName();
  }

  render() {
    const { loading, userName } = this.state;
    const { path } = this.props;
    return (
      <Navbar className="mb-3" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              className="secondary-logo"
              src={ trybetunesLogo }
              alt="Trybetunes Logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto" activeKey={ path }>
            <Nav.Link href="search">Busca</Nav.Link>
            <Nav.Link href="favorites">Favoritos</Nav.Link>
            <Nav.Link href="profile">
              { loading ? <Loading size="sm" /> : userName }
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
};
