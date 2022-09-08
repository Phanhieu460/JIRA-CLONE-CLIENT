import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, Select, Col, Row, Avatar } from "antd";
import "antd/dist/antd.min.css";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { createIssue } from "../../../features/Issue/issueSlice";
import { useSelector } from "react-redux";
import { createProject, getProject, reset } from "../../../features/Project/projectSlice";

import { openNotification } from "../../../util/notification";
import { useHistory } from "react-router-dom";
import { getAllUser } from "../../../features/Auth/authSlice";

const { Option } = Select;

const CreateProject = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);
  const { projects, isSuccess, isError, message } = useSelector(
    (state) => state.project
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (isError) {
      openNotification("error", "Error", message);
    }

    if (!user) {
      history.push("/login");
    }

  //   dispatch(getProject());
  //   dispatch(getAllUser());
  //   return () => {
  //     dispatch(reset());
  //   };
  }, []);
  const [form] = Form.useForm();
  const handleClick = (e) => {
    const data = {
      name,
      description,
      url,
      category
    };
    dispatch(createProject(data));
    setIsOpenModal(false);
    form.resetFields();
    dispatch(getProject());
  };

  return (
    <>
    <Button style={{margin: "24px 0px 16px"}} onClick={() => setIsOpenModal(true)} type="primary">Create Project</Button>
      <Modal
        style={{ top: "50px" }}
        width={700}
        title="Create Project"
        visible={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="URL"
          name="url"
          rules={[
            {
              required: true,
              message: "Please input your url!",
            },
          ]}
        >
          <Input name='url' value={url} onChange={(e) => setUrl(e.target.value)}/>
        </Form.Item>

          <Form.Item label="Description" name='description'>
            <Editor 
            name="description"
            init={{
                height: 150,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            value={description}
            onEditorChange={(content)=>{
              setDescription(content)
            }}
            />
          </Form.Item>

        <Form.Item label='Project Category' name='projectcategory'>
          <Select
          name="category"
            value={category}
            onChange={(e) => setCategory(e)}
            style={{
              float: 'left',
              width: '100%',
            }}
          >
            <Option value="software">Software</Option>
            <Option value="marketing">Marketing</Option>
            <Option value="business">Business</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary"  onClick={handleClick}>
            Save 
          </Button>
          <Button type='default' style={{marginLeft: 10}}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default CreateProject;
