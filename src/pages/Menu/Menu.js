import React from "react";
import styled from "styled-components";
import {NavLink} from 'react-router-dom'

const Menu = () => {
  return (
    <StyledMenuBar>
      <StyledAccount>
        <StyledAvatar>
          <img
            src="https://jits.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=xxlarge"
            style={{ width: "100%" }}
          />
        </StyledAvatar>
        <StyledInfo>
          <span>Name Project</span>
          <span>Software project</span>
        </StyledInfo>
      </StyledAccount>
      <StyledMenuControl>
        <NavLink
          to="/board"
          style={{ color: "#172B4D" }}
          activeClassName="active font-weight-bold text-primary"
        >
          <div>
            <i className="fa-solid fa-bars-progress"></i>
            <span>Kanban Board</span>
          </div>
        </NavLink>
        <NavLink
          to="/project-settings"
          style={{ color: "#172B4D" }}
          activeClassName="active font-weight-bold text-primary"
        >
          <div>
            <i className="fa-solid fa-gear"></i>
            <span>Project settings</span>
          </div>
        </NavLink>
      </StyledMenuControl>
      <div style={{ borderTop: "1px solid rgb(193, 199, 208)" }}></div>
      <StyledMenuFeature>
        <div>
          <i className="fa-solid fa-shapes"></i>
          <span>Releases</span>
        </div>
        <div>
          <i className="fa-solid fa-filter"></i>
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa-solid fa-file-lines"></i>
          <span>Pages</span>
        </div>
        <div>
          <i className="fa-solid fa-flag"></i>
          <span>Reports</span>
        </div>
        <div>
          <i className="fa-solid fa-cube"></i>
          <span>Components</span>
        </div>
      </StyledMenuFeature>
    </StyledMenuBar>
  );
};

export default Menu;

const StyledMenuBar = styled.div`
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 5%;
`;
const StyledAccount = styled.div`
  display: flex;
  padding: 0% 5%;
  margin-bottom: 10px;
`;

const StyledAvatar = styled.div`
  height: 50px;
  line-height: 50px;
  > img {
    height: 40px;
  }
`;
const StyledInfo = styled.div`
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  
  > span:first-child {
    font-weight: 600;
    font-size: 20px;
  }
  > span:last-child {
    font-size: 14px;
  }
`;

const StyledMenuControl = styled.div`
  padding:  2% 5%;
  >a div{
    margin-bottom: 10px;
    cursor: pointer;
  }
  >a div span{
    margin-left: 12px;
  }
`

const StyledMenuFeature = styled.div`
  margin-top: 8px;
  padding: 0% 5%;
  >div {
    margin-bottom: 15px;
    cursor: pointer;
  }
  >div span {
    margin-left:  12px;
  }
`
