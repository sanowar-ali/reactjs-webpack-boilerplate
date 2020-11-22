import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Layout, Menu, Affix } from "antd";
import SiderMenu from "./SiderMenu";
import LayoutBanner from "./LayoutBanner";
import FooterMenu from "./FooterMenu";
import "./Style.less";
import "../../assets/css/style.css";
import RoutingList from "../../router/RoutingList";
//import useDeviceDetect from "../../component/Common/device-detect";
import { isMobile } from "../../component/Common/constant";
import LocaleStrings from "../../languages/index";

const { Content } = Layout;
const { Footer } = Layout;

function MainLayout(props) {
  //console.log("isLoggedIn", props.isLoggedIn);
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const [searchMode, setsearchMode] = useState(false);

  const handleOnCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  const handleSearchMode = () => {
    setsearchMode((prevState) => !prevState);
  };

  //console.log("isMobile", isMobile);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {props.isLoggedIn ? (
        <SiderMenu collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
      ) : (
        ""
      )}
      <Layout>
        <div className="ant-layout-header">
          <LayoutBanner
            collapsed={collapsed}
            searchMode={searchMode}
            handleOnCollapse={handleOnCollapse}
            handleSearchMode={handleSearchMode}
          />
        </div>

        <Content>
          {location.pathname === "/" ? (
            <div style={{ padding: 24 }}>
              <h1>{LocaleStrings.home_h1}</h1>
              <h1>{LocaleStrings.home_h2}</h1>
              <p>{LocaleStrings.home_h3}</p>
            </div>
          ) : (
            ""
          )}
          <div
            style={{
              padding: "24px 24px 0 24px",
              background: "#fff",
              minHeight: 20,
            }}
          >
            <RoutingList />
          </div>
        </Content>
        {props.isLoggedIn ? (
          <Footer className="fixed-bottom">
            <FooterMenu />
          </Footer>
        ) : (
          ""
        )}
      </Layout>
    </Layout>
  );
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
