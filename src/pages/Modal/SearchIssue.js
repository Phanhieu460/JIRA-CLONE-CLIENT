import { Drawer, Input } from 'antd'
import styled  from 'styled-components'
import { SearchOutlined } from '@ant-design/icons'
import React from 'react'

const SearchIssue = (props) => {
  const search = <StyledContainer>
  <SearchOutlined />
    <StyledInput placeholder='Search issue by summary, description ...'/>
  </StyledContainer>
  return (
    <Drawer
        title={search}
        placement='left'
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
  )
}

export default SearchIssue


const StyledContainer = styled.div`
  position: relative;
  .anticon-search {
    position: absolute;
    left: 2%;
    top: 8px;
    z-index: 1;
  }
`
const StyledInput = styled(Input)`
  border-top: none;
  border-left: none;
  border-right: none;
  padding-left: 30px;
`