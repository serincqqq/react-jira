import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Form, Input, Button, Modal } from 'antd'
import { useState } from 'react'
import PubSub from 'pubsub-js'
import { issueType, prioritys } from '@/shared/staticData/projectOption'
import SpaceOption from '@/components/SpaceOption'
import { insertIssue } from '@/services'
import SearchSelect from '../SearchSelect'
function CreateForm() {
  const [description] = useState('')
  const [loadings, setLoadings] = useState([])
  const [form] = Form.useForm()
  const [createOpen, setCreateOpen] = useState(false)
  PubSub.subscribe('modalType', (_, modalType) => {
    if (modalType.modal !== 'modal_search') {
      form.resetFields()
      setCreateOpen(true)
    }
  })
  const issuetypeChange = (value) => {
    form.setFieldsValue({ issuetype: value })
  }
  const priorityChange = (value) => {
    form.setFieldsValue({ priority: value })
  }
  const handleAssigneeSelect = (value) => {
    form.setFieldsValue({ assignee: value })
  }
  const handleReporterSelect = (value) => {
    form.setFieldsValue({ reporter: value })
  }
  const onFinish = (values) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[0] = true
      return newLoadings
    })
    insertIssue({
      ...values,
      priority: {
        label: values.priority,
        key: values.priority,
      },
      status: {
        label: 'backlog',
        key: 'backlog',
      },
      createdAt: new Date(),
    }).then((res) => {
      if (res.code === 0) {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings]
          newLoadings[0] = false
          return newLoadings
        })
        setCreateOpen(false)
        form.resetFields()
        PubSub.publish('refresh')
      }
    })
  }
  return (
    <Modal width={670} open={createOpen} onCancel={() => setCreateOpen(false)} footer={null}>
      <Form
        onFinish={onFinish}
        style={{ fontFamily: ' CircularStdBook', maxWidth: 600 }}
        layout="vertical"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 30 }}
        autoComplete="off"
      >
        <Form.Item
          label="Issue Type"
          name="issuetype"
          rules={[{ required: true, message: 'Please select your issuetype!' }]}
        >
          <SpaceOption onChange={issuetypeChange} options={issueType}></SpaceOption>
        </Form.Item>
        <Form.Item
          label="Short Summary"
          name="summary"
          rules={[{ required: true, message: 'Please input your summary!' }]}
        >
          <Input placeholder="Concisely summarize the issue in one or two sentences." />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <ReactQuill style={{ width: 600 }} theme="snow" value={description} />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: 'Please select your priority!' }]}
        >
          <SpaceOption onChange={priorityChange} options={prioritys}></SpaceOption>
        </Form.Item>
        <Form.Item
          label="Reporter"
          name="reporter"
          rules={[{ required: true, message: 'Please input your reporter!' }]}
        >
          <SearchSelect onSelect={handleReporterSelect}></SearchSelect>
        </Form.Item>

        <Form.Item
          label="Assignee"
          name="assignee"
          rules={[{ required: true, message: 'Please input your assignee!' }]}
        >
          <SearchSelect onSelect={handleAssigneeSelect}></SearchSelect>
        </Form.Item>
        <Button style={{ marginLeft: '260px' }} onClick={() => setCreateOpen(false)}>
          Cancel
        </Button>
        <Button
          loading={loadings[0]}
          type="primary"
          style={{ marginLeft: '20px' }}
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
    </Modal>
  )
}
export default CreateForm
