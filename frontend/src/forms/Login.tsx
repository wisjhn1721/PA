import { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import styled from "styled-components";

//local
import { formatError } from "./common";

const Container = styled.div`
  width: 40%;
  margin: 0px auto;
  text-align: center;
`;

export const Login: React.FC = () => {
  const [errors, setErrors] = useState([""]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    axios
      .post("http://localhost:8000/api/auth/login", values)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
        const allErrors = formatError(error);
        setErrors(allErrors);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <h2>Please Login</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "red",
            margin: 20,
          }}
        >
          {errors.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Login;
