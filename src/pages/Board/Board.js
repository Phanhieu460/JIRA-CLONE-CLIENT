import React, { useState } from "react";
import styled from "styled-components";
import { CheckSquareOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import ViewDetailIssue from "../Modal/ViewDetailIssue";

const Board = () => {
  const [isOpenModals, setIsOpenModals] = useState(false);
  const handleClick = () => {
    setIsOpenModals(true);
  };
  const handleOk = () => {
    setIsOpenModals(false);
  };

  const handleCancel = () => {
    setIsOpenModals(false);
  };
  const tasks = [
    {
      name: "BACKLOG 1",
      items: [
        {
          title: "dsdsdsdsds",
        },
      ],
    },
    {
      name: "SELECTED FOR DEVELOPMENT 2",
    },
    {
      name: "INPROGESS 1",
    },
    {
      name: "DONE 1",
    },
  ];

  const renderIssue = () => {
    return (
      <>
        {tasks?.map((task, index) => {
          return (
            <Row
              gutter={16}
            >
              <Col span={4}>
                <StyledCard
                  key={index}
                  title={task.name}
                  style={{
                    width: 230,
                    margin: "0px 5px",
                    minHeight: 400,
                    background: "rgb(244, 245, 247)",
                  }}
                >
                  {task?.items?.map((item) => {
                    return (
                      <div
                        onClick={handleClick}
                        style={{
                          padding: 10,
                          borderRadius: 3,
                          background: "rgb(255,255,255)",
                          cursor: "pointer",
                          boxShadow: "rgb(9 30 66 / 25%) 0px 1px 2px 0px",
                        }}
                      >
                        <p>{item.title}</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <CheckSquareOutlined
                              style={{
                                color: "rgb(79, 173, 230)",
                                paddingRight: 5,
                              }}
                            />
                            <span>Id Issue</span>
                          </div>
                          <div>
                            <img
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                              }}
                              alt="avatar"
                              src="https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </StyledCard>
              </Col>
            </Row>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <StyledSearch className="search">
          <input className="search mt-1" />
          <i className="fa fa-search mt-2" />
        </StyledSearch>
        <StyledButon>Only My Issues</StyledButon>
        <StyledButon>Recently Updated</StyledButon>
      </div>
      <div style={{ display: "flex", marginTop: 20 }}>{renderIssue()}</div>
      <ViewDetailIssue
        visible={isOpenModals}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Board;

const StyledSearch = styled.div`
  position: relative;
  > input {
    height: 28px;
    width: 200px;
    background-color: rgb(250, 251, 252);
    border: 2px solid rgb(223, 225, 230);
    border-radius: 3px;
    padding-left: 32px;
  }
  > i {
    position: absolute;
    font-size: 14px;
    left: 5%;
    top: 25%;
    color: #67748b;
  }
`;
const StyledButon = styled.button`
  margin-left: 20px;
  border: none;
  background: none;
  :hover {
    background: whitesmoke;
  }
  cursor: pointer;
`;

const StyledCard = styled(Card)`
  .ant-card-head-title {
    font-size: 12px;
  }
  .ant-card-body {
    padding: 10px;
  }
`;
