import React from 'react';
import './Notifications.css';
import Layouts from '../Layouts/Layouts';
import { Tabs, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '../../redux/userSlice';
import moment from 'moment';

const Notifications = () => {
    document.title="Notification"
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const markAllseen = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/mark-all-notification-as-seen', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('something is wrong');
        }
    };

    const deleteAll = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/delete-all-notifications', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('something is wrong');
        }
    };

    
    
    const columns = [
        { title: 'Nom', dataIndex: 'Nom', key: 'Nom' },
        { title: 'Prenom', dataIndex: 'Prenom', key: 'Prenom' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'NTele', dataIndex: 'NTele', key: 'NTele' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Timing', dataIndex: 'timing', key: 'timing' },
        { 
            title: 'status', 
            dataIndex: 'status', 
            render: (text, record) => (
                <div className='flex cursor-pointer'>
                    <h1>Accepter</h1>
                </div>
            )
        },
    ];
    const dataSource = user?.unseenNotifications.map(notification => {
        console.log(notification);
        const formattedTimingDebut = moment(notification.timings[0]).format('YYYY-MM-DD HH:mm');
        const formattedTimingFin = moment(notification.timings[1]).format('YYYY-MM-DD HH:mm');
        return {
            key: notification.data.footId,
            Nom: notification.firstName,
            Prenom: notification.lastName,
            email: notification.email,
            NTele: notification.phoneNumber,
            address: notification.adress,
            timing: `Du ${formattedTimingDebut} à ${formattedTimingFin}`,
            status:notification.status
        };
    });

    return (
        <Layouts>
            <h1 className='page-title'>Notifications</h1>
            <Tabs>
                <Tabs.TabPane tab="invisible" key={0}>
                    <div className="d-flex justify-content-end">
                        <h1 className="text-notification" onClick={markAllseen}>
                            marque comme tout vu
                        </h1>
                    </div>
                    <div className="class">
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="vu" key={1}>
                    <div className="d-flex justify-content-end">
                        <h1 className="text-notification" onClick={deleteAll}>
                            Supprimer tout
                        </h1>
                    </div>
                    {user?.seenNotifications.map((notification) => (
                        <div className='card p-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layouts>
    );
};

export default Notifications;
