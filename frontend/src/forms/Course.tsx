import { Button, Form, Input, DatePicker, Select } from "antd";
import React from "react";
import styled from "styled-components";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ContainerStyle = styled.div`
    width: 70%;
    margin: 20px auto;
    padding: 40px;
    border: 1px solid black;
    border-radius: 7px;
`

const Course: React.FC = () => {
  const [form] = Form.useForm();


  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <ContainerStyle>
      <h1 style={{ textAlign: "center" }}>Add Course</h1>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Course Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="instructor"
          label="Course Instructor"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dates"
          label="Course Dates"
          rules={[{ required: true }]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          name="students"
          label="Select Students"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
          >
            <Option key="1">Cameron Wood</Option>
            <Option key="2">John Wise</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add New Course
          </Button>
        </Form.Item>
      </Form>
    </ContainerStyle>
  );
};

export { Course };
