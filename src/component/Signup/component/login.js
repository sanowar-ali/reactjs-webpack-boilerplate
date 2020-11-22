import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Input,
  Divider,
  notification,
} from "antd";
import {
  UserOutlined,
  RedoOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  openLoginModal,
  openSignUpModal,
  login,
  openForgotModal,
} from "../action";
import LocaleStrings from "../../../languages/index";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
  labelCol: {
    xs: { span: 0, offset: 0 },
  },
};
const requiredFieldRule = [{ required: true, message: "Required Field" }];

function Login(props) {
  const [form] = Form.useForm();

  const [stepview, viewDetail] = useState(false);

  const [loader, setLoading] = useState(false);

  const handleStep = () => {
    viewDetail(!stepview);
  };

  const handleNextView = () => {
    viewDetail(true);
  };

  const handleLoader = (value) => {
    setLoading(value);
  };

  const handleSignup = () => {
    props.openSignUpModal(true);
    props.openLoginModal(false);
  };

  let heading = !stepview ? (
    LocaleStrings.login
  ) : (
    <div>
      <ArrowLeftOutlined style={{ float: "left" }} onClick={handleStep} />{" "}
      {LocaleStrings.login}
    </div>
  );

  const onReset = () => {
    form.resetFields();
  };

  const closeLoginModal = () => {
    props.openLoginModal(false);
  };

  const handleLogin = (fieldsValues) => {
    let values = {};
    values.email = fieldsValues.email;
    values.password = fieldsValues.password;
    handleLoader(true);
    props.login(values, (response) => {
      console.log("response :- ", response);
      handleLoader(false);
      if (response.success === 1) {
        notification["success"]({
          message: "Login",
          description: "Successfully Loggedin",
        });
        closeLoginModal();
      } else if (response.success === 2) {
        notification["error"]({
          message: "Login",
          description: "Inactive Profile",
        });
        closeLoginModal();
      } else {
        notification["error"]({
          message: "Login",
          description: "Username/Password is incorrect",
        });
      }
    });
  };

  let footer = (
    <div className="modalcentertext">
      {" "}
      {LocaleStrings.signup_account_text}{" "}
      <a onClick={handleSignup}>{LocaleStrings.signup}</a>
    </div>
  );

  const handleForgotModal = () => {
    props.openForgotModal(true);
    props.openLoginModal(false);
  };

  return (
    <Modal
      title={heading}
      className="modalcentertext"
      centered
      visible={props.loginModal && props.loginModal.showModal}
      onCancel={() => props.openLoginModal(false)}
      footer={footer}
      width={450}
    >
      {!stepview ? (
        <Row>
          <Col span={24}>{LocaleStrings.signup_heading}</Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Button
              style={{ width: "100%" }}
              icon={<UserOutlined style={{ float: "left" }} />}
              onClick={handleNextView}
            >
              {LocaleStrings.signup_email_option}
            </Button>
          </Col>
          <Col span={24} clasName="mobileheight"></Col>
        </Row>
      ) : (
        <Row>
          <Col span={24}>
            <Form
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              form={form}
              name="add-new-user-form"
              onFinish={handleLogin}
              //onFinishFailed={onFinishFailed}
            >
              <Form.Item
                //label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email id!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                //label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter a password!" },
                ]}
                style={{ marginBottom: 8 }}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="Password"
                />
              </Form.Item>

              <Row gutter={16} justify="space-around">
                <Col span={3}>
                  <Button type="primary" htmlType="submit" loading={loader}>
                    {LocaleStrings.login_button}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={24} style={{ height: 20 }}></Col>
          <Col span={24}>
            <a onClick={handleForgotModal}>
              {LocaleStrings.forget_password_text}
            </a>
          </Col>
          <Col span={24} style={{ height: 10 }}></Col>
          <Col span={24}>
            <a onClick={handleStep}>{LocaleStrings.login_option_text}</a>
          </Col>
        </Row>
      )}
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  loginModal: state.loginModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { openLoginModal, openSignUpModal, login, openForgotModal },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
