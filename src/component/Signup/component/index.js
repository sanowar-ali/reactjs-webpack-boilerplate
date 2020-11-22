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
  DatePicker,
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
  openSignUpModal,
  addUser,
  validateEmailForAppUser,
  openLoginModal,
} from "../action";
import { openNotificationWithIcon } from "../../Common/common-utils";
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

const configDate = {
  rules: [
    {
      type: "object",
      required: false,
      message: "Please select a date!",
    },
  ],
};

function Signup(props) {
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

  const handleLogin = () => {
    props.openSignUpModal(false);
    props.openLoginModal(true);
  };

  let heading = !stepview ? (
    "Sign up"
  ) : (
    <div>
      <ArrowLeftOutlined style={{ float: "left" }} onClick={handleStep} />{" "}
      {LocaleStrings.signup_finish_text}
    </div>
  );

  const onReset = () => {
    form.resetFields();
  };

  const closeSignModal = () => {
    props.openSignUpModal(false);
  };

  const handleSave = (fieldsValues) => {
    let values = {};
    values.name = fieldsValues.name;
    values.email = fieldsValues.email;
    values.password = fieldsValues.password;
    values.birthdate = fieldsValues.birthdate
      ? fieldsValues.birthdate.format("YYYY-MM-DD")
      : null;
    values.isactive = true;

    handleLoader(true);

    props.validateEmailForAppUser(values, (feedback) => {
      if (feedback.success === 2) {
        handleLoader(false);

        notification["error"]({
          message: "Sign Up",
          description: "Email Already Exists.",
        });
      } else if (feedback.success === 1) {
        props.addUser(values, (response) => {
          //console.log("response :- ", response);
          handleLoader(false);

          if (response.success === 1) {
            notification["success"]({
              message: "Sign Up",
              description: "Successfully Registered",
            });
          } else {
            notification["error"]({
              message: "Sign Up",
              description: "Something went wrong there",
            });
          }
          closeSignModal();
        });
      } else {
        handleLoader(false);
        notification["error"]({
          message: "Sign Up",
          description: "Something went wrong there",
        });
        closeSignModal();
      }
    });
  };

  let footer = (
    <div className="modalcentertext">
      {" "}
      {LocaleStrings.signup_account_already}{" "}
      <a onClick={handleLogin}>{LocaleStrings.login}</a>
    </div>
  );

  return (
    <Modal
      title={heading}
      className="modalcentertext"
      centered
      visible={props.signupModal && props.signupModal.showModal}
      onCancel={() => closeSignModal()}
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
        </Row>
      ) : (
        <Row>
          <Col span={24}>
            <Form
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              form={form}
              name="add-new-user-form"
              onFinish={handleSave}
              //onFinishFailed={onFinishFailed}
            >
              <Form.Item
                //label="First Name"
                name="name"
                rules={requiredFieldRule}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="birthdate"
                {...configDate}
                {...formItemLayoutWithOutLabel}
              >
                <div className="customDatePickerWidth">
                  <DatePicker placeholder="Birth Date" />
                </div>
              </Form.Item>

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
                <Col span={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loader}
                    style={{ width: "100%" }}
                  >
                    {LocaleStrings.signup_button}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={24}>
            <div className="termslink">
              {LocaleStrings.terms_text} <a>{LocaleStrings.terms_link}</a>{" "}
              {LocaleStrings.privacy_text} <a>{LocaleStrings.privacy_link}</a>
            </div>
          </Col>
        </Row>
      )}
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  signupModal: state.signupModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openSignUpModal,
      addUser,
      openNotificationWithIcon,
      validateEmailForAppUser,
      openLoginModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
