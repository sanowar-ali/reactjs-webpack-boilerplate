import React from "react";
import { Layout, Menu, Tooltip } from "antd";
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
function Footermenu() {
  return (
    <Menu
      mode="horizontal"
      style={{
        color: "#000",
        lineHeight: "14px",
        textAlign: "-webkit-center",
      }}
    >
      <Menu.Item key="explore" className="footer_menu_item">
        <div>
          <DashboardOutlined />
        </div>
        <div>Explore</div>
      </Menu.Item>
      <Menu.Item key="notification" className="footer_menu_item">
        <div>
          <NotificationOutlined />
        </div>
        <div>Notifications</div>
      </Menu.Item>
      <Menu.Item key="messages" className="footer_menu_item">
        <div>
          <CommentOutlined />
        </div>
        <div>Messages</div>
      </Menu.Item>
      <Menu.Item key="mykloutcam" className="footer_menu_item">
        <div>
          <AppstoreOutlined />
        </div>
        <div>My KloutCam</div>
      </Menu.Item>
      <Menu.Item key="saved" className="footer_menu_item">
        <div>
          <HeartOutlined />
        </div>
        <div>Saved</div>
      </Menu.Item>
    </Menu>
  );
}

export default Footermenu;
