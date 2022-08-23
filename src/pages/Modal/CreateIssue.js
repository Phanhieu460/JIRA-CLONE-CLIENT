import React, {useState} from "react";
import { Modal, Form, Button, Input, Select, Col, Row } from "antd";
import "antd/dist/antd.min.css";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import issueApi from "../../api/issueApi";

const { Option } = Select;

const CreateIssue = (props) => {
  const [title, setTitle] = useState('')
  const handleChange = (e) => {
    setTitle({
      ...title,
      [e.target.name]: [e.target.value]
    })
  }
  const handleCreate = () => {
    try {
      const issueData = {
title
      }
      issueApi.create(issueData)
    } catch (error) {
      
    }
  }
  return (
    <Modal
    style={{top: '50px'}}
      width={700}
      title="Create Issue"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleCreate}>
          Create Issue
        </Button>,
        <Button key="back" onClick={props.handleCancel}>
          Cancel
        </Button>,
      ]}
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
        {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              label="Project"
              name="project"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select defaultValue="software">
                <Option value="software">Software</Option>
                <Option value="marketing">Marketing</Option>
                <Option value="business">Business</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              label="Issue Type"
              name="issueType"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                defaultValue="software"
                style={{
                  float: "left",
                }}
              >
                <Option value="software">Software</Option>
                <Option value="marketing">Marketing</Option>
                <Option value="business">Business</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div style={{ border: "1px solid rgb(223, 225, 230)" }}></div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input name="title" value={title} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <Select defaultValue="backlog">
                <Option value="backlog">BACKLOG</Option>
                <Option value="selected">SELECTED FOR DEVELOPMENT</Option>
                <Option value="inprogress">IN PROGRESS</Option>
                <Option value="done">DONE</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Priority" name="priority">
              <Select name="priority">
                <Option value={"High"}>High</Option>
                <Option value={"Medium"}>Medium</Option>
                <Option value={"Low"}>Low</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Description" name="descriptionIssue">
              <Editor
                name="descriptionIssue"
                initialValue="<p>A Jira clone app built with ReactJS</p>"
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
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item label="Assignee" name="assignee">
              <Select defaultValue="human1">
                <Option value="human1">Human 1</Option>
                <Option value="human2">human 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Reporter" name="reporter" rules={[{required: true}]}>
              <Select>
                <Option value="human1">Human 1</Option>
                <Option value="human2">human 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateIssue;
