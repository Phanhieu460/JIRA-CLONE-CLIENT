import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, Row, Col } from "antd";
import "antd/dist/antd.min.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../features/Auth/authSlice";

const { Option } = Select;

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const [email, setEmail] = useState(user?.user?.email);
  const [fullName, setFullName] = useState(user?.user?.fullName);
  const [imgUrl, setImgUrl] = useState(user?.user?.imgUrl);
  let userLogin;
  if (localStorage.getItem("user")) {
    userLogin = JSON.parse(localStorage.getItem("user"));
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(userLogin.newUser.id));
  }, []);
  useEffect(() => {
    if (!user) return;
    setEmail(user?.user?.email);
    setFullName(user?.user?.fullName);
    setImgUrl(user?.user?.imgUrl);
  }, [user]);
  const handleSubmit = () => {
    const data = {
      fullName,
      imgUrl,
      id: userLogin.newUser.id,
    };
    dispatch(updateUser(data));
    console.log(user, "user");
  };
  const [form] = Form.useForm();
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                disabled
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            <Form.Item
              label="FullName"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            <Form.Item
              label="ImageUrl"
              rules={[
                {
                  required: true,
                  message: "Please input your url!",
                },
              ]}
            >
              <Input
                name="imgUrl"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{ paddingTop: 20 }}
            >
              <Button type="primary" onClick={handleSubmit}>
                Save
              </Button>
              <Button type="default" style={{ marginLeft: 10 }}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Account;
