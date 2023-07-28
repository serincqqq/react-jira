import request from '../http'
const updateIssue = (id, data) =>
  request.post({
    url: '/issue/update',
    params: {
      issueId: id,
    },
    data,
  })
const getRecIssue = () =>
  request.get({
    url: '/issue/recent',
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
    params: {
      connectedProject: data,
    },
  })
const getIssueDetail = (id) =>
  request.get({
    url: `/issue/detail?issueId=${id}`,
  })
const addComment = (id, data) =>
  request.post({
    url: '/issue/comments',
    params: {
      issueId: id,
    },
    data,
  })
const searchIssue = (data) =>
  request.get({
    //两种写法的效果是一样的
    url: `/issue/search?searchQuery=${data}`,
    // url:'/issue/search' ,
    // params:{
    //   searchQuery:data
    // }
  })
export {
  searchIssue,
  getRecIssue,
  addComment,
  updateIssue,
  getIssueList,
  insertIssue,
  deleteIssue,
  getIssueDetail,
}
