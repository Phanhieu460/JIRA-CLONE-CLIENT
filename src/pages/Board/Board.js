import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import {
  CheckSquareTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TagTwoTone,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Card, Row, Col, Avatar, Badge } from "antd";
import ViewDetailIssue from "../Modal/ViewDetailIssue";
import { useSelector } from "react-redux";
import { getIssues, reset, searchIssue } from "../../features/Issue/issueSlice";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { openNotification } from "../../util/notification";
import { getProjectById } from "../../features/Project/projectSlice";
import { getAllUser } from "../../features/Auth/authSlice";
import moment from "moment/moment";

const Board = () => {
  const params = useParams();
  const [dataIssues, setDataIssues] = useState([]);
  const [isOpenModals, setIsOpenModals] = useState(false);
  const [isActive, setIsActive] = useState('')
  const { user, users } = useSelector((state) => state.auth);
  const [issue, setIssue] = useState("");
  const [title, setTitle] = useState("");
  const [showButton, setShowButton] = useState(false);
  const { issues, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.issues
  );
  const { projects } = useSelector((state) => state.project);
  let userLogin;
  if (localStorage.getItem("user")) {
    userLogin = JSON.parse(localStorage.getItem("user"));
  }
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (isError) {
      openNotification("error", "Error", message);
    }

    if (!user) {
      history.push("/login");
    }

    dispatch(getIssues(params.id));
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (!issues) return;
    setDataIssues(issues.result);
  }, [issues]);

  const handleOpenModal = (item) => {
    setIsOpenModals(true);
    setIssue(item);
  };
  const handleOk = () => {
    setIsOpenModals(false);
  };

  const handleCancel = () => {
    setIsOpenModals(false);
  };
  const tasks = [
    { name: "BACKLOG 1", value: "BACKLOG" },
    { name: "SELECTED FOR DEVELOPMENT 2", value: "SELECTED FOR DEVELOPMENT" },
    { name: "INPROGESS 1", value: "IN PROGRESS" },
    { name: "DONE 1", value: "DONE" },
  ];
  const priority = {
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

  const handleChange = (value) => {
    setTitle(value);
    filterData(value);
  };
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();

    // dispatch(searchIssue({ title, id: params.id }));
    // setDataIssues(issues.result);
    const data = issues.result.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedValue)
      );
    });
    setDataIssues(data);
  };
  const handleClick = (data) => {
    const lowercasedValue = data.toLowerCase().trim();

    // dispatch(searchIssue({ title, id: params.id }));
    // setDataIssues(issues.result);
    const dataSearch = issues.result.filter((item) => {
      return Object.keys(item).some((key) =>
        item['assignee'].toString().toLowerCase().includes(lowercasedValue)
      );
    });
    setDataIssues(dataSearch)
    setShowButton(true);
    document.getElementById("buttonOnly").style.cssText =
      "background-color:rgb(210, 229, 254); color: rgb(0,82,204)";
  };
  const handleClickImg = (data) => {
    const lowercasedValue = data.toLowerCase().trim();

    // dispatch(searchIssue({ title, id: params.id }));
    // setDataIssues(issues.result);
    const dataSearch = issues.result.filter((item) => {
      return Object.keys(item).some((key) =>
        item['assignee'].toString().toLowerCase().includes(lowercasedValue)
      );
    });
    setDataIssues(dataSearch)
    setShowButton(true);
    setIsActive(data) 
  };
  const renderIssue = () => {
    return (
      <>
        {tasks?.map((task, index) => {
          return (
            <Row gutter={16} key={index}>
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
                  {issues &&
                    dataIssues?.map((item) => {
                      return (
                        <Fragment key={item.id}>
                          {task.value === item.status && (
                            <div
                              key={item.status}
                              onClick={() => handleOpenModal(item)}
                              style={{
                                marginBottom: 10,
                                padding: 10,
                                borderRadius: 3,
                                background: `${
                                  Date.parse(item.dueDate) <= Date.now()
                                    ? "#DEEBFF"
                                    : "rgb(255,255,255)"
                                }`,
                                cursor: "pointer",
                                boxShadow: "rgb(9 30 66 / 25%) 0px 1px 2px 0px",
                              }}
                            >
                              <p>{item.title}</p>
                              {Date.parse(item.dueDate) <= Date.now() ? (
                                <StyledBadge>
                                  {Date.parse(item.dueDate) <= Date.now() ? (
                                    <ClockCircleOutlined
                                      style={{ color: "#f5222d" }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {moment(item.dueDate).format("D MMM")}
                                  </span>
                                </StyledBadge>
                              ) : (
                                ""
                              )}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <span>{issueType[item.issueType]}</span>
                                  <span>{priority[item.priority]}</span>
                                </div>
                                <div>
                                  <img
                                    style={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: "50%",
                                    }}
                                    alt="avatar"
                                    src={
                                      users?.user?.find((user) => {
                                        return user.fullName === item.assignee;
                                      })?.imgUrl
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Fragment>
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
          <input
            className="search mt-1"
            name="title"
            value={title}
            onChange={(e) => handleChange(e.target.value)}
          />
          <i className="fa fa-search mt-2" />
        </StyledSearch>
        <Avatars>
          <Avatar.Group
            maxCount={3}
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            {user &&
              users?.user?.map((item) => {
                return (
                  <AvatarIsActiveBorder key={item.id}>
                    <StyledAvatar
                    id={item.fullName}
                      className={isActive === item.fullName ? 'active': ''}
                      src={item.imgUrl}
                      name={item.fullName}
                      onClick={() => handleClickImg(item.fullName)}
                    />
                  </AvatarIsActiveBorder>
                );
              })}
          </Avatar.Group>
        </Avatars>
        <StyledButon id="buttonOnly" onClick={() => handleClick(userLogin.newUser.fullName)}>
          Only My Issues
        </StyledButon>
        <StyledButon>Recently Updated</StyledButon>
        {showButton ? (
          <StyledButon
            id="buttonClear"
            onClick={() => {
              setShowButton(false);
              filterData("");
              setIsActive("")
              document.getElementById("buttonOnly").style.cssText =
                "background-color:none; color: none";
            }}
            style={{ borderLeft: "1px solid rgb(223, 225, 230)" }}
          >
            Clear all
          </StyledButon>
        ) : (
          ""
        )}
      </div>
      <div style={{ display: "flex", marginTop: 20 }}>{renderIssue()}</div>

      <ViewDetailIssue
        issue={issue}
        visible={isOpenModals}
        setIsOpenModals={setIsOpenModals}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Board;

const StyledSearch = styled.div`
  position: relative;
  margin-right: 18px;
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
const Avatars = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 0 12px 0 2px;
`;
const AvatarIsActiveBorder = styled.div`
  display: inline-flex;
  margin-left: -2px;
  border-radius: 50%;
  transition: transform 0.1s;
  user-select: none;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
  .active {
    box-shadow: 0 0 0 4px #0052cc;
  }
`;
const StyledAvatar = styled(Avatar)`
  box-shadow: 0 0 0 2px #fff;
`;
const StyledBadge = styled(Badge)`
  display: inline-block;
  box-sizing: border-box;
  max-width: 100%;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  vertical-align: baseline;
  background-color: #ffebe6;
  color: #de350b;
  > span:last-child {
    padding: 0px 4px;
  }
`;
