import React, { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginWithGoogle } from "../../features/Auth/authSlice";
import { useSelector } from "react-redux";
import { openNotification } from "../../util/notification";
import Spinner from "../../components/templates/Spinner/Spinner";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = dataLogin;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      openNotification("error", "Error", message);
    }

    // dispatch(reset());
  }, []);

  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = (e) => {
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    history.push("/project");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (isLoading) {
    <Spinner />;
  }
  // const sendGoogleToken = (tokenId) => {
  //   axios
  //     .get(`http://localhost:1337/user/google`, {
  //       idToken: tokenId,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       // informParent(res);
  //     })
  //     .catch((error) => {
  //       console.log("GOOGLE SIGNIN ERROR", error.response);
  //     });
  // };
  const responseGoogle = () => {
    window.open("http://localhost:1337/user/google/callback", "_blank");
    // sendGoogleToken(response.tokenId)
  };
  return (
    <StyledContainer className="login-page">
      <StyledForm
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ flex: "1 0 100%", maxWidth: 400, width: "100%", padding: 60 }}
      >
        <p className="form-title">Log into your account</p>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="Enter your email address"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Login
          </StyledButton>
          <StyledButtonGoogle onClick={responseGoogle} type="default">
            <img
              style={{ height: 18, width: 18 }}
              src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.347/static/media/google-logo.e086107b.svg"
              alt="google"
            />

            <span>Login With Google</span>
          </StyledButtonGoogle>
          <div>
            Not Register ? <NavLink to="/register">Create an account!</NavLink>
          </div>
        </Form.Item>
      </StyledForm>
      {/* <div>

          <GoogleLogin
            clientId='82385819004-t3jg92vo0fkdka4sklrdrjnv679f5l44.apps.googleusercontent.com'
            buttonText="Login With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
      </div> */}
    </StyledContainer>
  );
};

export default Login;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #d9edff;
  background-image: url(https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.347/static/media/default_left.e74de3ec.svg),
    url(https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.347/static/media/default_right.6ece9751.svg);
  background-repeat: no-repeat, no-repeat;
  background-attachment: fixed, fixed;
  background-size: 368px, 368px;
  background-position: left bottom, right bottom;

  #login-form .ant-form-item-label > label.ant-form-item-required::before {
    display: none;
  }
  .ant-form-item-control-input-content {
    text-align: left;
  }

  #login-form_username {
    height: 32px;
  }
  #login-form .ant-btn {
    height: 42px;
    letter-spacing: 1px;
    border-radius: 6px;
  }

  @media screen and (max-width: 1023px) {
    #login-form {
      max-width: 100%;
    }
  }
`;
const StyledForm = styled(Form)`
  flex: 1 0 100%;
  max-width: 480px;
  width: 100%;
  padding: 60px;
  background-color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  margin: 0 auto;
  border-radius: 12px;
  > p {
    color: #333333;
    font-family: "Josefin Sans", sans-serif;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 3px;
  box-sizing: border-box;
  font-size: inherit;
  font-style: normal;
  font-family: inherit;
  width: 100%;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  color: #fff !important;
  height: 40px !important;
  line-height: 40px !important;
  background: #0052cc !important;
  box-shadow: rgb(0 0 0 / 20%) 1px 1px 5px 0px !important;
`;
const StyledButtonGoogle = styled(Button)`
  border-radius: 3px;
  box-sizing: border-box;
  font-size: inherit;
  font-style: normal;
  font-family: inherit;
  width: 100%;
  margin-top: 10px;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  color: #42526e !important;
  height: 40px !important;
  line-height: 40px !important;
  background: rgb(255, 255, 255) !important;
  box-shadow: rgb(0 0 0 / 20%) 1px 1px 5px 0px !important;
`;
