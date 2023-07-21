import { CheckSquareFilled ,ExclamationCircleFilled} from '@ant-design/icons'
import React from 'react'
import { IssueTitle, IssueSearch, IssueData, IssueTypeId } from './Styles'
const issueType = [
  {
    icon: <CheckSquareFilled style={{ color: '#4FADE6' }} />,
    label: 'Task',
  },
  {
    icon: <ExclamationCircleFilled style={{ color: '#E44D42' }} />,
    label: 'Bug',
  },
]
export default function Issue({issue}) {

  return (
    <IssueSearch>
      {issueType.find((item)=>item.label===issue.issuetype).icon}
      <IssueData>
        <IssueTitle>{issue.summary}</IssueTitle>
        <IssueTypeId>task-{issue._id}</IssueTypeId>
      </IssueData>
    </IssueSearch>
  )
}
