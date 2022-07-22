import { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import styled from "styled-components";

const Container = styled.div`
  width: 40%;
  margin: 0px auto;
  text-align: center;
`;

export const Register: React.FC = () => {
  const [errors, setErrors] = useState([""]);

  const onFinish = (values: any) => {
    axios
      .post("http://localhost:8000/api/auth/register", values)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
        const errs: { [field: string]: string }[] = error.response.data;
        const allErrors = Object.entries(errs).map(([_, e]) => e[0]);
        setErrors(allErrors);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <h2>Register an Account</h2>
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
          name="email"
          label="Email"
          rules={[
            { type: "email" },
            { required: true, message: "Please input your email!" },
          ]}
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div style={{ display: "flex", flexDirection: "column", color: "red", margin: 20 }}>
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

export default Register;
