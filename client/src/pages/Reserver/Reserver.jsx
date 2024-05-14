import './Reserver.css'
import Layouts from '../../Components/Layouts/Layouts'
import { Input,Row,Col,Form, TimePicker,Button } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch,useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { showLoading,hideLoading } from '../../redux/alertsSlice'

const Reserver = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try{
      dispatch(showLoading());
      const response = await axios.post('/api/user/reservation', { ...values, userId: user._id },{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
      dispatch(hideLoading());    
      if(response.data.success){
          toast.success(response.data.message)
          navigate('/')
      }else{
          toast.error(response.data.message);
      }
  }catch(error){
    dispatch(hideLoading());    
      toast.error('something is wrong');
  }
}

  return (
    <Layouts>
      <h1 className='page-title'>Postulation du terrain:</h1>
      <hr />

    <Form layout='vertical' className='form' onFinish={onFinish}>
      <h1>Personnal information:</h1>
        <Row className='row'>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem required label="Nom:" name="firstName" rules={[{required : true}]}>
              <Input placeholder="First Name"/>
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem required label="Prenom:" name="lastName" rules={[{required : true}]}>
              <Input placeholder="First Name"/>
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem required label="Telephone:" name="phoneNumber" rules={[{required : true}]}>
              <Input placeholder="Entrez votre numéro de téléphone" type='tel'maxLength={10} />
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem required label="Email:" name="email" rules={[{required : true}]}>
              <Input placeholder="Entrez votre Email" type='email' />
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem required label="Adress:" name="adress" rules={[{required : true}]}>
              <Input placeholder="First Name"/>
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8} className='time'>
            <FormItem required label="Horaire:" name="timings" rules={[{required : true}]}>
              <TimePicker.RangePicker 
              picker="time"
              format="HH:mm"
              minuteStep={60}/>
            </FormItem>
          </Col>
        </Row>
        <div className="d-flex SUBMIT">
          <Button className='envoyer' htmlType='submit'>Envoyer</Button>
        </div>
    </Form>
    </Layouts>
  )
}

export default Reserver