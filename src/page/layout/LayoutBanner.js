import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input, AutoComplete, Row, Col } from "antd";
import "./Style.less";
import { getUsernameAvatar } from "../../component/UserAvatar";
import classNames from "classnames";
import {
  openSignUpModal,
  openLoginModal,
  logout,
} from "../../component/Signup/action";
import LoginModule from "../../component/Signup/component/login";
import ForgotModule from "../../component/Signup/component/forgotpassword";
import SignupModule from "../../component/Signup/component";
import LocaleStrings from "../../languages/index";
import { useHistory } from "react-router-dom";

const { Header } = Layout;
const { SubMenu } = Menu;

function LayoutBanner(props) {
  //console.log("session", props.session);
  const history = useHistory();
  const getCollapseIcon = () => {
    if (props.collapsed) {
      return (
        <MenuUnfoldOutlined
          onClick={props.handleOnCollapse}
          className="trigger"
        />
      );
    }
    return (
      <MenuFoldOutlined onClick={props.handleOnCollapse} className="trigger" />
    );
  };

  const clickSignModal = () => {
    props.openSignUpModal(true);
  };

  const clickLoginModal = () => {
    props.openLoginModal(true);
  };

  const handleLanguageMenuClick = () => {};
  const handleSettingMenuClick = () => {};
  const handleLogout = () => {
    //console.log("logout", props.session);
    props.logout(props.session);
  };

  let inputClass = classNames({
    input: true,
    show: true,
  });

  return (
    <div>
      <Row className="header">
        <Col span={12}>
          {/* {window.innerWidth > 992 && getCollapseIcon()} */}
          <div style={{ display: "flex" }}>
            <span className="menuheading">{LocaleStrings.project_heading}</span>
            <span className="search">
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
                <Input placeholder={LocaleStrings.search_placeholder} />
              </AutoComplete>
            </span>
          </div>
        </Col>

        <Col flex="auto" span={12}>
          {props.isLoggedIn ? (
            <div class="afterlogin" style={{ float: "right", display: "flex" }}>
              <span
                className="eventhostbtn"
                onClick={() => history.push("/host-event")}
              >
                {LocaleStrings.host_event_btn}
              </span>

              <div>
                <Menu mode="horizontal" className="menu">
                  <SubMenu title={getUsernameAvatar(props.session.username)}>
                    <Menu.Item key="setting:1">
                      <span>
                        <UserOutlined />
                        {LocaleStrings.personal_info_link}
                      </span>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                      <span>{LocaleStrings.payments_link}</span>
                    </Menu.Item>
                    <Menu.Item key="setting:3">
                      <span>{LocaleStrings.notification_link}</span>
                    </Menu.Item>
                    <Menu.Item key="setting:4">
                      <span onClick={handleLogout}>
                        <LogoutOutlined />
                        {LocaleStrings.logout}
                      </span>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </div>
          ) : (
            <div style={{ float: "right" }}>
              <div className="beforelogin">
                <span className="action">{LocaleStrings.why_kloutcam}</span>
                <span className="action" onClick={clickSignModal}>
                  {LocaleStrings.signup}
                </span>

                <span className="actionbtn" onClick={clickLoginModal}>
                  {LocaleStrings.login}
                </span>
              </div>
              <div className="mobileview">
                <Menu mode="horizontal" className="menu">
                  <SubMenu title={<MenuOutlined style={{ color: "#fff" }} />}>
                    <Menu.Item key="mobile_signup">
                      <span onClick={clickSignModal}>
                        {LocaleStrings.signup}
                      </span>
                    </Menu.Item>
                    <Menu.Item key="mobile_login">
                      <span onClick={clickLoginModal}>
                        {LocaleStrings.login}
                      </span>
                    </Menu.Item>
                    <Menu.Item key="mobile_why">
                      <span>{LocaleStrings.why_kloutcam}</span>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </div>
          )}
        </Col>
      </Row>

      {props.signupModal && props.signupModal.showModal ? <SignupModule /> : ""}
      {props.loginModal && props.loginModal.showModal ? <LoginModule /> : ""}
      {props.forgotpwdModal && props.forgotpwdModal.showModal ? (
        <ForgotModule />
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  signupModal: state.signupModal,
  loginModal: state.loginModal,
  forgotpwdModal: state.forgotpwdModal,
  isLoggedIn: state.isLoggedIn,
  session: state.session,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openSignUpModal,
      openLoginModal,
      logout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LayoutBanner);
