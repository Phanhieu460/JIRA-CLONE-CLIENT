import React from "react";
import styled from "styled-components";
import { Breadcrumb } from "antd";

const Header = (props) => {
  return (
    <StyledContainer>
      <Breadcrumb>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/">JIRA-CLONE</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href='/'>{props.title}</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2>{props.title}</h2>
    </StyledContainer>
  );
};

export default Header;

const StyledContainer = styled.div`
 padding: 2% 0%;
`