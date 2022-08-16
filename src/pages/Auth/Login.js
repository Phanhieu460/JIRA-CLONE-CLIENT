import React, {useState} from "react";
import { Button, Form, Input, Checkbox } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Login = () => {
const [dataLogin, setDataLogin] = useState({
    email: '',
    password: ''
})
const {email, password} = dataLogin

const handleChange = (e) => {
    setDataLogin({
        ...dataLogin,
        [e.target.name]: [e.target.value]
    })
}
  const onFinish = (e) => {
    console.log("Success:", dataLogin);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          <Input placeholder="Enter your email address" name='email' value={email} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter password" name="password" value={password} onChange={handleChange}/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <StyledButton
            type="primary"
            htmlType="submit"
          >
            Login
          </StyledButton>
          <div>
            Not Register ? <NavLink to="/register">Create an account!</NavLink>
          </div>
        </Form.Item>
      </StyledForm>
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
  background-image: url(https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.347/static/media/default_left.e74de3ec.svg), url(https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.347/static/media/default_right.6ece9751.svg);
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
    width: 100%
`
