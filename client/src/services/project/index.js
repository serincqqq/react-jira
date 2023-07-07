import request from '../http'
const insertProject = (data) =>
  request.post({
    url: '/project/create',
    data,
  })
const getProject = () =>
  request.get({
    url: '/project/list',
  })

const searchProject = (data, type) =>
  request.get({
    url: '/project/search',
    params: {
      searchQuery: data,
      searchType: type,
    },
  })

export { insertProject, getProject, searchProject }
