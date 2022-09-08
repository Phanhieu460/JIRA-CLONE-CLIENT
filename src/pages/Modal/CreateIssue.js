import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, Select, Col, Row, Avatar } from "antd";
import "antd/dist/antd.min.css";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { createIssue, getIssues } from "../../features/Issue/issueSlice";
import { useSelector } from "react-redux";
import { getProject, reset } from "../../features/Project/projectSlice";

import { openNotification } from "../../util/notification";
import { useHistory, useParams } from "react-router-dom";
import { getAllUser } from "../../features/Auth/authSlice";

const { Option } = Select;

const CreateIssue = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { users, user } = useSelector((state) => state.auth);
  const { projects, isSuccess, isError, message } = useSelector(
    (state) => state.project
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [project, setProject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [reporter, setReporter] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isError) {
      openNotification("error", "Error", message);
    }

    if (!user) {
      history.push("/login");
    }

    dispatch(getProject());
    dispatch(getAllUser());
    // return () => {
    //   dispatch(reset());
    // };
  }, [dispatch, history, isSuccess, message, isError]);
  const [form] = Form.useForm();
  const handleClick = (e) => {
    const data = {
      project,
      issueType,
      title,
      assignee,
      reporter,
      status,
      priority,
      description,
    };
    dispatch(createIssue(data));
    dispatch(getIssues(params.id));
    setIsOpenModal(false);
    setTitle("");
    setIssueType("");
    form.resetFields();
  };

  return (
    <>
      <div onClick={() => setIsOpenModal(true)}>
        <i className="fa-solid fa-plus"></i>
      </div>
      <Modal
        style={{ top: "50px" }}
        width={700}
        title="Create Issue"
        visible={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form
          form={form}
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
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                <Select
                  placeholder="Select Project"
                  value={project}
                  onChange={(e) => setProject(e)}
                >
                  {projects?.allProject?.map((item) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
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
                  placeholder="Select issue"
                  style={{
                    float: "left",
                  }}
                  value={issueType}
                  onChange={(e) => setIssueType(e)}
                >
                  <Option value="Task">Task</Option>
                  <Option value="Epic">Epic</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div style={{ border: "1px solid rgb(223, 225, 230)" }}></div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select status"
                  value={status}
                  onChange={(e) => setStatus(e)}
                >
                  <Option value="BACKLOG">BACKLOG</Option>
                  <Option value="SELECTED FOR DEVELOPMENT">
                    SELECTED FOR DEVELOPMENT
                  </Option>
                  <Option value="IN PROGRESS">IN PROGRESS</Option>
                  <Option value="DONE">DONE</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Priority" name="priority">
                <Select
                  placeholder="Select priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e)}
                >
                  <Option value="High">High</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Description" name="descriptionIssue">
                <Editor
                  name="descriptionIssue"
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
            <Col span={12}>
              <Form.Item label="Assignee" name="assignee">
                <Select
                  placeholder="Select assignee"
                  value={assignee}
                  onChange={(e) => {
                    setAssignee(e);
                  }}
                >
                  {users?.user?.map((item) => {
                    return (
                      <Option
                        value={item.fullName}
                        key={item.id}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Avatar
                          src={item.imgUrl}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 5,
                            cursor: "pointer",
                          }}
                        />
                        {item.fullName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Reporter" name="reporter">
                <Select
                  placeholder="Select reporter"
                  value={reporter}
                  onChange={(e) => setReporter(e)}
                >
                  {users?.user?.map((item) => {
                    return (
                      <Option
                        value={item.fullName}
                        key={item.id}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Avatar
                          src={item.imgUrl}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 5,
                            cursor: "pointer",
                          }}
                        />
                        {item.fullName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button
            key="submit"
            type="primary"
            disabled={title && issueType && status ? false : true}
            onClick={handleClick}
          >
            Create Issue
          </Button>
          ,
          <Button key="back" onClick={() => setIsOpenModal(false)}>
            Cancel
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateIssue;
