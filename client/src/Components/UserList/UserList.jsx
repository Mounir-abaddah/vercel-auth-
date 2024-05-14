import React, { useEffect, useState } from 'react'
import './UserList.css'
import Layout from '../Layouts/Layouts'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import axios from 'axios'
import { Tabs, Table } from 'antd';
import toast from 'react-hot-toast'

const UserList = () => {
  const [users,SetUsers] = useState([])
  const dispatch = useDispatch()
const getUsersData = async()=>{
  try{
    dispatch(showLoading())
    const response = await axios.get('/api/admin/get-all-users',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(hideLoading())
    if(response.data.success){
        SetUsers(response.data.data)
    }
  }catch(error){
    dispatch(hideLoading())
  }
}
  useEffect(()=>{
      getUsersData()
  },[])


  const columns = [
    { title: 'Nom', dataIndex: 'name'},
    { title: 'Email', dataIndex: 'email',},
    { title: 'Created at', dataIndex: 'createdAt'},
    { title: 'Actions', dataIndex: 'actions', 
    render:(text,record)=>
      (<div className='flex cursor-pointer'>
        <h1>Block</h1>
      </div>)
  },
];
  return (
    <Layout>
      <h1 className=' users font-bold text-2xl'>Liste D'utilisateurs:</h1>
          <Tabs>
                <Tabs.TabPane >
                  <Table columns={columns} dataSource={users}/>
                </Tabs.TabPane>
            </Tabs>
    </Layout>
  )
}

export default UserList