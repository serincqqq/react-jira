import request from '../http'

const getUserList = (data) =>
  request.get({
    url: '/user/userList',
    params: {
      searchQuery: data,
      // type,
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

export { getUserList, getAllUserList, getUserAvatar }
