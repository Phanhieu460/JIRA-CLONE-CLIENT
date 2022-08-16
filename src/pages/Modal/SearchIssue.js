import { Drawer } from 'antd'
import React from 'react'

const SearchIssue = (props) => {
  return (
    <Drawer
        title="Basic Drawer"
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