import React from 'react';
import './login.css';
import { Form, Input, Button } from 'antd';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {set} from 'automate-redux';
/* import Chattitude from '../../assets/large_chattitude.png'; */

//services
import {login} from '../../services/authenticate';
//utils
import {notify} from '../../utils';

const Login = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = values => {
    login(values)
    .then(({data, status}) => {
      if (status !== 200 || data.status === "error") {
        notify("error", data.message, "", 5);
        return;
      }
      notify("success", "Successfully logged in!", "", 5);
      dispatch(set("profile.name", data.name))
      dispatch(set("uiState.isLoggedIn", true))
      history.push("/");
    })
  };

  return (
    <div className="login-form">
    {/* <img src={Chattitude} alt="chattitude" style={{width: '100%', height: 'auto'}}/> */}
    <Form
    name="basic"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    layout="vertical"
  >
    <Form.Item
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input placeholder="Username" />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password placeholder="Password" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" style={{width: "100%"}}>
        Login
      </Button>
      <div style={{textAlign: "center", fontWeight: "bolder", margin: "10px 0px"}}>OR</div>
      <Button type="primary" style={{width: "100%"}} onClick={() => history.push("/register")}>Register</Button>
    </Form.Item>
  </Form>
  </div>
  )
}

export default Login;