import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select } from "antd";
import 'antd/dist/antd.min.css';
import {Editor} from '@tinymce/tinymce-react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProjectById, updateProject } from "../../features/Project/projectSlice";
import { useParams } from "react-router-dom";
import { getUserById } from "../../features/Auth/authSlice";

const { Option } = Select;

const Account = () => {
  const params = useParams()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const {user} = useSelector(state => state.auth)
  let userLogin
  if (localStorage.getItem('user')) {
    userLogin = JSON.parse(localStorage.getItem('user'))
  }
  const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(getUserById(userLogin.newUser.id))
//   }, [dispatch])
  
  const handleSubmit = () => {
    console.log(user, 'user');
  }
  return (
    <>
      <Form
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
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="FullName"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your fullname!",
            },
          ]}
        >
          <Input name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)}/>
        </Form.Item>
        <Form.Item
          label="ImageUrl"
          name="imgUrl"
          rules={[
            {
              required: true,
              message: "Please input your url!",
            },
          ]}
        >
          <Input name='imgUrl' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary"  onClick={handleSubmit}>
            Save 
          </Button>
          <Button type='default' style={{marginLeft: 10}}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Account;
