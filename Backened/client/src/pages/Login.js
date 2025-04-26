import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert ,message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loginStatus, setLoginStatus] = useState({ type: "", message: "" });
 
  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      setLoginStatus({ type: "", message: "" });
      
      const { data } = await axios.post("/users/login", values);
      
      setLoginStatus({ 
        type: "success", 
        message: "Login successful! Redirecting..." 
      });
      
      setLoading(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (error) {
      setLoading(false);
      setLoginStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Something went wrong" 
      });
    }
  };

  // Prevent logged-in users from accessing login page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  
  return (
    <div className="auth-container">
      {loading && <Spinner />}
      
      <div className="auth-card">
        {loginStatus.type && (
          <Alert
            message={loginStatus.type === "success" ? "Success" : "Error"}
            description={loginStatus.message}
            type={loginStatus.type}
            showIcon
            closable
            style={{ marginBottom: 16 }}
          />
        )}
        
        <Form 
          form={form}
          layout="vertical" 
          onFinish={submitHandler}
          className="auth-form"
        >
          <h1 className="auth-title">Login</h1>

          <Form.Item 
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item 
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="Password" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button" 
              block
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
          
          <div className="auth-footer">
            <Link to="/register">Not a user? Register now</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;