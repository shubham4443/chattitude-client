import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useHistory } from 'react-router-dom';

//services
import { register } from '../../services/authenticate';
//utils
import { notify } from '../../utils';

const Register = () => {
  const history = useHistory();

  const onFinish = (values) => {
    register(values).then(({ data, status }) => {
      if (status !== 200) {
        notify(
          'error',
          'Could not register. There was some server error',
          '',
          5
        );
        return;
      }
      if (data.type === 'success') {
        notify(
          'success',
          'Successfully registered!',
          'Check your inbox to verify your email and then login',
          10
        );
        history.push('/login');
      } else if (data.type === 'error') {
        notify('error', 'Username or email already exists', '', 5);
      }
    });
  };

  const alertMsg = (
    <div>
      Info <br />
      After successful registration, check your inbox for a verification email and
      click on the link provided to verify your email
    </div>
  );

  return (
    <div className='login-form'>
      <Form
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder='Username' />
        </Form.Item>

        <Form.Item name='email' rules={[{ type: 'email' }]}>
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Alert
        message={alertMsg}
        type='info'
        showIcon
        style={{ marginBottom: 21 }}
      />
    </div>
  );
};

export default Register;
