import React, { useEffect } from 'react';
import axios from 'axios';
import Layouts from '../../Components/Layouts/Layouts';
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css"; 
import './Home.css'
// import { useNavigate } from 'react-router-dom';


const Home = () => {
    document.title="Acceuil"
    // const navigate=useNavigate()

    const getData = async () => {
        try {
            const response = await axios.post('/api/user/get-user-info-by-id', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layouts>

      </Layouts>
    )
    
};

export default Home;
