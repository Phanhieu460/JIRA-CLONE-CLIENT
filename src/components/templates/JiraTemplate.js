import React from "react";
import { Route } from "react-router-dom";
import Header from "../../pages/Header/Header";
import Menu from "../../pages/Menu/Menu";
import SideBar from "../../pages/SideBar/SideBar";
import styled from 'styled-components'

const JiraTemplate = (props) => {
  const { Component, ...rest } = props;
  return (
    <Route
      path={rest.path}
      render={(routeProps) => {
        return (
          <StyledContainer>
            <SideBar />
            <Menu />
            <div style={{paddingLeft: 24}}>
              <Header title={rest.title} />
              <Component {...routeProps} />
            </div>
          </StyledContainer>
        );
      }}
    ></Route>
  );
};

export default JiraTemplate;

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 2fr 75%;
`