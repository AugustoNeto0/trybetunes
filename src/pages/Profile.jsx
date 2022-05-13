import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as api from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userData: {},
    };
  }

  async componentDidMount() {
    const userData = await api.getUser();
    this.setState({
      loading: false,
      userData,
    });
  }

  render() {
    const { loading, userData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <div className="profile-container">
              <Link
                to={ {
                  pathname: '/profile/edit',
                  state:
                { userData },
                } }
              >
                <button type="button">
                  Editar perfil
                </button>
              </Link>
              <div className="profile-data">
                <h3>Usuário</h3>
                <h5>{userData.name}</h5>
                <h3>Email</h3>
                <h5>{userData.email}</h5>
                <h3>Descrição</h3>
                <h5>{userData.description}</h5>
                <img
                  src={ userData.image }
                  alt={ userData.name }
                  data-testid="profile-image"
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
