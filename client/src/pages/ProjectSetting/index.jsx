import { useParams } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import ReactQuill from 'react-quill'
import { useState, Fragment } from 'react'
import './quill.css'
import { Setting, Nav, Divider } from './Styles'

export default function ProjectSetting() {
  const params = useParams()
  const [form] = Form.useForm()
  const Breadcrumbs = ['Projects', params.projectId, 'Project Details']
  const [description, setDescription] = useState('')
  return (
    <Setting>
      <Nav>
        {Breadcrumbs.map((item, index) => {
          return (
            <Fragment key={item}>
              {index !== 0 && <Divider>/</Divider>}
              {item}
            </Fragment>
          )
        })}
      </Nav>
      <h2 style={{ margin: '20px 0 30px 0' }}>Project Details</h2>

      <Form
        style={{ fontFamily: ' CircularStdBook', maxWidth: 600 }}
        layout="vertical"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 30 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
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
    </Setting>
  )
}
