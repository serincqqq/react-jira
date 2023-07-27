import { useParams } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import ReactQuill from 'react-quill'
import { useState, Fragment, useEffect } from 'react'
import './quill.css'
import { Setting, Nav, Divider } from './Styles'
import { editProject, getProjectDetail } from '@/services'

export default function ProjectSetting() {
  const params = useParams()
  const [form] = Form.useForm()
  const { projectId } = params
  const [projectData, setProjectData] = useState({})
  const Breadcrumbs = ['Projects', projectId, 'Project Details']
  const [description, setDescription] = useState('')
  useEffect(() => {
    getProjectDetail(projectId).then((res) => {
      form.setFieldsValue(res.data)
      setProjectData(res.data)
    })
  }, [])
  const onFinish = (values) => {
    editProject(projectId, { ...projectData, ...values }).then((res) => console.log('x', res))
  }
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
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 30 }}
        autoComplete="off"
      >
        <Form.Item label="Name" name="projectName">
          <Input placeholder="choose project" />
        </Form.Item>
        <Form.Item label="Keyword" name="keyword">
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
