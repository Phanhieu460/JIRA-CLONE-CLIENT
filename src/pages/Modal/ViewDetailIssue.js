import { Modal, Row, Col, Form, Button, Select, Input, Avatar } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckOutlined,
  CheckSquareTwoTone,
  TagTwoTone,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteIssue, updateIssue } from "../../features/Issue/issueSlice";
import { useSelector } from "react-redux";
import { updateProject } from "../../features/Project/projectSlice";
import { NavLink, Route, useLocation } from "react-router-dom";

const { Option } = Select;
const ViewDetailIssue = (props) => {
  const { issue, visible, setIsOpenModals } = props;

  const listStatus = [
    "Backlog",
    "Selected For Development",
    "In Progress",
    "Done",
  ];
  const [issueName, setIssueName] = useState(issue.name);
  const [commentContent, setCommentContent] = useState("");
  const [description, setDescription] = useState(issue.description);
  const [status, setStatus] = useState('');
  // const [assignee, setAssignee] = useState('');
  // const [reporter, setReporter] = useState(issue.reporter);
  const [priority, setPriority] = useState('');

  const [visibleEditTaskName, setVisibleEditTaskName] = useState(false);
  let userLogin = {
    login: "Account",
    imageUrl: "",
  };
  if (localStorage.getItem("user")) {
    userLogin = JSON.parse(localStorage.getItem("user"));
  }
  const prioritys = {
    High: <ArrowUpOutlined style={{ color: "rgb(205, 19, 23)" }} />,
    Medium: <ArrowUpOutlined style={{ color: "rgb(233, 127, 51)" }} />,
    Low: <ArrowDownOutlined style={{ color: "rgb(45, 135, 56)" }} />,
  };

  const issueType = {
    Task: <CheckSquareTwoTone style={{ paddingRight: 5 }} />,
    Epic: (
      <TagTwoTone
        twoToneColor={"rgb(101, 186, 67)"}
        style={{ paddingRight: 5 }}
      />
    ),
  };
  const dispatch = useDispatch();
  const handleOk = () => {
    const data = {
      issueName,
      description,
      priority, status
    };
    dispatch(updateIssue(data, issue.id));
    setIsOpenModals(false);
  };
  return (
    <Modal
      width={1000}
      visible={visible}
      onOk={handleOk}
      onCancel={() => setIsOpenModals(false)}
      closable={false}
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            {issueType[issue.issueType]}{" "}
            {issue.issueType === "Task" ? "TASK" : "EPIC"} - {issue.id}
          </Col>
          <Col span={8}>
            <StyledListAction>
              <StyledActionItem>
                <i className="fab fa-telegram-plane" />
                <span> Give feedback</span>
              </StyledActionItem>
              <StyledActionItem>
                <i className="fa fa-link" />
                <span> Copy link</span>
              </StyledActionItem>
              <StyledActionItem
                onClick={() => {
                  dispatch(deleteIssue(issue.id));
                  setIsOpenModals(false);
                }}
              >
                <i className="fa fa-trash-alt" />
                <span> Delete</span>
              </StyledActionItem>
            </StyledListAction>
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ paddingTop: 10 }}
        >
          <Col span={16}>
            {/* {visibleEditTaskName ? (
              <form
                className="form-group"
                style={{ display: "flex" }}
                onSubmit={() => {
                  setVisibleEditTaskName(false);
                }}
              >
                <Input
                  type="text"
                  name="issueName"
                  onChange={(e) => setIssueName(e.target.value)}
                  required="required"
                  value={issueName}
                />
                <Button type="primary" htmlType="submit" className="ml-2">
                  OK
                </Button>
              </form>
            ) : (
              <StyledTitle>
                <span>{issue.title}</span>
                <i
                  className="fa fa-edit ml-2"
                  style={{ cursor: "pointer", fontSize: 18, color: "#23B6A4" }}
                  onClick={() => {
                    setVisibleEditTaskName(true);
                  }}
                />
              </StyledTitle>
            )} */}
            <StyledTitle>
              <span>{issue.title}</span>
              {/* <i
                  className="fa fa-edit ml-2"
                  style={{ cursor: "pointer", fontSize: 18, color: "#23B6A4" }}
                  onClick={() => {
                    setVisibleEditTaskName(true);
                  }}
                /> */}
            </StyledTitle>
            <StyledDescription>
              <Editor
                name="descriptionDetail"
                // initialValue="<p>A Jira clone app built with ReactJS</p>"
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
                onEditorChange={(content, editor) => {
                  setDescription(content);
                }}
              />
            </StyledDescription>
            <div className="mt-3" style={{ marginTop: 10 }}>
              <Button
                type="primary"
                onClick={() => {
                  let newDescription = issue?.description;
                  if (description) {
                    newDescription = description;
                  }
                  dispatch(updateIssue(newDescription, issue.id));
                  // dispatch({
                  //     type: UPDATE_TASK_SAGA,
                  //     taskUpdate: { ...task, description: newDescription },
                  // })
                }}
                style={{ marginRight: 5 }}
              >
                Save
              </Button>
              <Button
                className="ml-2"
                style={{ border: "none" }}
                onClick={() => {}}
              >
                Cancel
              </Button>
            </div>
            <div style={{ paddingTop: 40 }}>
              <span style={{ fontSize: 15 }}>Comment</span>
              <div
                className="block-comment mt-4"
                style={{ display: "flex", marginTop: 25 }}
              >
                <div className="avatar" style={{ paadingLeft: 40 }}>
                  {userLogin?.newUser?.imgUrl === "" ||
                  userLogin?.newUser?.imgUrl === null ? (
                    <Avatar icon={<i className="fa fa-user-alt"></i>} />
                  ) : (
                    <Avatar
                      src={userLogin?.newUser?.imgUrl}
                      style={{ width: 40, height: 40 }}
                    />
                  )}
                </div>
                <div
                  className="input-comment"
                  style={{
                    paddingLeft: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Input
                    style={{ height: 35 }}
                    type="text"
                    placeholder="Add a comment..."
                    value={commentContent}
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                  />
                  {/* <p>
                                                <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                <span>press
                                                    <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                    to comment</span>
                                            </p> */}
                  <Button
                    type="primary"
                    style={{ height: 35, marginLeft: 10 }}
                    className="ml-2"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
            {/* <div className="lastest-comment mt-4">
                                        {renderCommnets()}
                                    </div> */}
          </Col>
          <Col span={8}>
            <div>
              <div
                style={{
                  fontWeight: 600,
                  margin: "24px 0px 5px",
                  textTransform: "uppercase",
                  color: "rgb(94, 108, 132)",
                  fontSize: "12.5px",
                }}
              >
                {" "}
                STATUS
              </div>
              <Select
                style={{ width: 150, display: "block" }}
                value={status}
                onChange={(e) => setStatus(e)}
                name="status"
              >
                {listStatus.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 600,
                  margin: "24px 0px 5px",
                  textTransform: "uppercase",
                  color: "rgb(94, 108, 132)",
                  fontSize: "12.5px",
                }}
              >
                {" "}
                ASSIGNEE
              </div>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  background: "rgb(235, 236, 240)",
                }}
              >
                {issue.assignee}
              </span>
              <Button style={{ border: "none" }}>+ ADD MORE</Button>
            </div>
            <div style={{ display: "inline-block" }}>
              <div
                style={{
                  fontWeight: 600,
                  margin: "24px 0px 5px",
                  color: "rgb(94, 108, 132)",
                  fontSize: "12.5px",
                }}
              >
                {" "}
                REPORTER
              </div>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  background: "rgb(235, 236, 240)",
                }}
              >
                {issue.reporter}
              </span>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 600,
                  margin: "24px 0px 5px",
                  textTransform: "uppercase",
                  color: "rgb(94, 108, 132)",
                  fontSize: "12.5px",
                }}
              >
                {" "}
                PRIORITY
              </div>
              <Select
                style={{ width: 150, display: "block", border: "none" }}
                value={priority}
                onChange={(e) => setPriority(e)}
                name="priority"
              >
                <Option value="High">{prioritys["High"]} High</Option>
                <Option value="Medium">{prioritys["Medium"]} Medium</Option>
                <Option value="Low">{prioritys["Low"]} Low</Option>
              </Select>
            </div>
            <div
              style={{
                marginTop: 11,
                paddingTop: 13,
                lineHeight: 22,
                borderTop: "1px solid rgb(223, 225, 230)",
                color: "rgb(94, 108, 132)",
                fontSize: 13,
              }}
            ></div>
            <div style={{ color: "#929398" }}>Create at a month ago</div>
            <div style={{ color: "#929398" }}>Update at a few seconds ago</div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ViewDetailIssue;

const StyledListAction = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledActionItem = styled.div`
  cursor: pointer;
`;
const StyledTitle = styled.div`
  > span {
    font-weight: 600;
    font-size: 24px;
  }
`;
const StyledDescription = styled.div``;
