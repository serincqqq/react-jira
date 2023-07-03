import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, Progress, Button, Modal } from 'antd'
import { FieldTimeOutlined } from '@ant-design/icons'
import { SectionTitle } from '../../Styles'
import './styles.css'
import { TimeBox, Logged, Estimated, Tracking, Actions, InputLabel, InputCont } from './Styles'

// const propTypes = {
//   issue: PropTypes.object.isRequired,
//   updateIssue: PropTypes.func.isRequired,
// };

export default function ProjectBoardIssueDetailsEstimateTracking() {
  const [editTime, setEditTime] = useState(false)
  const [spent, setSpent] = useState(1)
  const [remaining, setRemaining] = useState(2)
  const [percent, setPercent] = useState(20.5)
  const handleOk = () => {
    setEditTime(false)
  }
  const reg = /^\d{0,6}$/
  const spentChange = (event) => {
    if (reg.test(event.target.value)) setSpent(Number(event.target.value))
  }
  const remainingChange = (event) => {
    if (reg.test(event.target.value)) setRemaining(Number(event.target.value))
  }
  useEffect(() => {
    // 还需要用正则限制只能输入数字，其他的无法输入
    if (spent !== '' && remaining !== '') {
      let count = (spent / (spent + remaining)) * 100
      setPercent(count)
    }
  }, [spent, remaining])

  return (
    <Fragment>
      <SectionTitle>Original Estimate (hours)</SectionTitle>
      <Input placeholder="Basic usage" />
      <SectionTitle>Time Tracking</SectionTitle>
      <TimeBox onClick={() => setEditTime(true)}>
        <FieldTimeOutlined className="time-icon" />
        <Tracking>
          <Progress className="progress" percent={30} showInfo={false} />
          <Logged>1h logged</Logged>
          <Estimated>2h estimated</Estimated>
        </Tracking>
      </TimeBox>
      <Modal
        onCancel={() => setEditTime(false)}
        width={400}
        className="time-modal"
        title="Time tracking"
        open={editTime}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            DONE
          </Button>,
        ]}
      >
        <TimeBox onClick={() => setEditTime(true)}>
          <FieldTimeOutlined className="time-icon" />
          <Tracking>
            <Progress className="progress" percent={percent} showInfo={false} />
            <Logged>{spent}h logged</Logged>
            <Estimated>{remaining}h estimated</Estimated>
          </Tracking>
        </TimeBox>
        <Actions>
          <InputCont>
            <InputLabel>Time spent (hours) </InputLabel>
            <Input className="input" type="text" defaultValue={spent} value={spent} onChange={spentChange} />
          </InputCont>
          <InputCont>
            <InputLabel>Time remaining (hours)</InputLabel>
            <Input className="input" type="text" value={remaining} onChange={remainingChange} />
          </InputCont>
        </Actions>
      </Modal>
    </Fragment>
  )
}

//ProjectBoardIssueDetailsEstimateTracking.propTypes = propTypes;
