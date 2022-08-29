import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select } from "antd";
import 'antd/dist/antd.min.css';
import {Editor} from '@tinymce/tinymce-react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProjectById, updateProject } from "../../features/Project/projectSlice";
import { useParams } from "react-router-dom";

const { Option } = Select;

const ProjectSettings = () => {
  const params = useParams()
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const {projects} = useSelector(state =>state.project)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProjectById(params.id))
  }, [projects])

  const handleSubmit = () => {
    const dataProject = {
      name, url, description, category
    }
    const data = {
      dataProject, params
    }
    dispatch(updateProject(data))
  }
  console.log(projects, 'projects');
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
          <Input name="name" value={projects?.project?.name} onChange={(e) => setName(e.target.value)} />
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
          <Input name={url} value={url} onChange={(e) => setUrl(e.target.value)}/>
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
            value={description}
            onEditorChange={(content)=>{
              setDescription(content)
            }}
            />
          </Form.Item>

        <Form.Item label='Project Category' name='projectcategory'>
          <Select
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

export default ProjectSettings;
