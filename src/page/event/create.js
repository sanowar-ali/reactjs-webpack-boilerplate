import React from "react";
import { Card, Col, Row, Layout, Form, Input } from "antd";
import { InfoCircleFilled, CaretUpFilled } from "@ant-design/icons";
import "../../assets/css/style.css";
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
    md: { span: 24, offset: 0 },
    lg: { span: 24, offset: 0 },
    xl: { span: 24, offset: 0 },
    xxl: { span: 24, offset: 0 },
  },
  labelCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
    md: { span: 24, offset: 0 },
    lg: { span: 24, offset: 0 },
    xl: { span: 24, offset: 0 },
    xxl: { span: 24, offset: 0 },
  },
};

const twoformLayout = {
  labelCol: { span: 0 },
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
    md: { span: 24, offset: 0 },
    lg: { span: 23, offset: 0 },
    xl: { span: 23, offset: 0 },
    xxl: { span: 23, offset: 0 },
  },
};

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 16,
  xxl: 12,
};

const twoColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 8,
  xxl: 6,
};

const requiredFieldRule = [{ required: true, message: "Required Field" }];
function Create() {
  const [form] = Form.useForm();
  return (
    <>
      <Row gutter={24} type="flex">
        <Col span={24} className="event_create_heading">
          Let's get started with some basics
        </Col>

        <Col span={24} className="event_step">
          step 1/7
        </Col>

        <Col span={24} className="event_create_subheading">
          What kind of experience will you host?
        </Col>
      </Row>
      <Form
        form={form}
        name="add-new-user-form"
        //onFinish={handleSave}
        layout="vertical"
      >
        <Row>
          <Col {...topColResponsiveProps}>
            <Form.Item
              label="Name of your Experience"
              name="name"
              rules={requiredFieldRule}
              {...formItemLayoutWithOutLabel}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col {...twoColResponsiveProps}>
            <Form.Item
              label="Category"
              name="name"
              rules={requiredFieldRule}
              {...twoformLayout}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col {...twoColResponsiveProps} s>
            <Form.Item
              label="Lanugage"
              name="name"
              rules={requiredFieldRule}
              {...formItemLayoutWithOutLabel}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col {...topColResponsiveProps}></Col>
        </Row>
      </Form>
    </>
  );
}
export default Create;
