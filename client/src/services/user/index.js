import request from '../http'

const getUserList = (data, type) =>
  request.get({
    url: '/user/userList',
    params: {
      searchQuery: data,
      type,
    },
  })

export { getUserList }
