import React, { useState, useEffect } from "react";
import { Button, Form, Input, Checkbox, notification } from "antd";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register, reset } from "../../features/Auth/authSlice";
import { openNotification } from "../../util/notification";
import Spinner from "../../components/templates/Spinner/Spinner";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    password2: "",
    fullName:""
  });
  const { email, password, password2, fullName } = dataRegister;
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      openNotification("error", "Error", message);
    }

    if (isSuccess) {
      history.push("/project");
    }

    dispatch(reset());
  }, [user]);

  const handleChange = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };
  const onFinish = (e) => {
    if (password !== password2) {
      notification.error({
        description: "Passwords do not match",
        message: "Notification",
      });
    } else {
      const userData = {
        email,
        password,
        fullName
      };

      dispatch(register(userData));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (isLoading) {
    <Spinner />;
  }
  return (
    <StyledContainer>
      <StyledForm
        name="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ flex: "1 0 100%", maxWidth: 400, width: "100%", padding: 60 }}
      >
        <p className="form-title">Sign up for an account</p>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Please input your fullname!" }]}
        >
          <Input
            placeholder="Enter your full name"
            name="fullName"
            value={fullName}
            onChange={handleChange}
          />
        </Form.Item>
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
        <Form.Item
          name="password2"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Enter the password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Register
          </StyledButton>
          <StyledButtonGoogle type="default" htmlType="submit">
            <img
              style={{ height: 18, width: 18 }}
              src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.347/static/media/google-logo.e086107b.svg"
              alt="google"
            />

            <span>Login With Google</span>
          </StyledButtonGoogle>
          <div>
            Do you already have an account ?{" "}
            <NavLink to="/login">Log In</NavLink>
          </div>
        </Form.Item>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;

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

  #register-form .ant-form-item-label > label.ant-form-item-required::before {
    display: none;
  }
  #register-form_username {
    height: 32px;
  }
  #register-form .ant-btn {
    height: 42px;
    letter-spacing: 1px;
    border-radius: 6px;
  }

  @media screen and (max-width: 1023px) {
    #register-form {
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
