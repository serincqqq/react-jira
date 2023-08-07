import request from '../http'

const getUserList = (data) =>
  request.get({
    url: '/user/userList',
    params: {
      searchQuery: data,
    },
  })
const getUserAvatar = (id) =>
  request.get({
    url: '/user/userAvatar',
    params: {
      id: id,
    },
  })

const getAllUserList = () =>
  request.get({
    url: '/user/allUser',
  })
const login = (data = {}) =>
  request.post({
    url: '/user/profile',
    headers: {
      Authorization: localStorage.getItem('jiraToken') || sessionStorage.getItem('jiraToken'),
    },
    data,
  })
export { login, getUserList, getAllUserList, getUserAvatar }
