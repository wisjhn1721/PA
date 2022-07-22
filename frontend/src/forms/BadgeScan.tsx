
import { Button, DatePicker, Form, Input } from "antd";
import moment from 'moment';

interface FormItems {
  badgescan: string;
  building: string;
  room: string;
  date: moment.Moment;
}

const BadgeScan = () => {

  const onFinish = (values: FormItems) => {
    console.log("Success:", values);
    console.log(values.date.format());
  };


  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <h2>Scan a Badge!</h2>
      </div>
      <div style={{ width: "60%", margin: "0px auto" }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Badge Code"
            name="badgecode"
            rules={[
              { required: true, message: "Please input your badge code!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Building"
            name="building"
            rules={[{ required: true, message: "Please input your building!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room"
            name="room"
            rules={[{ required: true, message: "Please input your room!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { BadgeScan };
