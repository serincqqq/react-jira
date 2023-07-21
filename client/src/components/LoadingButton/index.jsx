import { Form, Input, Button, Modal } from 'antd'
import { useState } from 'react'
export function LoadingButton (){
  const [loadings, setLoadings] = useState([])
  return (
    <Button
    loading={loadings[0]}
    type="primary"
    style={{ marginLeft: '20px' }}
    htmlType="submit"
  >
    Submit
  </Button>
  )
}