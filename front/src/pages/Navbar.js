import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Menu } from 'antd';
import './styles/antStyle.less';


import LogInNavItem from './LogInNavItem.jsx';
import Search from './Search.jsx';

export default function NavBar({ user, onUserChange }) {
  return (
    <Row>
      {/* Brand */}
      <Col xs={14} sm={12} md={10} lg={8} xl={6}>
        <div className="brand">Home Finder</div>
      </Col>

      {/* Menu */}
      <Col xs={4} sm={2} md={2} lg={6} xl={6}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/properties">Properties</NavLink>
          </Menu.Item>
          {/* <Menu.Item key="3">
            <AboutModal />
          </Menu.Item> */}
        </Menu>
      </Col>

      {/* search bar */}
      <Col className="search-bar" xs={0} sm={4} md={6} lg={6} xl={6}>
        <div className="search">
          <Search />
        </div>
      </Col>

      <Col className="sign-in" xs={6} sm={6} md={6} lg={4} xl={6}>
        <LogInNavItem user={user} onUserChange={onUserChange} />
      </Col>
    </Row>
  );
}