import { useLocation } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import ReactQuill from 'react-quill'
import { useState } from 'react'
import './test.css'
export default function ProjectSetting() {
  const location = useLocation()
  const currentPath = location.pathname
  const [form] = Form.useForm()
  const [description, setDescription] = useState('')
  return (
    <>
      <nav>{currentPath}</nav>
      <h1 style={{ margin: '20px 0 30px 0' }}>Project Details</h1>

      <Form style={{ fontFamily: ' CircularStdBook' }} layout="vertical" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 30 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item label="Name" name="name">
          <Input placeholder="choose project" />
        </Form.Item>
        <Form.Item label="URL" name="Url">
          <Input placeholder="Concisely summarize the issue in one or two sentences." />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <ReactQuill theme="snow" value={description} onChange={setDescription} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
