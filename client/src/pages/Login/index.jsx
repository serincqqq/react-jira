import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import { LoginPage, LoginContainer } from './Style'
import { login } from '@/services'
export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    login(values).then((res) => {
      console.log('tr',res)
      if (res.code === 0) {
        if (values.remember) {
          localStorage.setItem('jiraToken', res.token)
          localStorage.setItem('userData', JSON.stringify(res.data))
        } else {
          sessionStorage.setItem('jiraToken', res.token)
          sessionStorage.setItem('userData', JSON.stringify(res.data))
        }
        navigate('/browseProjects')
      }
    })
  }
  return (
    <LoginPage>
      <LoginContainer>
        <h4>欢迎访问jira</h4>
        <Form
          name="basic"
          style={{
            marginTop: '20px',
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </LoginContainer>
    </LoginPage>
  )
}
