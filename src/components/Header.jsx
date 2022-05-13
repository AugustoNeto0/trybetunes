import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import * as api from '../services/userAPI';

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
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading />
            : (
              <div className="header-container">
                <p data-testid="header-user-name">
                  { userName }
                </p>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </div>
            )
        }
      </header>
    );
  }
}
