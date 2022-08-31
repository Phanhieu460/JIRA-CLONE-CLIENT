import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, Row, Col } from "antd";
import "antd/dist/antd.min.css";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getProjectById,
  updateProject,
} from "../../features/Project/projectSlice";
import { useParams } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";

const { Option } = Select;

const ProjectSettings = () => {
  const { project } = useSelector((state) => state.project);
  const params = useParams();
  const [name, setName] = useState(project?.project?.name);
  const [url, setUrl] = useState(project?.project?.url);
  const [description, setDescription] = useState(
    project?.project?.description
  );
  const [category, setCategory] = useState(project?.project?.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectById(params.id));
  }, []);

  useEffect(() => {
    if (!project) return;
    setName(project?.project?.name);
    setUrl(project?.project?.url);
    setDescription(project?.project?.description);
    setCategory(project?.project?.category);
  }, [project]);

  const handleSubmit = () => {
    const dataProject = {
      name,
      url,
      description,
      category,
    };
    const data = {
      dataProject,
      params,
    };
    dispatch(updateProject(data));
  };
  const [form] = Form.useForm();
  
  return (
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
        remember: true
      }}
      autoComplete="off"
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <Form.Item
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <Form.Item
            label="URL"
            rules={[
              {
                required: true,
                message: "Please input your url!",
              },
            ]}
          >
            <Input
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <Form.Item label="Description">
            <Editor
              name="description"
              init={{
                height: 150,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              value={description}
              onEditorChange={(content) => {
                setDescription(content);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <Form.Item label="Project Category">
            <Select
              name="category"
              value={category}
              onChange={(e) => setCategory(e)}
              style={{
                float: "left",
                width: "100%",
              }}
            >
              <Option value="Software">Software</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Business">Business</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
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
  );
};

export default ProjectSettings;
