import request from '../http'
const updateIssue = (id, data) =>
  request.post({
    url: '/issue/update',
    params: {
      issueId: id,
    },
    data,
  })
const deleteIssue = (data) =>
  request.get({
    url: '/issue/delete',
    params: {
      issueId: data,
    },
  })
const insertIssue = (data) =>
  request.post({
    url: '/issue/create',
    data,
  })
const getIssueList = (data) =>
  request.get({
    url: '/issue/list',
  })
const getIssueDetail = (data) =>
  request.get({
    url: '/issue/detail',
    params: {
      issueId: data,
    },
  })
  const addComment = (id,data) =>
  request.post({
    url: '/issue/comments',
    params: {
      issueId: id,
    },
    data,
  })
  
export { addComment,updateIssue, getIssueList, insertIssue, deleteIssue, getIssueDetail }
