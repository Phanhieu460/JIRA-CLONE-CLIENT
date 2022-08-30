import { Drawer, Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const SearchIssue = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const search = (
    <StyledContainer>
      <SearchOutlined />
      <StyledInput placeholder="Search issue by summary, description ..." />
    </StyledContainer>
  );
  return (
    <>
      <div onClick={() => setIsOpenDrawer(true)}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <Drawer
        title={search}
        placement="left"
        closable={false}
        onClose={() => setIsOpenDrawer(false)}
        visible={isOpenDrawer}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default SearchIssue;

const StyledContainer = styled.div`
  position: relative;
  .anticon-search {
    position: absolute;
    left: 2%;
    top: 8px;
    z-index: 1;
  }
`;
const StyledInput = styled(Input)`
  border-top: none;
  border-left: none;
  border-right: none;
  padding-left: 30px;
`;
