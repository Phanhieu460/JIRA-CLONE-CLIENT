import React,{useEffect} from "react";
import styled from "styled-components";
import { Breadcrumb, Avatar, Menu, Popover } from "antd";
import {  NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById, logout, reset } from "../../features/Auth/authSlice";
import { getProjectById } from "../../features/Project/projectSlice";
import { useSelector } from "react-redux";

const Header = (props) => {
  const params = useParams()
  const {project} = useSelector(state => state.project)
  const {user} = useSelector(state => state.auth)

  let userLogin = {
    fullName: "Account",
    imgUrl: "",
  };
  if (localStorage.getItem("user")) {
    userLogin = JSON.parse(localStorage.getItem('user'))
  }
  
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserById(userLogin.newUser.id))
    dispatch(getProjectById(params.id))
  }, [])
  

  const handleClick = () => {
    dispatch(logout());
    // dispatch(reset())
    history.push('/login')
  };

  const content = (
    <Menu className="test">
      <Menu.Item key="1" style={{ display: 'flex' }}>

              <NavLink to="/account"><i className="fa fa-user"></i><span className="ml-3">Account</span></NavLink>

      </Menu.Item>

      <Menu.Item key="2"  >
          <div onClick={handleClick}>
            <i className="fa fa-sign-out-alt"></i>
            <span className="ml-2 pl-1">Logout</span>
          </div>
      </Menu.Item>
    </Menu>
  );
  const title = (
    <div>
      <span style={{fontSize: 14, display: 'block'}}>Signed in as</span>
      <strong>{userLogin.newUser ? userLogin?.newUser?.fullName : userLogin.fullName}</strong>
    </div>
  );
  return (
    <StyledContainer>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item><a href="/project">Projects</a></Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href={`/project/${project?.project?.id}/board`}>{project?.project?.name}</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">{props.title}</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2>{props.title}</h2>
      </div>

      <div style={{ position: "fixed", right: 24 }}>
        <Popover
          content={content}
          title={title}
          placement="bottomRight"
          trigger="click"
        >
          {user?.user?.imgUrl === "" || user?.user?.imgUrl === null ? (
            <Avatar icon={<i className="fa fa-user-alt"></i>} />
          ) : (
            <Avatar
              src={user?.user?.imgUrl}
              style={{ width: 40, height: 40, cursor: "pointer" }}
            />
          )}
        </Popover>
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
  > div nav ol {
    padding-inline-start: 0px;
  }
`;

