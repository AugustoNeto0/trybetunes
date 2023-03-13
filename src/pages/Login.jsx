import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
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
      <div
        className="h-100 d-flex justify-content-center"
        data-testid="page-login"
      >
        { loading ? <Loading />
          : (
            <div
              className="login-container d-flex align-items-center justify-content-center"
            >
              <Form>
                <Row>
                  <Col className="mx-3">
                    <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                      Nome
                    </Form.Label>
                    <Form.Control
                      data-testid="login-name-input"
                      type="text"
                      id="inlineFormInputName"
                      placeholder="Insira seu nome"
                      onChange={ this.handleChange }
                    />
                  </Col>
                </Row>
              </Form>
              <Button
                className="justify-self-center"
                variant="primary"
                data-testid="login-submit-button"
                name="enter-button"
                type="button"
                onClick={ this.handleClick }
                disabled={ !validName }
              >
                Entrar
              </Button>
            </div>) }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
