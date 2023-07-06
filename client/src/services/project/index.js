import request from '../http'
const insertProject = (data) =>
  request.post({
    url: '/project/create',
    data,
  })
const getProject = (data) =>
  request.get({
    url: '/project/list',
    data,
  })
export { insertProject, getProject }
