import React from "react";
import styled from "styled-components";
import { Breadcrumb, Dropdown, Avatar, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  let userLogin = {
    login: "Account",
    imageUrl: "",
  };
  const menu = (
    <Menu>
      {/* <Menu.Item key="1" style={{ display: 'flex' }}>
          <NavLink to="/account">
              <div><i className="fa fa-user"></i><span className="ml-3">Account</span></div>
          </NavLink>
      </Menu.Item> */}

      <Menu.Item key="2">
        <NavLink to="/login">
          <div>
            <i className="fa fa-sign-out-alt"></i>
            <span className="ml-2 pl-1">Logout</span>
          </div>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  return (
    <StyledContainer>
      <div>

      <Breadcrumb>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/">JIRA-CLONE</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/">{props.title}</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2>{props.title}</h2>
      </div>

      <div style={{position: 'fixed', right: 24}}>
        <Dropdown overlay={menu}>
          {/* <Button icon={<Avatar src="https://joeschmoe.io/api/v1/random" style={{ width: 30, height: 30 }} />} style={{ padding: '0px 6px', height: 36 }}>
            <span></span><DownOutlined />
        </Button> */}
          <div>
            <i>
              {userLogin.imageUrl === "" || userLogin.imageUrl === null ? (
                <Avatar icon={<i className="fa fa-user-alt"></i>} />
              ) : (
                <Avatar
                  src={userLogin.imageUrl}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </i>
            <span className="ml-2 p-1">
              {userLogin.login.toLocaleUpperCase()}
            </span>
          </div>
        </Dropdown>
      </div>
    </StyledContainer>
  );
};

export default Header;

const StyledContainer = styled.div`
  padding: 2% 0%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
