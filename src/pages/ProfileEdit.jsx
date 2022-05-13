import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as api from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userData: {},
      newUser: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
      validFormInput: {
        name: false,
        email: false,
        description: false,
        image: false,
      },
      validButton: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }

  async componentDidMount() {
    const userData = await api.getUser();
    this.setState({
      loading: false,
      userData,
    });
  }

  handleChange({ target }) {
    const { validFormInput, newUser } = this.state;
    const { name, email, description, image } = validFormInput;
    if (target.id === 'name') {
      this.setState({ newUser: {
        ...newUser,
        name: target.value,
      },
      validFormInput: {
        ...validFormInput,
        name: true,
      } });
    } else if (target.id === 'email') {
      this.setState({ newUser: {
        ...newUser,
        email: target.value,
      },
      validFormInput: {
        ...validFormInput,
        email: true,
      } });
    } else if (target.id === 'description') {
      this.setState({ newUser: {
        ...newUser,
        description: target.value,
      },
      validFormInput: {
        ...validFormInput,
        description: true,
      } });
    } else if (target.id === 'image') {
      this.setState({ newUser: {
        ...newUser,
        image: target.value,
      },
      validFormInput: {
        ...validFormInput,
        image: true,
      } });
    }
    if (name && image && description && email) {
      this.setState({
        validButton: true,
      });
    }
  }

  update() {
    this.setState({ loading: true });
    const { newUser } = this.state;
    api.updateUser(newUser).then(this.setState({ redirect: true }));
  }

  render() {
    const { loading, userData, validButton, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          {
            redirect
              ? <Redirect to="/profile" />
              : ''
          }
          {loading ? <Loading />
            : (
              <form>
                <label htmlFor="name-input">
                  Nome
                  <input
                    name="name-input"
                    id="name"
                    defaultValue={ userData.name }
                    type="text"
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email-input">
                  E-mail
                  <input
                    name="email-input"
                    id="email"
                    defaultValue={ userData.email }
                    type="text"
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="description-input">
                  Descrição
                  <input
                    name="description-input"
                    id="description"
                    defaultValue={ userData.description }
                    type="text"
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="image-input">
                  Imagem
                  <input
                    name="image-input"
                    id="image"
                    defaultValue={ userData.image }
                    type="text"
                    data-testid="edit-input-image"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  onClick={ this.update }
                  disabled={ !validButton }
                >
                  Salvar
                </button>
              </form>
            )}
        </div>
      </div>
    );
  }
}
