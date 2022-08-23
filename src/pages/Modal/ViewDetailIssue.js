import { Modal, Row, Col, Form, Button, Select, Input, Avatar } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import { CheckOutlined } from "@ant-design/icons";

const { Option } = Select;
const ViewDetailIssue = (props) => {
  const listStatus = [
    "Backlog",
    "Selected For Development",
    "In Progress",
    "Done",
  ];
  const [issueName, setIssueName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const test = [
    { name: "Status", items: listStatus },
    { name: "Assignee", items: ["Human 1", "Human 2"] },
  ];
  const [visibleEditTaskName, setVisibleEditTaskName] = useState(false);
  let userLogin = {
    login: "Account",
    imageUrl: "",
  };
  return (
    <Modal
      width={1000}
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
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
          <Col span={16}></Col>
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
              <StyledActionItem>
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
            {visibleEditTaskName ? (
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
                <span>Task Name</span>
                <i
                  className="fa fa-edit ml-2"
                  style={{ cursor: "pointer", fontSize: 18, color: "#23B6A4" }}
                  onClick={() => {
                    setVisibleEditTaskName(true);
                  }}
                />
              </StyledTitle>
            )}

            <StyledDescription>
              <Editor
                name="descriptionDetail"
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
            </StyledDescription>
            <h6>Comment</h6>
            <div className="block-comment mt-4" style={{ display: "flex" }}>
              <div className="avatar">
                {userLogin.imageUrl === "" || userLogin.imageUrl === null ? (
                  <Avatar icon={<i className="fa fa-user-alt"></i>} />
                ) : (
                  <Avatar
                    src={userLogin.imageUrl}
                    style={{ width: 40, height: 40 }}
                  />
                )}
              </div>
              <div className="input-comment">
                <Input
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
              </div>
              <div>
                <Button type="primary" style={{ height: 32 }} className="ml-2">
                  Save
                </Button>
              </div>
            </div>
            {/* <div className="lastest-comment mt-4">
                                        {renderCommnets()}
                                    </div> */}
          </Col>
          <Col span={8}>
            <div>
              <label style={{ fontWeight: 600 }}> STATUS</label>
              <Select style={{ width: 150, display: "block" }} name="status">
                {listStatus.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}> ASSIGNEE</label>
              {/* <Select
                style={{ width: 150, display: "block" }}
                name='assignee'
              >
                <Option></Option>>
              </Select> */}
            </div>
            <div>
              <label style={{ fontWeight: 600 }}> REPORTER</label>
              <Select style={{ width: 150, display: "block" }} name="reporter">
                {listStatus.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}> PRIORITY</label>
              <Select style={{ width: 150, display: "block" }} name="priority">
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </div>
            <div
              style={{
                marginTop: 11,
                paddingTop: 13,
                lineHeight: 22,
                borderTop: "1px solid rgb(223, 225, 230)",
                color: 'rgb(94, 108, 132)',
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
