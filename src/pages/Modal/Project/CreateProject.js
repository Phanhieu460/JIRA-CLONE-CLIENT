import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, Select, Col, Row, Avatar } from "antd";
import "antd/dist/antd.min.css";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { createIssue } from "../../../features/Issue/issueSlice";
import { useSelector } from "react-redux";
import { getProject, reset } from "../../../features/Project/projectSlice";

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
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [project, setProject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [reporter, setReporter] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");

  // useEffect(() => {
  //   if (isError) {
  //     openNotification("error", "Error", message);
  //   }

  //   if (!user) {
  //     history.push("/login");
  //   }

  //   dispatch(getProject());
  //   dispatch(getAllUser());
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [dispatch, isSuccess]);
  const [form] = Form.useForm();
  const handleClick = (e) => {
    // const data = {
    //   project,
    //   issueType,
    //   assignee,
    //   reporter,
    //   status,
    //   priority,
    //   description,
    // };
    // dispatch(createIssue(data));
    setIsOpenModal(false);
    form.resetFields();
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
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                 <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
          {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
          </Row> */}

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item label="Lead" name="lead">
                <Select
                  placeholder="Select Lead"
                  value={assignee}
                  onChange={(e) => setAssignee(e)}
                >
                  {user?.user?.map((item) => {
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
            disabled={name && issueType ? false : true}
            onClick={handleClick}
          >
            Create Project
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

export default CreateProject;
