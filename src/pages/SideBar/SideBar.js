import React, { useState } from "react";
import styled from "styled-components";
import CreateIssue from "../Modal/CreateIssue";
import { Tooltip } from "antd";
import SearchIssue from "../Modal/SearchIssue";
import ViewDetailIssue from "../Modal/ViewDetailIssue";
import { Redirect } from "react-router-dom";

const SideBar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const handleClick = () => {
    setIsOpenModal(true);
  };
  const handleOk = () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };
  const handleOpenDrawer = () => {
    setIsOpenDrawer(true)
  }
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
  }
  const text = (
    <>
      <div style={{ padding: "24px 56px 20px" }}>
        <img
          style={{ width: "100%" }}
          alt="jira"
          src="https://jira.ivorreic.com/feedback-6db192ab3ed372d1de19e207a9c46fd6.png"
        />
      </div>
      <p>
        This simplified Jira clone is built with React on the front-end and
        Node/TypeScript on the back-end.
      </p>
      <p> Read more on my website or reach out via ivor@codetree.co</p>
      <button
        type="primary"
        style={{
          height: 32,
          color: "#fff",
          backgroundColor: "rgb(0, 82, 204)",
          border: "none",
          padding: "0px 12px",
        }}
      >
        Visit Website
      </button>
      <button
        type="default"
        style={{
          height: 32,
          color: "rgb(66, 82, 110)",
          backgroundColor: "rgb(244, 245, 247)",
          border: "none",
          padding: "0px 12px",
          marginLeft: "5px",
          cursor: "pointer"
        }}
      >
        Github Repo
      </button>
    </>
  );
  return (
    <>
      <StyledSideBar>
        <div className="sidebar-icon">
          <div>
            <i class="fa-brands fa-jira"></i>
          </div>
          <div onClick={handleOpenDrawer}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div onClick={handleClick}>
            <i class="fa-solid fa-plus"></i>
          </div>
          <div>
            <Tooltip placement="rightTop" title={text}>
              <button
                style={{ backgroundColor: "rgb(7,71,166)", border: "none" }}
              >
                <i class="fa-solid fa-circle-question"></i>
              </button>
            </Tooltip>
          </div>
        </div>
      </StyledSideBar>
      <CreateIssue
        visible={isOpenModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <SearchIssue visible={isOpenDrawer} onClose={handleCloseDrawer}/>
    </>
  );
};

export default SideBar;

const StyledSideBar = styled.div`
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgb(7, 71, 166);
  .sidebar-icon {
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    > div .fa-jira {
      margin: 20px 0px 20px;
      font-size: 30px;
    }
    > div i {
      font-size: 20px;
      color: white;
      margin-bottom: 20px;
      font-weight: 700;
      cursor: pointer;
    }
  }
`;
