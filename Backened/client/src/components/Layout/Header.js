import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Button, Layout, Space, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Text, Title } = Typography;

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    messageApi.success("Logout Successfully");
    navigate("/login");
  };
  
  return (
    <>
      {contextHolder}
      <AntHeader style={{ 
        background: '#fff', 
        padding: '0 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/">
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            Expense Management
          </Title>
        </Link>
        
        <Space>
          {loginUser && (
            <Text style={{ marginRight: 16 }}>
              Welcome, {loginUser.name}
            </Text>
          )}
          <Button 
            danger 
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Space>
      </AntHeader>
    </>
  );
};

export default Header;