import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Tabs, Modal, Form, Button, Input, Space, Menu, Dropdown, message,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import graphQLFetch from './graphQLFetch.js';

const { TabPane } = Tabs;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function LogInForm(props) {
  async function onFinish(values) {
    // console.log(values);
    try {
      const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
      const response = await fetch(`${apiEndpoint}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      if (result.signedIn) props.login();
      else message.error(result.message);
    } catch (error) {
      message.error(`Error logging into the app: ${error}`);
    }
  }

  return (
    <Form
      {...layout}
      name="login"
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

function RegisterForm() {
  const [form] = Form.useForm();

  async function onFinish(values) {
    const query = `mutation createUser($user: UserInputs!){
      createUser(user: $user) {
        name
      }
    }`;
    const data = await graphQLFetch(query, { user: values });
    if (data) {
      message.success('Successfully created a new account!');
      form.resetFields();
    }
  }

  return (
    <Form
      {...layout}
      form={form}
      name="register"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default class LogInNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  hideModal() {
    this.setState({
      visible: false,
    });
  }

  async login() {
    this.hideModal();
    const query = `query {
      me {
        name
        email
        avatar
      }
    }`;
    const data = await graphQLFetch(query);
    const { name, email, avatar } = data.me;

    const { onUserChange } = this.props;
    onUserChange({
      signedIn: true, name, email, avatar,
    });
  }

  async logout() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    try {
      await fetch(`${apiEndpoint}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      const { onUserChange } = this.props;
      onUserChange({
        signedIn: false, name: '', email: '', avatar: '',
      });
    } catch (error) {
      message.error(`Error logging out: ${error}`);
    }
  }

  render() {
    const { visible } = this.state;
    const { user } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Button type="link" ghost>
            <NavLink to="/profile">
              Profile
            </NavLink>
          </Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button type="link" onClick={this.logout} ghost>
            Log Out
          </Button>
        </Menu.Item>
      </Menu>
    );

    if (user.signedIn) {
      return (
        <div className="sign-in-nav">
          <Space align="center" size="middle">
            <img src={user.avatar} alt="avatar" />
            <Dropdown overlay={menu} trigger={['click']}>
              <Button ghost>
                {user.name}
                <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </div>
      );
    }
    return (
      <>
        <Button type="link" onClick={this.showModal} ghost>
          Log in | Register
        </Button>
        <Modal
          title="Login/Register"
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Login" key="1">
              <LogInForm login={this.login} />
            </TabPane>
            <TabPane tab="Register" key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </Modal>
      </>
    );
  }
}