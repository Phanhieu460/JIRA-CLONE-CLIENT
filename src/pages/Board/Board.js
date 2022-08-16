import React from 'react'
import styled from 'styled-components'

const Board = () => {
    const tasks = [
        {
            name: 'BACKLOG 1'
        },
        {
            name: 'SELECTED FOR DEVELOPMENT 2',
        },
        {
            name: 'INPROGESS 1'
        },
        {
            name: 'DONE 1'
        }
    ]
  return (
    <div>
      <div style={{ display: "flex" }}>
        <StyledSearch className="search">
          <input className="search mt-1" />
          <i className="fa fa-search mt-2" />
        </StyledSearch>
        <div style={{ marginLeft: 20 }}>Only My Issues</div>
        <div style={{ marginLeft: 20 }}>Recently Updated</div>
      </div>
    </div>
  );
}

export default Board

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
  >i {
    position: absolute;
    font-size: 14px;
    left: 5%;
    top: 25%;
    color: #67748b;
  }
`;
