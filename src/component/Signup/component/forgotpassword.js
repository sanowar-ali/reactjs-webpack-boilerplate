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
import { openLoginModal, openForgotModal, initiateReset } from "../action";
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

function Forgotpwd(props) {
  const [form] = Form.useForm();

  const [loader, setLoading] = useState(false);

  const handleStep = () => {
    props.openForgotModal(false);
    props.openLoginModal(true);
  };

  const handleNextView = () => {
    viewDetail(true);
  };

  const handleLoader = (value) => {
    setLoading(value);
  };

  let heading = (
    <div>
      <ArrowLeftOutlined style={{ float: "left" }} onClick={handleStep} />{" "}
      {LocaleStrings.forget_password}
    </div>
  );

  const onReset = () => {
    form.resetFields();
  };

  const closeForgotModal = () => {
    props.openForgotModal(false);
  };

  const sendResetLink = (fieldsValues) => {
    let values = {};
    values.email = fieldsValues.email;
    handleLoader(true);
    props.initiateReset(values, (response) => {
      handleLoader(false);
      if (response.success === 1) {
        notification["success"]({
          message: "Reset Password",
          description: "Please check your email.",
        });
        closeForgotModal();
      } else {
        notification["error"]({
          message: "Reset Password",
          description: "Email ID not found",
        });
      }
    });
  };

  return (
    <Modal
      title={heading}
      className="modalcentertext"
      centered
      visible={props.forgotpwdModal && props.forgotpwdModal.showModal}
      onCancel={() => props.openForgotModal(false)}
      footer={null}
      width={450}
    >
      <Row>
        <Col span={24}>
          <Form
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            form={form}
            name="add-new-user-form"
            onFinish={sendResetLink}
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
              <Input placeholder="Email address" />
            </Form.Item>
            <Row gutter={16} justify="space-around">
              <Col span={3}>
                <Button type="primary" htmlType="submit" loading={loader}>
                  {LocaleStrings.send_reset_link}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24} style={{ height: 20 }}></Col>
      </Row>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  forgotpwdModal: state.forgotpwdModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { openLoginModal, openForgotModal, initiateReset },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Forgotpwd);
