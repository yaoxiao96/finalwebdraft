import React from 'react';
import { Layout } from 'antd';
import './styles/antStyle.less';

import NavBar from './NavBar.jsx';
import Contents from './Contents.jsx';
import UserContext from './UserContext.js';
// import graphQLFetch from './graphQLFetch.js';

const { Header, Content, Footer } = Layout;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.onUserChange = (change) => { this.setState({ user: { ...change } }); };
    this.state = {
      user: { signedIn: false },
      onUserChange: this.onUserChange,
    };
  }

  async componentDidMount() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
      credentials: 'include',
    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn } = result;
    if (signedIn) this.getUser();
  }

  async getUser() {
    const query = `query {
      me {
        name
        email
        avatar
      }
    }`;

    // const data = await graphQLFetch(query);
    // const { name, email, avatar } = data.me;

    // this.setState({
    //   user: {
    //     signedIn: true, name, email, avatar,
    //   },
    // });
  }

  render() {
    const { user, onUserChange } = this.state;

    return (
      <Layout>
        <Header>
          <NavBar user={user} onUserChange={onUserChange} />
        </Header>
        <Content>
          <UserContext.Provider value={this.state}>
            <Contents />
          </UserContext.Provider>
        </Content>
        <Footer>
          Copyright &copy;2020 Created by Yao Xiao
        </Footer>
      </Layout>
    );
  }
}