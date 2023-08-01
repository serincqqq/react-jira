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
const login = (data) =>
  request.get({
    url: '/user/profile',
    params: {
      userName: data.userName,
      password: data.password,
    },
  })
export { login, getUserList, getAllUserList, getUserAvatar }
