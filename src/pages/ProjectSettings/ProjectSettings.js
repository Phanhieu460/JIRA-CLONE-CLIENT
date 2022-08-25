import React, { useEffect } from "react";
import { Form, Button, Input, Select } from "antd";
import 'antd/dist/antd.min.css';
import {Editor} from '@tinymce/tinymce-react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProject } from "../../features/Project/projectSlice";

const { Option } = Select;

const ProjectSettings = () => {
  const {projects} = useSelector(state =>state.project)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProject())
  }, [dispatch])
  console.log(projects);
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
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
          <Input />
        </Form.Item>

          <Form.Item label="Description" name='description'>
            <Editor 
            name="description"
            initialValue="<p>A Jira clone app built with ReactJS</p>"
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
            />
          </Form.Item>

        <Form.Item label='Project Category' name='projectcategory'>
          <Select
            defaultValue="software"
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
          <Button type="primary" htmlType="submit">
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

export default ProjectSettings;
