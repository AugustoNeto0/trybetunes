import React, { Component } from 'react';
import Header from '../components/Header';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as api from '../services/userAPI';

export default class ProfileEdit extends Component {
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
    console.log(loading, userData);
    return (
      <div data-testid="page-profile-edit">
        <Header />
      </div>
    );
  }
}
