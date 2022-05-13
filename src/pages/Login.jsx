import React, { Component } from 'react';
// import { Redirect, Link } from 'react-router-dom';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Loading from '../components/Loading';
import * as api from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userName: '',
      validName: false,
      loading: false,
    };
  }

  handleChange({ target }) {
    this.setState(() => ({
      userName: target.value,
    }), () => {
      this.validateLogin();
    });
  }

  handleClick() {
    const { history } = this.props;
    const { userName } = this.state;
    this.setState({ loading: true }, async () => {
      await api.createUser({ name: userName });
      history.push('/search');
    });
  }

  validateLogin() {
    const minChar = 3;
    const { userName } = this.state;
    if (userName.length >= minChar) {
      this.setState({ validName: true });
    } else this.setState({ validName: false });
  }

  render() {
    const { validName, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading />
          : (
            <div className="login-container">
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Insira seu nome"
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                name="enter-button"
                type="button"
                onClick={ this.handleClick }
                disabled={ !validName }
              >
                Entrar
              </button>
            </div>) }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
