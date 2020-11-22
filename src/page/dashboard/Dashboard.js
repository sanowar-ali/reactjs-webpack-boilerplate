import React from "react";
import {
  Card,
  Col,
  Row,
  Layout,
  Tooltip,
  Skeleton,
  Switch,
  Avatar,
} from "antd";
import { InfoCircleFilled, CaretUpFilled } from "@ant-design/icons";

const { Meta } = Card;
function Dashboard() {
  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 8,
    xl: 6,
    xxl: 4,
    style: { marginBottom: 24 },
  };

  return (
    <>
      <Row gutter={24} type="flex">
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 1"
              description="This is the description of Event"
            />
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 2"
              description="This is the description of Event"
            />
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 3"
              description="This is the description of Event"
            />
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 4"
              description="This is the description of Event"
            />
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 4"
              description="This is the description of Event"
            />
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 4"
              description="This is the description of Event"
            />
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 4"
              description="This is the description of Event"
            />
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            loading={true}
            bodyStyle={{ padding: "20px 24px 8px 24px" }}
            cover={
              <img
                alt="example"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            }
          >
            <Meta
              title="Event 4"
              description="This is the description of Event"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
