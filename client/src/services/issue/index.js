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
export { insertIssue, deleteIssue }
