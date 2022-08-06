import { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 40%;
  margin: 0px auto;
  text-align: center;
`;

interface RegisterProps {
  onLoggedIn: (val: {[key: string]: string;}) => void;
}

const Register = ({ onLoggedIn }: RegisterProps) => {
  const [errors, setErrors] = useState([""]);

  let navigate = useNavigate();
  const onFinish = (values: any) => {
    axios
      .post("/api/register", values)
      .then((resp) => {
        console.log(resp);
        const res = resp.data;
        if (res.success) {
          onLoggedIn(res.success);
          navigate("/");

          return;
        }
        // else, error
        setErrors(res.errors);
      })
      .catch((error) => {
        console.log(error);
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
          label="Full Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 3, message: 'Name must be minimum of 3 characters.' }
          ]}
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
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 7, message: 'Password must be minimum of 7 characters.' },
            {
              pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
              message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character'
          }
          ]}
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
        <span style={{ marginLeft: 5 }}>
          Already have an account? <a href="/login">Sign In!</a>
        </span>
      </Form>
    </Container>
  );
};

export { Register };
