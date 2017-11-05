import React from 'react';
import { Breadcrumb, Spin } from 'antd';
import { connectApp } from 'ayano-react'
import './NaviHeader.scss';

class NaviHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="navi-header">
        <Breadcrumb>
          <Breadcrumb.Item><a href="">我的应用</a></Breadcrumb.Item>
          <Breadcrumb.Item> <Spin></Spin> </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

export default NaviHeader;
