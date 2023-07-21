import React from 'react'
import {useLocation } from 'react-router-dom'
import { IssueTitle, IssueSearch, IssueData, IssueTypeId } from './Styles'
import {issueType} from '@/shared/staticData/projectOption'
export default function Issue({ issue }) {
  const location = useLocation()
  return (
      <IssueSearch to={`${location.pathname}/issue/${issue._id}`}>
        {issueType.find((item) => item.label === issue.issuetype).icon}
        <IssueData>
          <IssueTitle>{issue.summary}</IssueTitle>
          <IssueTypeId>task-{issue._id}</IssueTypeId>
        </IssueData>
      </IssueSearch>
 
  )
}
