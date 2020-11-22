import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import {
  DashboardOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
  CommentOutlined,
  CalendarOutlined,
  HeartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "./Style.less";

const { SubMenu } = Menu;

const { Sider } = Layout;

function SiderMenu({ handleOnCollapse, collapsed }) {
  const theme = "light";

  const history = useHistory();

  const handleSiderMenuClick = (action) => {
    console.log("menu:", action);
    switch (action.key) {
      case "dashboard":
        history.push("/");
        break;
      case "showProducts":
        history.push("/products");
        break;
      case "addProduct":
        history.push("/add-product");
        break;
      case "showCustomers":
        history.push("/customers");
        break;
      case "addCustomer":
        history.push("/add-customer");
        break;
      default:
        history.push("/");
    }
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="80"
      onCollapse={handleOnCollapse}
      collapsed={collapsed}
      width="256"
      theme={theme}
      className="mobilemenu"
    >
      <div className="menu-logo" />

      <Menu mode="inline" theme={theme} onClick={handleSiderMenuClick}>
        <Menu.Item key="dashboard">
          <DashboardOutlined />
          <span className="nav-text">Explore</span>
        </Menu.Item>

        <Menu.Item key="showProducts">
          <UserOutlined />
          <span className="nav-text">Profile</span>
        </Menu.Item>

        <Menu.Item key="showCustomers">
          <NotificationOutlined />
          <span className="nav-text">Notification</span>
        </Menu.Item>

        <Menu.Item key="settings">
          <CommentOutlined />
          <span className="nav-text">Messages</span>
        </Menu.Item>
        <Menu.Item key="settings">
          <HeartOutlined />
          <span className="nav-text">Saved</span>
        </Menu.Item>
        <Menu.Item key="settings">
          <AppstoreOutlined />
          <span className="nav-text">My KloutCam</span>
        </Menu.Item>
        <Menu.Item key="reports">
          <CalendarOutlined />
          <span className="nav-text">Calendar</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
