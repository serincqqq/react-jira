import { useState, useEffect } from 'react'
import { getSuffixOption, insertProject } from '@/services'
import PubSub from 'pubsub-js'
import { UploadOutlined } from '@ant-design/icons'
import { Input, Button, Modal, Form, Upload, Select, Space } from 'antd'

const { Option } = Select
export default function CreateProject({ createOpen }) {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [suffixOption, setSuffixOption] = useState([])
  useEffect(() => {
    getSuffixOption().then((res) => {
      setSuffixOption(res.data)
    })
  }, [])
  const onFinish = (values) => {
    values.managerEmail = Object.keys(values.managerEmail)
      .map((k) => values.managerEmail[k])
      .join('')
    insertProject(values).then((res) => {
      if (res.code === 0) {
        form.resetFields()
        PubSub.publish('refreshProject')
      }
    })
  }
  const cancel = () => {
    PubSub.publish('closeModal')
    form.resetFields()
  }
  return (
    <Modal width={500} open={createOpen} footer={null} onCancel={cancel}>
      <Form
        onFinish={onFinish}
        style={{ fontFamily: ' CircularStdBook' }}
        layout="vertical"
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        initialValues={{ projectType: 'Software', managerEmail: { suffix: '@gmail.com' } }}
      >
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[{ required: true, message: 'Please input your projectName!' }]}
        >
          <Input placeholder="input projectName" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="input description" />
        </Form.Item>
        <Form.Item
          label="Project Type"
          name="projectType"
          rules={[{ required: true, message: 'Please select your type!' }]}
        >
          <Select
            options={[
              {
                value: 'Software',
                label: 'Software',
              },
              {
                value: 'Business',
                label: 'Business',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Manager Name"
          name="managerName"
          rules={[{ required: true, message: 'Please input your managerName!' }]}
        >
          <Input placeholder="input managerName" />
        </Form.Item>

        <Form.Item label="Manager Email" style={{ marginBottom: 0 }}>
          <Space.Compact>
            <Form.Item
              name={['managerEmail', 'content']}
              style={{ width: '300px' }}
              rules={[{ required: true, message: 'content is required' }]}
            >
              <Input placeholder="Input street" />
            </Form.Item>
            <Form.Item
              name={['managerEmail', 'suffix']}
              style={{ width: '150px' }}
              rules={[{ required: true, message: 'suffix is required' }]}
            >
              <Select>
                {suffixOption.map((item) => (
                  <Option key={item._id} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="Manager Avatar" name="managerAvatar">
          <Upload fileList={fileList} maxCount={1} action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="KeyWord" name="keyword">
          <Input placeholder="input keyword" />
        </Form.Item>
        <Button style={{ marginLeft: '260px' }} onClick={cancel}>
          Cancel
        </Button>
        <Button type="primary" style={{ marginLeft: '20px' }} htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  )
}
