import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner.js";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [registerStatus, setRegisterStatus] = useState({ type: "", message: "" });
  
  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      setRegisterStatus({ type: "", message: "" });
      
      const { data } = await axios.post("/users/register", values);
      
      setRegisterStatus({ 
        type: "success", 
        message: "Registration successful! Redirecting to login..." 
      });
      
      setLoading(false);
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      
    } catch (error) {
      setLoading(false);
      setRegisterStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Something went wrong" 
      });
    }
  };

  // Prevent logged-in users from accessing register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  
  return (
    <div className="auth-container">
      {loading && <Spinner />}
      
      <div className="auth-card">
        {registerStatus.type && (
          <Alert
            message={registerStatus.type === "success" ? "Success" : "Error"}
            description={registerStatus.message}
            type={registerStatus.type}
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
          <h1 className="auth-title">Register</h1>

          <Form.Item 
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Name" 
              size="large"
            />
          </Form.Item>

          <Form.Item 
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined className="site-form-item-icon" />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item 
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
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
              Register
            </Button>
          </Form.Item>
          
          <div className="auth-footer">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;