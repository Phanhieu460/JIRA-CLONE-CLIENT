import { Modal, Row, Col, Form, Button, Select, Input } from "antd";
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
  const [visibleEditTaskName, setVisibleEditTaskName] = useState(false);
  return (
    <Modal
      width={1000}
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={() => {
        // props.handleCancel
        setVisibleEditTaskName(false);
    }}
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
                    setVisibleEditTaskName(false)
                }}
              >
                <Input
                  type="text"
                  name="name"
                  required="required"
                />
                <Button type="primary" htmlType="submit" className="ml-2">
                <CheckOutlined />
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
                    // setTaskName(props.taskName);
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
          </Col>
          <Col span={8}>
            <div>
              <label> Status</label>
              <Select style={{ width: 150 }} defaultValue="Backlog">
                {listStatus.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            </div>
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
