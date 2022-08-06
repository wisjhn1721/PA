import axios from "axios";
import { Button, Form, Input, DatePicker, Select } from "antd";
import styled from "styled-components";
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ContainerStyle = styled.div`
    width: 70%;
    margin: 20px auto;
    padding: 40px;
    border: 1px solid black;
    border-radius: 7px;
`

interface CourseProps {
  user: {[key: string]: string} | null;
  onRefresh: (val: boolean) => void;
}

const Course = ({ user, onRefresh }: CourseProps) => {
  const [form] = Form.useForm();


  const onFinish = (values: any) => {
    const s_date = values.dates[0].format();
    const e_date = values.dates[0].format();


    const postData = {
      "instructor_id": user!.id,
      "course": values.name,
      "start_date": s_date,
      "end_date": e_date,
      "students": []
    }
    console.log(postData);

    axios
    .post("/api/add-course", postData)
    .then((_) => {
        onRefresh(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <ContainerStyle>
      <h1 style={{ textAlign: "center" }}>Add Course</h1>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Course Name" rules={[{ required: true }]}>
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
            <Option key="1" value="Cameron Wood">Cameron Wood</Option>
            <Option key="2" value="John Wise">John Wise</Option>
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
