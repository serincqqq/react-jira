import request from '../http'
const getProjectDetail = (id) =>
  request.get({
    url: `/project/detail?projectId=${id}`,
  })
const insertProject = (data) =>
  request.post({
    url: '/project/create',
    data,
  })
const getProject = () =>
  request.get({
    url: '/project/list',
  })
const editProject = (id, data) =>
  request.post({
    url: '/project/edit',
    params: {
      projectId: id,
    },
    data,
  })
const searchProject = (data, type) =>
  request.get({
    url: `/project/search?searchType=${type}&searchQuery=${data}`,
  })
const deleteProject = (id) =>
  request.get({
    url: '/project/delete',
    params: {
      projectId: id,
    },
  })
export { deleteProject, getProjectDetail, editProject, insertProject, getProject, searchProject }
