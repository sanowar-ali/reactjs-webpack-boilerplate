import React, { PureComponent } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Input, AutoComplete } from 'antd';
import './Style.less';
import { getUsernameAvatar } from '../../component/UserAvatar';
import classNames from 'classnames';

const { Header } = Layout;
const { SubMenu } = Menu;
export default class LayoutBanner extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      searchMode: false,
      value: '',
      data: ['test'],
    };
  }


  getCollapseIcon = () => {
    if (this.props.collapsed) {
      return (
        <MenuUnfoldOutlined onClick={this.props.handleOnCollapse} className="trigger" />
      );
    }
    return <MenuFoldOutlined onClick={this.props.handleOnCollapse} className="trigger" />;
  };

  

  enterSearchMode = () => {
    this.setState({ searchMode: true, searchTerm: '' }, () => {
      this.input.focus();
    });
  };
  clearSearch = (e) => {
    e.preventDefault();
    this.setState({
      searchMode: false,
      searchTerm: '',
      value: '',
      serverData: [],
    });
  };
 
  
  render() {
  

    var inputClass = classNames({
      'input': true,
      'show': this.state.searchMode
    });

  return (
    <Header className="header" >
      <div>
       
        {window.innerWidth > 800 && this.getCollapseIcon()}
       
      </div>
      <div className="middle">
         <span className="action">KloutCam</span>
      </div>

      <div className="right">
        
        <span className="action">Why KloutCam</span>
        <span className="action">Signup</span>
        <span className="action search headerSearch" >
          {this.state.searchMode ?
              
              <AutoComplete
              key="AutoComplete"
              //dataSource={children}
              className={inputClass}
              //value={this.state.value}
              //onSelect={this.onSelect}          
              //onBlur={this.leaveSearchMode}
              //onSearch={this.onChange}
              optionLabelProp="text"
              >
              
              <Input
                placeholder="search"
                ref={node => {
                  this.input = node;
                }}
                prefix={
                  <SearchOutlined />
                }
                suffix={
                  
                    <CloseCircleOutlined onClick={e=>this.clearSearch(e)}  />
                  
                }
              />
              </AutoComplete>
            
            :
             <SearchOutlined onClick={this.enterSearchMode}/>
           }
        </span>
        <span className="actionbtn">Login</span>
      </div>
      {/* <Menu
        // onClick={this.handleLanguageMenuClick}
        mode="horizontal"
        className="menu"
        style={{ background: '#2479f8'}}
      >
       
      </Menu>
      <Menu
        // onClick={this.handleLanguageMenuClick}
        mode="horizontal"
        className="menu"
        style={{ background: '#2479f8'}}
      >
        <span>Signup</span>
      </Menu>
      <Menu
        onClick={handleLanguageMenuClick}
        mode="horizontal"
        className="menu"
        style={{ background: '#2479f8'}}
      >
        <span>Login</span>
      </Menu> */}
      {/* <Menu onClick={handleSettingMenuClick} mode="horizontal" className="menu">
        <SubMenu title={getUsernameAvatar('Cemal')}>
          <Menu.Item key="setting:1">
            <span>
              <UserOutlined />
              Profile
            </span>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <span>
              <LogoutOutlined onClick={handleLogout} />
              Logout
            </span>
          </Menu.Item>
        </SubMenu>
      </Menu> */}
    </Header>
  );
 }
}

