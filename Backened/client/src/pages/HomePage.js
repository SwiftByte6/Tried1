import React,{useState,useEffect} from "react";

import {Form, Modal, Table} from 'antd';
import { Input, Select } from "antd";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { Button } from "antd";
import { message } from "antd";
import Spinner from "./../components/Spinner";

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
const HomePage = () => {
   const[loading,setLoading] = useState(false);
  const [showModal,setShowModal] = useState(false);
const [allTransaction , setAllTransaction ]= useState([]);
//table data
const columns =[
{
  title:'Date',
  dataIndex:'date',

},
{
  title:'Amount',
  dataIndex:'amount',

},
{
  title:'Type',
  dataIndex:'type',

},
{
  title:'Category',
  dataIndex:'category',

},
{
  title:'Reference',
  dataIndex:'reference',

},
{
  title:'Actions',
  // dataIndex:'reference',

},
]


///get all transactions
  const getAllTransactions = async()=>{
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res =await axios.post('/transaction/get-transaction',{userid:user._id});
      setLoading(false);
      setAllTransaction(res.data);
      console.log(res.data);
    }catch(error){
      console.log(error);
      message.error('Error in getting transactions');
    }
  };
  //useeffect hok
  useEffect(()=>{
getAllTransactions();
  },[])




  //form handling
  const handleSubmit =  async(values) => {
   
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      await axios.post('/transaction/add-transaction',{...values,userid:user._id});
      setLoading(false);
      message.success('Transaction added successfully');
      setShowModal(false);
    }
    catch(error){
      setLoading(false);
      message.error('Error in adding transaction');
    }
  };
  return (
    <Layout>
      {loading && <Spinner/>}
      <h3>

        <div className="filters">
          <div>
            range filters
          </div>
          <div>
          <Button type="primary" onClick={()=>setShowModal(true)}>Add New</Button>;
          </div>
        </div>
      </h3>
      <div className="content"> 
        <Table columns = {columns} dataSource={allTransaction}/>
      </div>
        <Modal title="Add Transaction" open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount in ₹" name="amount">
              <Input type="text"/>
              </Form.Item>
              <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category">
              <Select>
               <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="travel">Travel</Select.Option>
                <Select.Option value="shopping">Shopping</Select.Option>
               <Select.Option value="entertainment">Entertainment</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="tax">tax</Select.Option>
                <Select.Option value="other">Other</Select.Option>

                </Select>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input type="date"/>
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                <Input type="text"/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                <Input type="text"/>
                </Form.Item>
                <div className="d-flex justify-content-end">
                  <button type ="submit" className="btn btn-primary">
                    SAVE
                </button>

                </div>
              
          </Form>
        </Modal>
     
    </Layout>
  );
};

export default HomePage;