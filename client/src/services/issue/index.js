import request from '../http'
const deleteIssue = (data) =>
  request.get({
    url: '/issue/delete',
    data,
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
export { getIssueList, insertIssue, deleteIssue }
