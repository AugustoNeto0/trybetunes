import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
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
    this.recoverUser = this.recoverUser.bind(this);
  }

  componentDidMount() {
    this.recoverUser();
  }

  async recoverUser() {
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
        <Header path="/profile" />
        {
          loading ? <Loading /> : (
            <div className="profile-container">
              <ListGroup variant="flush">
                <ListGroup.Item className="user-info-item">
                  <p className="user-info-title">Usuário</p>
                  <p className="user-info">{userData.name}</p>
                </ListGroup.Item>
                <ListGroup.Item className="user-info-item">
                  <p className="user-info-title">Email</p>
                  <p className="user-info">{userData.email}</p>
                </ListGroup.Item>
                <ListGroup.Item className="user-info-item">
                  <p className="user-info-title">Descrição</p>
                  <p className="user-info">{userData.description}</p>
                </ListGroup.Item>
              </ListGroup>
              <Button
                className="edit-button"
                variant="light"
                type="button"
                href="/profile/edit"
              >
                Editar perfil
              </Button>
            </div>
          )
        }
      </div>
    );
  }
}
